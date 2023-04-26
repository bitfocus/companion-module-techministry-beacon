module.exports = {
	// ##########################
	// #### Instance Actions ####
	// ##########################
	initActions: function () {
		let self = this;
		let actions = {};

		actions.color = {
			name: 'Set Beacon to Color',
			options: [
				{
					type: 'dropdown',
					label: 'Beacon/Device',
					id: 'device',
					default: this.DEVICES[0].id,
					choices: this.DEVICES
				},
				{
					type: 'dropdown',
					label: 'Color',
					id: 'color',
					default: this.COLORS[0].id,
					choices: this.COLORS
				},
				{
					type: 'checkbox',
					label: 'Show Notification',
					description: 'Show a notification on the beacon app when the action is triggered.',
					id: 'showNotification',
					default: false
				},
				{
					type: 'textinput',
					label: 'Notification Title',
					description: 'Title of the notification on the beacon app.',
					id: 'title',
					default: 'Companion - Beacon',
					isVisible: (event) => event.showNotification === true
				},
				{
					type: 'textinput',
					label: 'Notification Body',
					description: 'Body/Message of the notification on the beacon app.',
					id: 'body',
					default: '',
					isVisible: (event) => event.showNotification === true
				},
				{
					type: 'checkbox',
					label: 'Play Sound',
					description: 'Play a sound on the beacon app when the action is triggered.',
					id: 'playSound',
					default: false
				},
				{
					type: 'dropdown',
					label: 'Sound',
					id: 'sound',
					default: this.SOUNDS[0].id,
					choices: this.SOUNDS,
					isVisible: (event) => event.playSound === true
				},
				{
					type: 'number',
					label: 'Repeat',
					id: 'soundRepeat',
					default: 1,
					min: 1,
					max: 100,
					isVisible: (event) => event.playSound === true
				},
			],
			callback: async (event) => {
				let beaconObj = {
					deviceId: event.options.device,
					beaconType: 'set',
					color: event.options.color,
					showNotification: event.options.showNotification
				};

				if (event.options.showNotification) {
					beaconObj.title = event.options.title;
					beaconObj.body = event.options.body;
				}

				if (event.options.playSound) {
					beaconObj.playSound = true;
					beaconObj.soundId = event.options.sound;
					beaconObj.soundRepeat = event.options.soundRepeat;
				}

				self.sendCommand('beacon', beaconObj);
			}
		};

		actions.fade = {
			name: 'Fade Beacon to Color',
			options: [
				{
					type: 'dropdown',
					label: 'Beacon/Device',
					id: 'device',
					default: this.DEVICES[0].id,
					choices: this.DEVICES
				},
				{
					type: 'dropdown',
					label: 'Color',
					id: 'color',
					default: this.COLORS[0].id,
					choices: this.COLORS
				},
				{
					type: 'number',
					label: 'Speed (0-255)',
					description: '0 = Fastest, 255 = Slowest',
					id: 'speed',
					default: 20,
					min: 0,
					max: 255,
					range: false,
					required: true,
				},
				{
					type: 'checkbox',
					label: 'Show Notification',
					description: 'Show a notification on the beacon app when the action is triggered.',
					id: 'showNotification',
					default: false
				},
				{
					type: 'textinput',
					label: 'Notification Title',
					description: 'Title of the notification on the beacon app.',
					id: 'title',
					default: 'Companion - Beacon',
					isVisible: (event) => event.showNotification === true
				},
				{
					type: 'textinput',
					label: 'Notification Body',
					description: 'Body/Message of the notification on the beacon app.',
					id: 'body',
					default: '',
					isVisible: (event) => event.showNotification === true
				},
				{
					type: 'checkbox',
					label: 'Play Sound',
					description: 'Play a sound on the beacon app when the action is triggered.',
					id: 'playSound',
					default: false
				},
				{
					type: 'dropdown',
					label: 'Sound',
					id: 'sound',
					default: this.SOUNDS[0].id,
					choices: this.SOUNDS,
					isVisible: (event) => event.playSound === true
				},
				{
					type: 'number',
					label: 'Repeat',
					id: 'soundRepeat',
					default: 1,
					min: 1,
					max: 100,
					isVisible: (event) => event.playSound === true
				},
			],
			callback: async (event) => {
				let beaconObj = {
					deviceId: event.options.device,
					beaconType: 'fade',
					color: event.options.color,
					speed: event.options.speed,
					showNotification: event.options.showNotification
				};

				if (event.options.showNotification) {
					beaconObj.title = event.options.title;
					beaconObj.body = event.options.body;
				}

				if (event.options.playSound) {
					beaconObj.playSound = true;
					beaconObj.soundId = event.options.sound;
					beaconObj.soundRepeat = event.options.soundRepeat;
				}

				self.sendCommand('beacon', beaconObj);
			}
		};

		actions.flash = {
			name: 'Flash Beacon to Color',
			options: [
				{
					type: 'dropdown',
					label: 'Beacon/Device',
					id: 'device',
					default: this.DEVICES[0].id,
					choices: this.DEVICES
				},
				{
					type: 'dropdown',
					label: 'Color',
					id: 'color',
					default: this.COLORS[0].id,
					choices: this.COLORS
				},
				{
					type: 'number',
					label: 'Speed (0-255)',
					description: '0 = Fastest, 255 = Slowest',
					id: 'speed',
					default: 20,
					min: 0,
					max: 255,
					range: false,
					required: true,
				},
				{
					type: 'number',
					label: 'Repeat',
					id: 'repeat',
					default: 5,
					min: 1,
					max: 100
				},
				{
					type: 'checkbox',
					label: 'Show Notification',
					description: 'Show a notification on the beacon app when the action is triggered.',
					id: 'showNotification',
					default: false
				},
				{
					type: 'textinput',
					label: 'Notification Title',
					description: 'Title of the notification on the beacon app.',
					id: 'title',
					default: 'Companion - Beacon',
					isVisible: (event) => event.showNotification === true
				},
				{
					type: 'textinput',
					label: 'Notification Body',
					description: 'Body/Message of the notification on the beacon app.',
					id: 'body',
					default: '',
					isVisible: (event) => event.showNotification === true
				},
				{
					type: 'checkbox',
					label: 'Play Sound',
					description: 'Play a sound on the beacon app when the action is triggered.',
					id: 'playSound',
					default: false
				},
				{
					type: 'dropdown',
					label: 'Sound',
					id: 'sound',
					default: this.SOUNDS[0].id,
					choices: this.SOUNDS,
					isVisible: (event) => event.playSound === true
				},
				{
					type: 'number',
					label: 'Repeat',
					id: 'soundRepeat',
					default: 1,
					min: 1,
					max: 100,
					isVisible: (event) => event.playSound === true
				},
			],
			callback: async (event) => {
				let beaconObj = {
					deviceId: event.options.device,
					beaconType: 'flash',
					color: event.options.color,
					speed: event.options.speed,
					repeat: event.options.repeat,
					showNotification: event.options.showNotification,
					playSound: event.options.playSound,
				};

				if (event.options.showNotification) {
					beaconObj.title = event.options.title;
					beaconObj.body = event.options.body;
				}

				if (event.options.playSound) {
					beaconObj.playSound = true;
					beaconObj.soundId = event.options.sound;
					beaconObj.soundRepeat = event.options.soundRepeat;
				}

				self.sendCommand('beacon', beaconObj);
			}
		};

		actions.off = {
			name: 'Turn Off Beacon',
			options: [
				{
					type: 'dropdown',
					label: 'Beacon/Device',
					id: 'device',
					default: this.DEVICES[0].id,
					choices: this.DEVICES
				},
			],
			callback: async (event) => {
				let beaconObj = {
					deviceId: event.options.device,
					beaconType: 'off',
				};

				self.sendCommand('beacon', beaconObj);
			}
		};

		actions.notification = {
			name: 'Send Notification to beacon app',
			options: [
				{
					type: 'textinput',
					label: 'Notification Title',
					description: 'Title of the notification on the beacon app.',
					id: 'title',
					default: 'Companion - Beacon'
				},
				{
					type: 'textinput',
					label: 'Notification Body',
					description: 'Body/Message of the notification on the beacon app.',
					id: 'body',
					default: ''
				},
				{
					type: 'checkbox',
					label: 'Play Sound',
					description: 'Play a sound on the beacon app when the action is triggered.',
					id: 'playSound',
					default: false
				},
				{
					type: 'dropdown',
					label: 'Sound',
					id: 'sound',
					default: this.SOUNDS[0].id,
					choices: this.SOUNDS,
					isVisible: (event) => event.playSound === true
				},
				{
					type: 'number',
					label: 'Repeat',
					id: 'soundRepeat',
					default: 1,
					min: 1,
					max: 100,
					isVisible: (event) => event.playSound === true
				},
			],
			callback: async (event) => {
				let beaconObj = {
					showNotification: true,
					title: event.options.title,
					body: event.options.body
				}

				if (event.options.playSound) {
					beaconObj.playSound = true;
					beaconObj.soundId = event.options.sound;
					beaconObj.soundRepeat = event.options.soundRepeat;
				}

				self.sendCommand('beacon', beaconObj);
			}
		};

		actions.sound = {
			name: 'Play Sound on beacon app',
			options: [
				{
					type: 'dropdown',
					label: 'Sound',
					id: 'sound',
					default: this.SOUNDS[0].id,
					choices: this.SOUNDS
				},
				{
					type: 'number',
					label: 'Repeat',
					id: 'soundRepeat',
					default: 1,
					min: 1,
					max: 100,
					isVisible: (event) => event.playSound === true
				},
			],
			callback: async (event) => {
				let beaconObj = {
					beaconType: 'sound',
					soundId: event.options.sound,
					soundRepeat: event.options.soundRepeat
				}

				self.sendCommand('beacon', beaconObj);
			}
		}
		
		this.setActionDefinitions(actions);
	}
}