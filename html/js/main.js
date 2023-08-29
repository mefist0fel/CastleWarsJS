				
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

UpdateCanvasSize()

// init
let rect = canvasElement.getBoundingClientRect();
var selectedCastle = null;

var gameObjects = [];
var drawObjects = [];
CreateCastle(-40, 0, 0, 2)
CreateCastle(40, 0, 1, 2)
for(var i = -1; i < 2; i++) {
	for(var j = -1; j < 2; j++) {
		CreateCastle(i * 20, j * 20 + 10)
	}
}
findNeibghors(30);

var input = Input(rect)
gameObjects.push(input)

function timestamp() {
	let perf = window.performance;
	return perf && perf.now ? perf.now() : new Date().getTime();
}

let
	au = CreateVector3(-100,-100, 100),
	bu = CreateVector3(-100, 100, 100),
	cu = CreateVector3( 100, 100, 100),
	du = CreateVector3( 100,-100, 100),
	ad = CreateVector3(-100,-100, -100),
	bd = CreateVector3(-100, 100, -100),
	cd = CreateVector3( 100, 100, -100),
	dd = CreateVector3( 100,-100, -100)

CreateQuad3D(au, bu, cu, du) // top
CreateQuad3D(ad, bd, cd, dd, rgbToHex(255, 3, 8)) // bottom
// sides
CreateQuad3D(bu, au, ad, bd, rgbToHex(120, 120, 120))
CreateQuad3D(cu, bu, bd, cd, rgbToHex(180, 180, 180))
CreateQuad3D(du, cu, cd, dd, rgbToHex(230, 230, 230))
// CreateQuad3D(au, du, dd, ad, rgbToHex(180, 180, 180))

function render() {
	// clear
	canvas.fillStyle    = '#101010';  // black
	canvas.fillRect ( 0, 0, width, height);

	// map
	// drawMap()
	// camera
	DrawCamera()

	canvas.fillStyle    = '#333333';  // black
	canvas.strokeStyle    = '#101010';  // black
	// Selected castle
	if (selectedCastle != null) {
		selectedCastle.drawSelection(canvas)
	}

	// castles
	drawObjects.forEach(g => g.draw(canvas))

	// help
	// canvas.font = "14pt Arial";
	// canvas.fillText("Q / E - Rotate level", 10, 30)
	// canvas.fillText("Z / X - change height constant", 10, 50)
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
    if (input.key[32]) { // space
		console.log(objects3d)
    }
	gameObjects.forEach(g => g.update(dt));
	// rotate camera
    // currentMatrix = MultiplyMatrix3(currentMatrix, CreateRotationMatrix3(CreateVector3(0, 1, 0), 20.0 * dt))
	angle += 60 * dt
	let pitch = CreateRotationMatrix3(CreateVector3(1, 0, 0), 30)
    cameraWorldMatrix = MultiplyMatrix3(pitch, CreateRotationMatrix3(CreateVector3(0, 0, 1), angle))
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
	render();
	animationFrameFunction(frame);
	// update canvas on window change
	if (width != docElement.clientWidth || height != docElement.clientHeight) {
		UpdateCanvasSize()
	}
}
animationFrameFunction(frame);

function UpdateCanvasSize() {
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

function fillRect(x, y, w, h) {
	canvas.fillRect (x * screenScale + centerX, y * screenScale + centerY, w * screenScale, h * screenScale)
}

function fillText(text, x, y) {
	canvas.fillText(text, x * screenScale + centerX, y * screenScale + centerY);
}

function rgbToHex(r, g, b, a = 255) {
    function componentToHex(c) {
        var hex = c.toString(16)
        return hex.length == 1 ? "0" + hex : hex;
    }
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a);
}