				
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
CreateCastle(-6, 0, 0, 2)
CreateCastle(6, 0, 1, 2)
for(var i = -1; i < 2; i++) {
	for(var j = -1; j < 2; j++) {
		CreateCastle(i * 3, j * 3)
	}
}
findNeibghors(6)

var input = CreateInput(rect)
gameObjects.push(input)

CreateEnemy(castles)
var stateFunction = update

function render() {
	// clear
	canvas.fillStyle    = '#101010';  // black
	canvas.fillRect ( 0, 0, width, height);
	// camera
	DrawCamera()
}

function update(dt) {
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
    if (input.key[32]) { // space
		console.log(objects3d)
    }
	gameObjects.forEach(g => g.update(dt));
	// rotate camera
    // angle += 20 * dt
	// SetCameraAngle(angle)
	angle += 0.1 * dt
	SetCameraAngle(Sin(angle) * 10 + 45)
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

	let fontSize = 24.0
	if (height > width) {
		fontSize *= height / width
	}
	canvas.font = parseInt(fontSize) + "pt Arial"

	SetCameraSize(width, height)
}

function fillText(text, x, y) {
	canvas.fillText(text, x, y);
}

function fillRect(x, y, w, h) {
	canvas.fillRect (x, y, w, h)
}