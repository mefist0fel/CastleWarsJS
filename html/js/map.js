let
	heightMap = [],
	axeX = [1, 0],
	axeY = [0, 1],
	axeZ = [0, 0.5],
	mapSize = 100,
	halfMapSize = 50,
	angle = 0,
	mapScale = 3


for(i = 0; i < mapSize; i++)
{
	for(j = 0; j < mapSize; j++)
	{
		heightMap.push(Math.random() * 3)
	}
}



function CreateCell(x, y, z) {
	var cell = {
		pos: CreateVector3(x, y, z),
		draw() {
		},
		// update(dt) {
		// 	this.reloadTime -= dt;
		// 	if (this.reloadTime <= 0) {
		// 		this.reloadTime = reloadTime;
		// 		if (this.faction >= 0 && castle.lives < castle.max) {
		// 			this.lives += spawn[this.level];
		// 		}
		// 	}
		// 	if (this.sendTroopTime > 0) {
		// 		this.sendTroopTime -= dt;
		// 	} else {
		// 		if (this.lives > 0 && this.attackCount > 0) {
		// 			this.lives -= 1;
		// 			this.attackCount -= 1;
		// 			CreateUnit(this.pos[0], this.pos[1], this.faction, this.pathToTarget);
		// 			this.sendTroopTime += troopSendDelay;
		// 		} else {
		// 			this.target = null;
		// 		} 
		// 	}
		// },
	}
	// gameObjects.push(castle)
	drawObjects.push(cell)
	//castles.push(castle)
	return cell;
}


function drawMap()
{
	for(i = 0; i < mapSize; i++)
	{
		for(j = 0; j < mapSize; j++)
		{
			drawCell(i - halfMapSize, j - halfMapSize, heightMap[i + j *mapSize])
		}
	}
	angle += 0.001
	axeX = getAxes(angle)
	axeY = getAxes(angle + 0.5)
}

function drawCell(x, y, z)
{
	// let pos = vAdd(vAdd(vMult(axeX, x), vMult(axeY, y)), vMult(axeZ, z))
	// canvas.fillRect (pos[0] * screenScale * mapScale + centerX, pos[1] * screenScale * mapScale + centerY, 10, 10)
	
	//canvas.fillStyle = this.color
	//canvas.strokeStyle = this.color
	canvas.beginPath()
	let a = getPos(x - 0.5, y - 0.5, z),
		b = getPos(x - 0.5, y + 0.5, z),
		c = getPos(x + 0.5, y + 0.5, z),
		d = getPos(x + 0.5, y - 0.5, z)
	//let last = this.screenPoints[this.screenPoints.length - 1]
	canvas.moveTo(d[0] * screenScale * mapScale + centerX, d[1] * screenScale * mapScale + centerY)
	canvas.lineTo(a[0] * screenScale * mapScale + centerX, a[1] * screenScale * mapScale + centerY)
	canvas.lineTo(b[0] * screenScale * mapScale + centerX, b[1] * screenScale * mapScale + centerY)
	canvas.lineTo(c[0] * screenScale * mapScale + centerX, c[1] * screenScale * mapScale + centerY)
	canvas.lineTo(d[0] * screenScale * mapScale + centerX, d[1] * screenScale * mapScale + centerY)
	canvas.closePath()
	canvas.fill()
	canvas.stroke()
}

function getPos(x, y, z) {
	return vAdd(vAdd(vMult(axeX, x), vMult(axeY, y)), vMult(axeZ, z))
}

function getAxes(angle) {
	const pi = 3.1415
	return [Math.cos(angle * pi), Math.sin(angle * pi) * 0.6]
}