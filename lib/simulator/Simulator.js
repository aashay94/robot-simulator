import MainLoop from 'mainloop.js';

import {Robot} from './Robot';
import {Goal} from './Goal';
import {Wall} from './Wall';
import {InputView} from './InputView';
import {ReportView} from './ReportView';
import {CanvasView} from './CanvasView';

export class Simulator {
	// the view args are to allow passing in mocks
	constructor(_document, canvas, commandBox, reportView, canvasView, inputView) {
		this.reportView = reportView || new ReportView(this, _document);
		this.canvasView = canvasView || new CanvasView(this, this.reportView, canvas);
		this.inputView = inputView || new InputView(this, this.canvasView, commandBox);

		this.restart();

		MainLoop
		.setUpdate(() => {
		})
		.setDraw(() => {
			this.canvasView.render();
		})
		.start();
	}

	resetContents() {
		this.reportView.clear();
	};

	/* --------------------------------------------------- */
	/*         end of command functions
	/* --------------------------------------------------- */
	printErrors(msg) {
		this.reportView.renderErrors(msg);
	}

	getCurrentRobot() {
		//return all robots
		return [this.robot, this.robot1];
	}

	hasWalls() {
		// placeholder for an exercise so that automated scoring is fair
		return false;
	}

	restart() {
		this.robot = new Robot(this.canvasView);
		// adding second robot here
		this.robot1 = new Robot(this.canvasView);
		this.goal = new Goal();
		this.wall = new Wall();
		this.wall1 = new Wall();
	}
};
