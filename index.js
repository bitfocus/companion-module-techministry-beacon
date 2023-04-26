// techministry-beacon

const { InstanceBase, InstanceStatus, Regex, runEntrypoint } = require('@companion-module/base')
const UpgradeScripts = require('./src/upgrades')

const config = require('./src/config')
const actions = require('./src/actions')
const feedbacks = require('./src/feedbacks')
const variables = require('./src/variables')
const presets = require('./src/presets')

const io = require('socket.io-client');

class moduleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...config,
			...actions,
			...feedbacks,
			...variables,
			...presets,
		})

		this.socket = null;

		this.STATUS = {
			information: '',
			version: '',
			controlStatus: false
		};

		this.DEVICES = [
			{ id: '0', label: 'No Devices Found' }
		];
		this.COLORS = [
			{ id: '0', label: 'No Colors Found' }
		];
		this.SOUNDS = [
			{ id: '0', label: 'No Sounds Found' }
		];
	}

	async destroy() {
	}

	async init(config) {
		this.updateStatus(InstanceStatus.Connecting)
		this.configUpdated(config)
	}

	async configUpdated(config) {
		this.config = config

		if (this.config.verbose) {
			this.log('info', 'Verbose mode enabled. Log entries will contain detailed information.');
		}
	
		this.updateStatus(InstanceStatus.Connecting)
	
		this.initConnection();
	
		this.initActions();
		this.initFeedbacks();
		this.initVariables();
		this.initPresets();
	
		this.checkFeedbacks();
		this.checkVariables();
	}

	initConnection() {
		let self = this;

		if (this.config.host) {
			this.log('info', `Opening connection to beacon: ${this.config.host}:${this.config.port}`);
	
			this.socket = io.connect('http://' + this.config.host + ':' + this.config.port, {reconnection: true});
			this.log('info', 'Connecting to beacon...');
			this.STATUS.information = 'Connecting to beacon';
			this.checkVariables();
	
			// Add listeners
			this.socket.on('connect', function() { 
				self.log('info', 'Connected to beacon. Retrieving data.');
				self.updateStatus(InstanceStatus.Ok);
				self.STATUS.information = 'Connected';
				self.sendCommand('version', null, null);
				self.sendCommand('colors', null, null);
				self.sendCommand('sounds', null, null);
				self.checkVariables();
				self.getState();
			});
	
			this.socket.on('disconnect', function() { 
				self.updateStatus(InstanceStatus.ConnectionFailure);
				self.log('error', 'Disconnected from beacon.');
				self.STATUS.information = 'Disconnected';
				self.checkVariables();
			});
	
			this.socket.on('version', function(version) {
				self.STATUS.version = version;
				self.checkVariables();
			});

			this.socket.on('devices', function(devices) {
				let devicesList = []
				for (let i = 0; i < devices.length; i++) {
					devicesList.push({ id: devices[i].deviceId, label: `${devices[i].deviceName} (${devices[i].deviceType})` });
				}
				self.DEVICES = devicesList;
				self.initActions();
				self.checkVariables();
			});

			this.socket.on('colors', function(colors) {
				self.COLORS = colors;
				self.initActions();
				self.checkVariables();
			});

			this.socket.on('sounds', function(sounds) {
				self.SOUNDS = sounds;
				self.initActions();
				self.checkVariables();
			});
	
			this.socket.on('control_status', function(status) {
				self.STATUS.controlStatus = status;
				if (status == false) {
					self.updateStatus(InstanceStatus.UnknownWarning);
					self.STATUS.information = 'Control has been disabled via beacon.';
					self.log('warning', 'Control has been disabled via beacon.');
				}
				else {
					self.updateStatus(InstanceStatus.Ok);
					self.STATUS.information = 'Control has been enabled via beacon.';
					self.log('info', 'Control has been enabled via beacon.');
				}
				self.checkVariables();
				self.checkFeedbacks();
			});
	
			this.socket.on('error', function(error) {
				self.updateStatus(InstanceStatus.ConnectionFailure);
				self.log('error', 'Error from beacon: ' + error);
			});
		}
	}
	
	getState() { //gets the most recent list of devices from beacon
		let self = this;
	
		this.sendCommand('devices');
	}

	sendCommand(cmd, arg1 = null, arg2 = null) {	
		if (this.socket !== undefined) {
			if (this.config.verbose) {
				this.log('info', 'Sending: ' + cmd);
			}
	
			if (arg1 !== null) {
				if (arg2 !== null) {
					this.socket.emit(cmd, arg1, arg2);
				}
				else {
					this.socket.emit(cmd, arg1);
				}
			}
			else {
				this.socket.emit(cmd);
			}
		}
		else {
			debug('Unable to send: Not connected to beacon.');
	
			if (this.config.verbose) {
				this.log('warn', 'Unable to send: Not connected to beacon.');
			}
		}
	};

}

runEntrypoint(moduleInstance, UpgradeScripts)