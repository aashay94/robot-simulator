
export class CanvasView {
	constructor(simulator, reportView, canvas) {
		this.simulator = simulator;
		this.reportView = reportView;
		this.maxX = 5; // x total
		this.maxY = 5; // y total
		this.squareSize = 100; // all grids are equal width and height
		this.xStart = 50; // axis x starts from 50px
		this.yStart = 50; // axis y starts from 50px
		this.xEnd = this.xStart + this.squareSize * this.maxX; // axis x starts from 50px
		this.yEnd = this.yStart + this.squareSize * this.maxY; // axis y starts from 50px
		this.context = canvas.getContext('2d');
		this.context1 = canvas.getContext('2d');
		this.robotFacing = ['north', 'east', 'south', 'west']; // clockwise
		this.robotSize = 25; // is the arrow size actually
	}

	render() {
		this.context.clearRect(0, 0, 551, 580); // TODO: Magic dimensions from index.ejs
		this.renderCanvas();
		this.renderGoal(this.simulator.getCurrentRobot());
		this.renderRobot();
		this.renderWall();//render wall function
	}

	stepAi() {
		const robot = this.simulator.getCurrentRobot();
		robot.step(this.buildEvent(robot, this.simulator.goal));
	}

	atGoal(robot, goal) {
		var flag = false;
		for(var i=0; i< robot.length; i++) {
			var robX = robot[i].x;
			var robY = robot[i].y;
			if(robX === goal.x && robY === goal.y)
				flag = true;
		}
		return flag;
	}

	wallInFront(robot) {
		switch (robot.f) {
			case 'north': {
				return robot.y === this.maxY - 1;
			}
			case 'south': {
				return robot.y === 0;
			}
			case 'east': {
				return robot.x === this.maxX - 1;
			}
			case 'west': {
				return robot.x === 0;
			}
			default:
				console.log(`Invalid orientation ${robot.f}`);
				return false;
		}
	}

	buildEvent(robot, goal) {
		return {
			// Note distance to goal is actually the square of the distance to goal
			distanceToGoal: Math.pow(robot.x - goal.x, 2) + Math.pow(robot.y - goal.y, 2),
			atGoal: this.atGoal(robot, goal),
			wallInFront: this.wallInFront(robot),
		};
	}

	renderCanvas() {
		this.context.strokeStyle = '#000';

		for (let x = 0; x < (this.maxX + 1); x++) { // draw 6 lines
			const currentAxisX = this.xStart + x * this.squareSize;
			this.context.moveTo(currentAxisX, this.yStart);
			this.context.lineTo(currentAxisX, this.yEnd);

			this.context.strokeText(x, currentAxisX + 50, this.yEnd + 20); // mark x index
		}

		for (let y = 0; y < (this.maxY + 1); y++) {
			const currentAxisY = this.yStart + y * this.squareSize;
			this.context.moveTo(this.xStart, currentAxisY);
			this.context.lineTo(this.xEnd, currentAxisY);

			this.context.strokeText((this.maxY - 1 - y), this.xStart - 20, currentAxisY + 50); // mark y index
		}

		this.context.stroke();
	}

	validateBound(input, input1, toCheckAxis) {
		//check if wall is present
		const wall = this.simulator.wall;
		const wall1 = this.simulator.wall1;
		console.log(wall);
		console.log(wall1);
		console.log(input);
		console.log(input1);
		if (isNaN(input) && isNaN(input1)) {
			this.simulator.printErrors('Please enter a numeric coordinates!');
			return false;
		} else if (input < 0 || input1 <0 || input1 > (this[toCheckAxis] - 1) || input > (this[toCheckAxis] - 1)) {
			this.simulator.printErrors('Coordinates out of range!');
			return false;
		} 
		else if(wall.x == input && wall.y == input1) {
			return false;
		}
		else if(wall1.x == input && wall1.y == input1) {
			return false;
		}
		else {
			return true;
		}
	}

	validateFacing(face) {
		if (this.robotFacing.indexOf(face.toLowerCase()) < 0) {
			this.simulator.printErrors('Wrong facing!');
			return false;
		} else {
			return true;
		}
	}

	renderRobot() {
		// make a robot array for multiple robots
		const robot = this.simulator.getCurrentRobot();
		for (var i = 0; i < robot.length; i++) {
			const robotAxisX = (robot[i].x + 1) * 100; // the center of the destination grid horizontally
			const robotAxisY = (this.maxY - robot[i].y) * 100; // the center of the destination grid vertically

			const path = new Path2D();
			switch (robot[i].f) {
				case 'north':
					path.moveTo(robotAxisX, robotAxisY - this.robotSize);
					path.lineTo(robotAxisX - this.robotSize, robotAxisY);
					path.lineTo(robotAxisX + this.robotSize, robotAxisY);
					break;
				case 'south':
					path.moveTo(robotAxisX, robotAxisY + this.robotSize);
					path.lineTo(robotAxisX - this.robotSize, robotAxisY);
					path.lineTo(robotAxisX + this.robotSize, robotAxisY);
					break;
				case 'east':
					path.moveTo(robotAxisX + this.robotSize, robotAxisY);
					path.lineTo(robotAxisX, robotAxisY - this.robotSize);
					path.lineTo(robotAxisX, robotAxisY + this.robotSize);
					break;
				case 'west':
					path.moveTo(robotAxisX - this.robotSize, robotAxisY);
					path.lineTo(robotAxisX, robotAxisY - this.robotSize);
					path.lineTo(robotAxisX, robotAxisY + this.robotSize);
					break;
				default:
					break;
			}

			path.closePath();

			this.context.fillStyle = robot[i].color;
			this.context.strokeStyle = robot[i].color;
			this.context.stroke(path);
			this.context.fill(path);

			this.reportView.renderReport();
		}
	}

	renderGoal(robot) {
		const goal = this.simulator.goal;
		const centerX = (goal.x + 1) * 100;
		const centerY = (this.maxY - goal.y) * 100;
		const radius = 35;
		const context = this.context;
		const path = new Path2D();
		context.fillStyle = 'black';
		path.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		path.closePath();
		if (this.atGoal(robot, goal)) {
			context.fillStyle = 'blue';
		}
		context.stroke(path);
		context.fill(path);		
	}

	// render wall function
	renderWall() {
		const wall = this.simulator.wall;
		const wall1 = this.simulator.wall1;
		const context1 = this.context1;
		const path = new Path2D();
		context1.fillStyle = 'red';
		path.rect((wall.x * 100) + 50, ((4-wall.y) * 100) + 50, this.squareSize, this.squareSize);
		path.rect((wall1.x * 100) + 50, ((4-wall1.y) * 100) + 50, this.squareSize, this.squareSize);
		path.closePath();
		context1.stroke(path);
		context1.fill(path);

	}


}
