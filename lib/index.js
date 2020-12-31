import 'style.css';

import {Simulator} from './simulator/Simulator';

window.simulator = new Simulator(document,
	document.getElementById('c'),
	document.getElementById('command'));
