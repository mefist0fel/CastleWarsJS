//var map = [	1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
//			1,2,1,0,0,1,0,0,0,1,1,0,0,1,0,0,
//			1,3,2,1,1,0,0,0,1,1,1,0,1,0,0,0,
//			1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,0,
//			0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
//			0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,
//			0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,
//			1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,
//			2,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
//			3,1,1,0,0,1,0,0,0,1,1,0,0,1,0,0,
//			3,3,2,0,1,0,0,0,1,1,1,0,1,0,0,0,
//			4,3,2,1,1,1,0,0,0,0,0,1,1,1,0,0,
//			4,3,2,0,0,0,0,0,0,1,0,0,0,0,0,0,
//			6,3,3,1,0,0,0,0,0,0,0,1,0,0,0,0,
//			5,3,3,2,1,1,0,0,0,0,1,1,1,0,0,0,
//			4,3,3,2,0,1,0,0,0,0,0,1,0,0,0,0];
var mapHeigth = [];
var mapBottom = [];
var mapTiles = [];
// tile type
// 0 - default
// 1 - respawn // active respawn reborn hero if he dies
// 10 - respawn // arrow top
// 11 - respawn // arrow left
// 12 - respawn // arrow right
// 13 - respawn // arrow bottom
// map constructor
var cursorDirection = 1; //0 - up , 1 - right , 2 - down , 3 - left
var cursorPosition = [27, 25];
var cursorHeight = 1;
var cursorBottom = 0; //0 - random (-1,-4),  1 - random (-1,-2),  2 - random (-2,-3),  2 - random (-3,-4) ,  cb < 0 - real down height
var cursorType = 0;
function draw(x, y) {
	x = Math.max(x, 0);
	y = Math.max(y, 0);
	x = Math.min(x, 500);
	y = Math.min(y, 500);
	mapHeigth[x * 500 + y] = cursorHeight;
	mapTiles[x * 500 + y] = cursorType;
	if (cursorBottom == 0) {
		mapBottom[x * 500 + y] = Math.random() * -4 - 1;
	} else if (cursorBottom == 1) {
		mapBottom[x * 500 + y] = -1 - Math.random();
	} else if (cursorBottom == 2) {
		mapBottom[x * 500 + y] = -2 - Math.random();
	} else if (cursorBottom == 3) {
		mapBottom[x * 500 + y] = -3 - Math.random();
	} else {
		mapBottom[x * 500 + y] = cursorBottom;
	}
}
function moveCursorForw(len) {
	switch(cursorDirection) {
	case 0: cursorPosition[0] += len;break;
	case 1: cursorPosition[1] += len;break;
	case 2: cursorPosition[0] -= len;break;
	case 3: cursorPosition[1] -= len;break;
	}
	cursorPosition[0] = Math.max(cursorPosition[0], 0);
	cursorPosition[1] = Math.max(cursorPosition[1], 0);
	cursorPosition[0] = Math.min(cursorPosition[0], 500);
	cursorPosition[1] = Math.min(cursorPosition[1], 500);
}
function moveCursorSide(len) {
	var temp = cursorDirection;
	cursorDirection = (cursorDirection + 1) % 4;
	moveCursorForw(len);
	cursorDirection = temp;
}
function drawCursorLine(len) {
	for(var i = 0; i < len; i++) {
		draw(cursorPosition[0], cursorPosition[1]);
		moveCursorForw(1);
	}
}
function rotateCursor(angle) { // + 1 // - 1 // + 2
	cursorDirection = (cursorDirection + angle) % 4;
}
function rotateCursor(angle) { // + 1 // - 1 // + 2
	cursorDirection = (cursorDirection + angle) % 4;
}
function setCursorHeight(newHeight) {
	cursorHeight = newHeight;
}
function setBottomHeight(newHeight) {
	cursorBottom = newHeight;
}
function setCursorType(newType) {
	cursorType = newType;
}
function drawPattern () {

}
// 3 x 3
drawCursorLine(3);
moveCursorSide(1);
moveCursorForw(-3);
drawCursorLine(3);
moveCursorSide(1);
moveCursorForw(-3);
drawCursorLine(3);
moveCursorForw(-1);


setBottomHeight(-1);
// 3 x 3
drawCursorLine(3);
moveCursorSide(1);
moveCursorForw(-3);
drawCursorLine(1);
setCursorType(1);
drawCursorLine(1);
setCursorType(0);
drawCursorLine(1);
moveCursorSide(1);
moveCursorForw(-3);
drawCursorLine(3);
moveCursorForw(-1);
// 2 x 2
drawCursorLine(2);
moveCursorForw(-2);
moveCursorSide(1);
drawCursorLine(2);
moveCursorForw(-1);
// 2 x 2
drawCursorLine(2);
moveCursorForw(-2);
moveCursorSide(1);
drawCursorLine(2);
moveCursorForw(-1);
// 2 x 2
drawCursorLine(2);
moveCursorForw(-2);
moveCursorSide(1);
drawCursorLine(2);
moveCursorForw(-1);
// 2 x 2
drawCursorLine(2);
moveCursorForw(-2);
moveCursorSide(1);
drawCursorLine(2);
moveCursorForw(-1);
// 2 x 2
drawCursorLine(2);
moveCursorForw(-2);
moveCursorSide(1);
drawCursorLine(2);
moveCursorForw(-1);
// 2 x 2
drawCursorLine(2);
moveCursorForw(-2);
moveCursorSide(1);
drawCursorLine(2);
moveCursorForw(-1);
console.log(mapTiles)
function cell(x, y) {
	if (x < 0 || y < 0 || x >= 500 || y >= 500) {
		return 0;
	}
	return mapHeigth[x * 500 + y] * 0.5;
}

function cellBottom(x, y) {
	if (x < 0 || y < 0 || x >= 500 || y >= 500) {
		return 0;
	}
	return mapBottom[x * 500 + y] * 0.5 + 0.5;
}

function cellType(x, y) {
	if (x < 0 || y < 0 || x >= 500 || y >= 500) {
		return 0;
	}
	return mapTiles[x * 500 + y];
}

function grayScale(a) {
	return 'rgba(' + a + ',' + a + ',' + a +',1)';  // white
}

function isSidePolygonFrontFace(pointA, pointB) {
	coordA = toScreenSpace(pointA);
	coordB = toScreenSpace(pointB);
	return coordA[0] < coordB[0];
}

function drawMapTile(x, y, z, bottom, type) {
	var point = [
		[x, y, z], [x + 1, y, z],
		[x + 1, y + 1, z], [x, y + 1, z], // top
		[x, y, bottom], [x + 1, y, bottom],
		[x + 1, y + 1, bottom], [x, y + 1, bottom] // bottom
	]
	// side 1
	if (isSidePolygonFrontFace(point[1], point[2])) {
		canvas.fillStyle    = grayScale(180 + (x + y) % 2 * 20 - (x + y) % 3 * 8);  // gray
		canvas.strokeStyle = canvas.fillStyle;
		drawProjectedPolygon([
			point[1], point[2], point[6], point[5]
		]);
	}
	// side 2
	if (isSidePolygonFrontFace(point[2], point[3])) {
		canvas.fillStyle    = grayScale(160 + (x + y) % 2 * 20 - (x + y) % 3 * 8);  // gray
		canvas.strokeStyle = canvas.fillStyle;
		drawProjectedPolygon([
			point[2], point[3], point[7], point[6]
		]);
	}
	// side 3
	if (isSidePolygonFrontFace(point[3], point[0])) {
		canvas.fillStyle    = grayScale(180 + (x + y) % 2 * 20 - (x + y) % 3 * 8);  // gray
		canvas.strokeStyle = canvas.fillStyle;
		drawProjectedPolygon([
			point[3], point[0], point[4], point[7]
		]);
	}
	// side 4
	if (isSidePolygonFrontFace(point[0], point[1])) {
		canvas.fillStyle    = grayScale(160 + (x + y) % 2 * 20 - (x + y) % 3 * 8);  // gray
		canvas.strokeStyle = canvas.fillStyle;
		drawProjectedPolygon([
			point[0], point[1], point[5], point[4]
		]);
	}
	// top
	if ((x + y) % 2 > 0.5) {
		canvas.fillStyle    = grayScale(240 + z * 10);  // gray
	} else {
		canvas.fillStyle    = grayScale(230 + z * 10);  // gray
	}
	if (type == 1) {
		canvas.fillStyle    = 'rgba(255,255,50,1)';
	}
	canvas.strokeStyle = canvas.fillStyle;
	drawProjectedPolygon([
		point[0], point[1], point[2], point[3]
	]);
	// symbols on top
	
}