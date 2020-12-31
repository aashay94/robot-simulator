import {InputView} from '../../lib/simulator/InputView';

import {MockCommandBox} from '../MockElements';
import {MockSimulator, MockCanvasView} from '../MockSimulator';

import {expect} from 'chai';
import 'chai/register-should';

describe('Base InputView Command Handling', function() {
	let commandBox;

	let simulator;
	let canvasView;
	let inputView;

	beforeEach(function() {
		simulator = new MockSimulator();
		canvasView = new MockCanvasView();
		commandBox = new MockCommandBox();

		inputView = new InputView(simulator, canvasView, commandBox);
	});

	it('should accept the bare restart command', function(done) {
		expect(() => inputView.processCommand('restart')).not.to.throw();
		simulator.history.should.contain('resetContents');
		simulator.history.should.contain('restart');
		done();
	});
});
