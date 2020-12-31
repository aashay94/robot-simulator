import {Simulator} from '../../lib/simulator/Simulator';
import {MockDocument} from '../MockElements';

import 'chai/register-should';

describe('Check STEPAI for a single robot', function() {
	// absolute worst case scenario is that the robot has to traverse every square
	// and make three turns at each one.  That is actually horrifyingly
	// inefficient, but it at least doesn't involve any repeated states
	// for a four-by-four grid, that means 3 turns plus a move for 15 squares,
	// i.e. 60 moves
	const maxMoves = 60;
	// an efficient path, without walls, would be at most one turn to face the
	// proper initial direction, three moves, one more turn to the second
	// direction, and three more moves, so 8 moves total
	// TODO: adjust this so that wall support does not penalize the candidate
	const efficientMovesWithoutWalls = 8;

	// If there are walls, things take longer, consider worst case path with worst
	// case robot starting facing (east)
	/* +----+
	   |W  R|
	   |  WW|
	   | W G|
	   |   W|
	   +----+ */
	const efficientMovesWithWalls = 18;

	let efficientMoves;

	let mockDocument;
	let simulator;

	beforeEach(function() {
		mockDocument = new MockDocument();
		simulator = new Simulator(mockDocument, mockDocument.canvas, mockDocument.commandBox);

		efficientMoves = simulator.hasWalls() ? efficientMovesWithWalls : efficientMovesWithoutWalls;
	});

	function reachedGoal() {
		const robot = simulator.getCurrentRobot();
		const goal = simulator.goal;
		return robot.x === goal.x && robot.y === goal.y;
	};

	function testMoves(limit) {
		for (let i = 0; !reachedGoal() && i < limit; ++i) {
			simulator.inputView.processCommand('STEPAI');
		}
		reachedGoal().should.be.true;
	}

	it(`should reach the goal within ${maxMoves} steps at worst`, function(done) {
		testMoves(maxMoves);
		done();
	});

	it(`should reach the goal efficiently (threshold depends on walls or not)`,
		function(done) {
			testMoves(efficientMoves);
			done();
		}
	);
});
