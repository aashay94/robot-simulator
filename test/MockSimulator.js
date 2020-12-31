export class MockSimulator {
	constructor() {
		this.history = [];
	}

	resetContents() {
		this.history.push('resetContents');
	}

	restart() {
		this.history.push('restart');
	}
}
export class MockCanvasView {
	constructor() {
		// no-op
	}
}
