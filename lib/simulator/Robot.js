import {Behavior} from '../behavior';
import {getRandomInt} from '../utils';

const behavior = new Behavior();

export class Robot {
	constructor(canvasView) {
		this.canvasView = canvasView;
		this.x = getRandomInt(0, 4);
		this.y = getRandomInt(0, 4);
		this.color = 'black';
		this.f = ['north', 'east', 'south', 'west'][getRandomInt(0, 3)];
		console.log(`Robot positioned at ${this.x}, ${this.y}, ${this.f}`);
	}

	step(event) {
		behavior.handleEvent(this, event);
	}

	/* --------------------------------------------------- */
	/*         the following are command functions
	/* --------------------------------------------------- */
	place(cmd) {
		const newPos = cmd.split(','); // get x y f from the command
		if (newPos.length < 3) {
			this.printErrors('incorrect position / direction');
		} else {
			const newX = parseInt(newPos[0].trim());
			const newY = parseInt(newPos[1].trim());
			const newF = newPos[2].trim().toLowerCase();

			if (this.canvasView.validateBound(newX, 'maxX') &&
				this.canvasView.validateBound(newY, 'maxY') &&
				this.canvasView.validateFacing(newF)) {
				this.x = newX;
				this.y = newY;
				this.f = newF;
			}
		}
	}

	move() {	
		if((this.f == 'north' || this.f == 'south')) {
			const newY = this.f == 'north' ? this.y + 1 : this.y - 1;
			const newX = this.x;
			if (this.canvasView.validateBound(newX, newY, 'maxY')) {
				this.y = newY;
			}
		}
		else if((this.f == 'east' || this.f == 'west')) {
			const newX = this.f == 'east' ? this.x + 1 : this.x - 1;
			const newY = this.y;
			if (this.canvasView.validateBound(newX, newY, 'maxX')) {
				this.x = newX;
			}	
		}
		else {
			return;
		}
	}
	left() {
		this.rotate(false); // get the next from this.robotFacing array in anti-clockwise direction
	}

	right() {
		this.rotate(true); // get the next from this.robotFacing array in clockwise direction
	}

	rotate(clockwise) {
		const originalFacing = this.f;
		const originalFacingIndex = this.canvasView.robotFacing.indexOf(originalFacing);
		let newFacingIndex;
		const totalFacing = this.canvasView.robotFacing.length;

		if (clockwise) {
			if (originalFacingIndex === (totalFacing - 1)) {
				newFacingIndex = 0;
			} else {
				newFacingIndex = originalFacingIndex + 1;
			}
		} else {
			if (originalFacingIndex === 0) {
				newFacingIndex = totalFacing - 1;
			} else {
				newFacingIndex = originalFacingIndex - 1;
			}
		}

		this.f = this.canvasView.robotFacing[newFacingIndex];
	}
}
