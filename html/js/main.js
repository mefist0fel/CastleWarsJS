                   
	const reloadTime = 1.0;
	const playerFaction = 0;
	var now,
		dt = 0,
		time = timestamp(),
		reloadTimer = reloadTime,
		step = 1/30,
		width = 1024,
		height = 768;

	// init
	var canvasElement = document.getElementById('a');
	var canvas = canvasElement.getContext('2d');
	canvasElement.width = width;
	canvasElement.height = height;
	rect = canvasElement.getBoundingClientRect();
	var selectedCastle = null;

	var gameObjects = [];
	var drawObjects = [];
	CreateCastle(100, 400, 0, 2)
	CreateCastle(900, 400, 1, 2)
	for(var i = -1; i < 2; i++) {
		for(var j = -1; j < 2; j++) {
			CreateCastle(i * 200 + 500, j * 200 + 400)
		}
	}
	findNeibghors(300);

	var input = Input(rect)
	gameObjects.push(input)
	//var camera = Camera();
	//var player = Hero();
	// setMoveDirection(45);

	function timestamp() {
		let perf = window.performance;
		return perf && perf.now ? perf.now() : new Date().getTime();
	}

	function render(dt) {
		// clear
		canvas.fillStyle    = '#101010';  // black
		canvas.fillRect ( 0, 0, width, height);
		// test
		// canvas.fillStyle    = '#FFFFFF';  // white
		// canvas.fillRect (10, 10, 100, 100)

		// Selected castle
		if (selectedCastle != null) {
			selectedCastle.drawSelection(canvas);
		}

		// castles
		drawObjects.forEach(g => g.draw(canvas));

		// help
		canvas.font = "14pt Arial";
		// canvas.fillText("Q / E - Rotate level", 10, 30)
		// canvas.fillText("Z / X - change height constant", 10, 50)
		// canvas.fillText("C / V - c//hange tile aspect", 10, 50)
		// canvas.fillText("dt " + dt, 10, 30)
	}

	function update(dt) {
		if (input.mouseLeftDown) {
			selectedCastle = getCastle(input.mousePosition);
			findAvailableForMoveCastles(selectedCastle)
		}
		if (input.mouseRightDown) {
			let target = getCastle(input.mousePosition);
			if (selectedCastle != null && target != null) {
				if (selectedCastle == target) {
					selectedCastle.upgrade()
				} else {
					selectedCastle.sendArmy(target)
				}
			}
		}
		gameObjects.forEach(g => g.update(dt));
	}

	let animationFrameFunction = requestAnimationFrame

	function frame() {
		now = timestamp();
		dt = Math.min(1, (now - time) / 1000);
		if (dt > step) {
			dt = step;
		}
		time = now;
		update(dt);
		render(dt);
		animationFrameFunction(frame);
	}
	animationFrameFunction(frame);
	