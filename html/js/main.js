				
const reloadTime = 1.0;
const playerFaction = 0;
var now,
	dt = 0,
	time = timestamp(),
	reloadTimer = reloadTime,
	step = 1/30,
	doc = document,
	canvasElement = doc.getElementById('a'),
	canvas = canvasElement.getContext('2d'),
	width = 1, // 1024
	height = 1, // 768
	minSize = 1, // 768
	centerX = 1, // 768 * 0.5
	centerY = 1, // 768 * 0.5
	screenScale = 1, // find size of 1/10 cell
	docElement = doc.documentElement,
	currentMatrix = CreateUnitMatrix3(),
	angle = 0

updateCanvasSize()

// init
let rect = canvasElement.getBoundingClientRect();

var gameObjects = [];

var
	input = CreateInput(rect),
	enemy = CreateEnemy(),
	currentLevel = 0
gameObjects.push(input)

var
	stateFunction

setState(0)
setFontSize()

function render() {
	// clear
	canvas.fillStyle    = '#101010';  // black
	canvas.fillRect ( 0, 0, width, height);
	// camera
	DrawCamera()
}

function setState(state){
	// menu
	if (state == 0) {
		CreateLevel(0)
		stateFunction = updateMenu
		return
	}
	// select level
	if (state == -1) {
		CreateLevel(currentLevel)
		stateFunction = updateLevel
		return
	}
	// win
	if (state == -2) {
		stateFunction = updateWin
		return
	}
	// lose
	if (state == -3) {
		stateFunction = updateLose
		return
	}
	// start game
	if (state == 1) {
		stateFunction = updateGame
		return
	}
}

function updateWin(dt) {
	angle += 0.1 * dt
	SetCameraAngle(Sin(angle) * 10 + 65)
	// render
	render()
	canvas.fillStyle    = '#66FF66';  // green
	setFontSize(60)
	fillTextScreen("WIN", 0, -35)
	setFontSize()

	if (button("MENU", 0, 0, 18, 6)) {
		setState(0)
	}
	if (button("NEXT", 0, 20, 18, 6)) {
		currentLevel += 1
		setState(-1)
	}
	if (input.key[27]) { // esc
		setState(0)
	}
}

function updateLose(dt) {
	angle += 0.1 * dt
	SetCameraAngle(Sin(angle) * 10 + 65)
	// render
	render()
	canvas.fillStyle    = '#FF6666';  // green
	setFontSize(60)
	fillTextScreen("LOSE", 0, -35)
	setFontSize()

	if (button("MENU", 0, 0, 18, 6)) {
		setState(0)
	}
	if (button("RESTART", 0, 20, 18, 6)) {
		setState(-1)
	}
	if (input.key[27]) { // esc
		setState(0)
	}
}

function updateMenu(dt) {
	// gameObjects.forEach(g => g.update(dt));
	angle += 0.1 * dt
	SetCameraAngle(Sin(angle) * 10 + 65)
	// render
	render()
	canvas.fillStyle    = '#FFFFFF';  // dark gray
	setFontSize(60)
	fillTextScreen("CASTLE WARS", 0, -35)
	setFontSize()

	if (button("START", 0, 20, 18, 6)) {
		setState(-1)
	}
	if (input.key[32]) { // space
		setState(-1)
	}
}

function updateLevel(dt) {
	// gameObjects.forEach(g => g.update(dt));
	angle += 0.1 * dt
	SetCameraAngle(Sin(angle) * 10 + 65)
	// render
	render()
	canvas.fillStyle    = '#FFFFFF';
	setFontSize(40)
	fillTextScreen("SELECT LEVEL", 0, -35)
	
	if (currentLevel > 0) {
		fillTextScreen(currentLevel, 0, -25)
	}
	setFontSize()

	if (button("START", 0, 20, 18, 6)) {
		setState(1)
	}
	if (input.key[32]) { // space
		setState(1)
	}
	if (input.key[27]) { // esc
		setState(0)
	}
	if (button(">>", 16, 20, 9, 6) || input.key[39]) { // right
		currentLevel += 1
		CreateLevel(currentLevel)
	}
	if (currentLevel > 0 && button("<<", -16, 20, 9, 6) || input.key[37]) { // left
		currentLevel -= 1
		CreateLevel(currentLevel)
	}
}

function updateGame(dt) {
	if (input.key[27]) { // esc
		setState(0)
	}
	if (input.mouseLeftDown) {
		selectedCastle = getCastle(input.mousePosition)
		findAvailableForMoveCastles(selectedCastle)
		updateSelection()
	}
	if (input.mouseRightDown) {
		let target = getCastle(input.mousePosition);
		if (selectedCastle != null && target != null) {
			if (selectedCastle == target) {
				selectedCastle.upgrade()
			} else {
				findAvailableForMoveCastles(selectedCastle)
				selectedCastle.sendArmy(target)
			}
		}
	}
	// check win conditions
	let
		playerCount = 0,
		enemyCount = 0
	castles.forEach(c => {
		if (c.factionId == 0) {
			playerCount += 1
		}
		if (c.factionId == 1) {
			enemyCount += 1
		}
	});
	if (playerCount == 0) {
		setState(-3) // lose
	}
	if (enemyCount == 0) {
		setState(-2) // win
	}

	// update objects
	gameObjects.forEach(g => g.update(dt));
	// rotate camera
    // angle += 20 * dt
	// SetCameraAngle(angle)
	angle += 0.1 * dt
	SetCameraAngle(Sin(angle) * 10 + 65)
	// render
	render()
}

let animationFrameFunction = requestAnimationFrame

function frame() {
	now = timestamp();
	dt = Math.min(1, (now - time) / 1000);
	if (dt > step) {
		dt = step;
	}
	time = now;
	stateFunction(dt);
	animationFrameFunction(frame);
	// update canvas on window change
	if (width != docElement.clientWidth || height != docElement.clientHeight) {
		updateCanvasSize()
	}
}
animationFrameFunction(frame);

function timestamp() {
	let perf = window.performance;
	return perf && perf.now ? perf.now() : new Date().getTime();
}

function updateCanvasSize() {
	width = docElement.clientWidth
	height = docElement.clientHeight
	minSize = Math.min(width, height)

	centerX = width * 0.5
	centerY = height * 0.5
	screenScale = minSize * 0.01 // find size of 1/10 cell

	canvasElement.width = width
	canvasElement.height = height

	SetCameraSize(width, height)
}

function setFontSize(fontSize = 24.0){
	if (height > width) {
		fontSize *= height / width
	}
	canvas.font = parseInt(fontSize) + "pt Arial"
}

function fillText(text, x, y) {
	canvas.fillText(text, x, y);
}

function fillRect(x, y, w, h) {
	canvas.fillRect (x, y, w, h)
}

function fillTextScreen(text, x, y) {
    canvas.fillText(text, x * screenScale + centerX, y * screenScale + centerY);
}

function button(text, x, y, w, h) {
	let
		sizeX = (w * screenScale) * 0.5,
		sizeY = (h * screenScale) * 0.5,
		rectX = x * screenScale + centerX,
		rectY = y * screenScale + centerY

	canvas.fillStyle    = '#66666699';  // gray transparent
	canvas.fillRect(rectX - sizeX, rectY - sizeY - 12, sizeX * 2, sizeY * 2)
	canvas.fillStyle    = '#FFFFFF';  // white
    canvas.fillText(text, rectX, rectY);
	if (input.mouseLeftDown) {
		let pos = input.mousePosition
		var contains = (
			rectX - sizeX < pos[0] && 
			rectY - sizeY < pos[1] && 
			rectX + sizeX > pos[0] && 
			rectY + sizeY > pos[1]
		)
		if (contains) {
			input.update(1)
			return true
		}
	}
	return false
}