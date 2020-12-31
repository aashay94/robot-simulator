export class MockCommandBox {
	constructor() {
		this.selected = false;
	}

	select() {
		this.selected = true;
	}
}

export class MockCanvasContext {
	constructor(name) {
		this.name = name;
	}
}

export class MockCanvas {
	constructor() {
		// no-op
	}
	getContext(name) {
		return new MockCanvasContext(name);
	}
}

export class MockDiv {
	constructor(name) {
		this.name = name;
	}
}

export class MockDocument {
	constructor(canvas, commandBox) {
		this.canvas = canvas || new MockCanvas();
		this.commandBox = commandBox || new MockCommandBox();
		this.reportDiv = new MockDiv('report');
	}

	getElementById(id) {
		switch (id) {
		case 'report':
			return this.reportDiv;
			break;
		default:
			throw new Error(`MockDocument doesn't have a ${id}`);
		}
	}
}
