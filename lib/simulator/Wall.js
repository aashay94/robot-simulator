import {getRandomInt} from '../utils.js';

export class Wall {
	constructor() {
		this.x = getRandomInt(0, 4);
		this.y = getRandomInt(0, 4);
		console.log(`Wall positioned at ${this.x}, ${this.y}`);
	}
}
