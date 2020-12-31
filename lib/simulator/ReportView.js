export class ReportView {
	constructor(simulator, _document) {
		this.simulator = simulator;
		// this.errorMessageEle = document.getElementById("error");
		this.reportMessageEle = _document.getElementById('report');
	}

	renderReport() {
		const currentRobot = this.simulator.getCurrentRobot();
	//	console.log(currentRobot);
		this.clear();
		for(var i =0 ; i < currentRobot.length; i++ ) {
			this.reportMessageEle.innerHTML += `<span>Axis X: ${currentRobot[i].x}</span>` +
			`<span>Axis Y: ${currentRobot[i].y}</span>` +
			`<span>Facing: ${currentRobot[i].f}</span>`;		
		}		
	}

	renderErrors(msg) {
		this.reportMessageEle.innerHTML = `<span id="error">${msg}</span>`;
	}

	clear() {
		this.reportMessageEle.innerHTML = '';
		// this.errorMessageEle.innerHTML = '';
	}
}
