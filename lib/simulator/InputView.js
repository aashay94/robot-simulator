export class InputView {
	constructor(simulator, canvasView, commandBox) {
		this.simulator = simulator;
		this.canvasView = canvasView;
		this.commands = {
			'move': () => {
				for(var i =0; i <this.simulator.getCurrentRobot().length;i++)
					this.simulator.getCurrentRobot()[i].move();
			},
			'left': () => {
				for(var i =0; i <this.simulator.getCurrentRobot().length;i++)
				this.simulator.getCurrentRobot()[i].left();
			},
			'right': () => {
				for(var i =0; i <this.simulator.getCurrentRobot().length;i++)
				this.simulator.getCurrentRobot()[i].right();
			},
			'place': (params) => {
				for(var i =0; i <this.simulator.getCurrentRobot().length;i++)
				this.simulator.getCurrentRobot()[i].place(params);
			},
			'stepai': () => {
				this.canvasView.stepAi();
			},
			'restart': () => {
				this.simulator.restart();
			},
		};
		this.commandBox = commandBox;
	};

	processCommand(value) {
		this.commandBox.select(); // auto select all input for easier editing

		this.simulator.resetContents(); // remove previous status and errors

		const sanitizedValue = value.trim().toLocaleLowerCase();
		const sanitizedValueArray = sanitizedValue.split(' ');
		const firstWordEntered = sanitizedValueArray.splice(0, 1)[0];

		const cmdMethod = this.commands[firstWordEntered];
		if (cmdMethod) {
			cmdMethod(sanitizedValueArray.join()); // call controller functions by name
		} else {
			this.simulator.printErrors('Incorrect command');
		}
	}
}
