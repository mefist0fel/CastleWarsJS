function GameObject() {
	var obj = {
		active: false,
		position: [0, 0, 0],
		velocity: [0, 0, 0],
		life: 100,
		radius: 0.2
	}
	return obj;
}

function Hero() {
	var hero = {
		position: [26.5, 26.5, 2],
		velocity: [0, 0, 0],
		life: 100,
		radius: 0.2,
		canJump: false,
		hoverHeight: 0.3,
		hoverTime: 0,
		animate: function (dt) {
			this.hoverTime += dt;
			if (this.hoverTime > 1.8) {
				this.hoverTime = 0;
			}
			this.hoverHeight = Math.sin(this.hoverTime / 1.8 * 3.14 * 2) * 0.06 + 0.4;
		}
	}
	return hero;
}

var moveDirection = [];

function getAngleVector(angle, multiplier) {
	var angX = Math.sin(angle / 180 * 3.14);
	var angY = Math.cos(angle / 180 * 3.14);
	return [angX * multiplier, angY * multiplier, 0];
}

function setMoveDirection(cameraAngle) {
	// UP
	// DOWN 
	// LEFT 
	// RIGHT
	moveDirection = [
		getAngleVector(cameraAngle + 180, 1.8),
		getAngleVector(cameraAngle + 0, 1.8),
		getAngleVector(cameraAngle + 90, 1.8),
		getAngleVector(cameraAngle + 270, 1.8)
	];
}

var shadowPoints = [16];
for(var i = 0; i < 16; i ++) {
	shadowPoints[i] = [Math.cos(i * 22 / 180 * 3.14), Math.sin(i * 22 / 180 * 3.14)];// 22 = 360 / 16
}
function drawHeroShadow(x, y, z) {
	if (z <= 0 || player.position[2] < z) {
		return;
	}
	var xPlayer = Math.floor(player.position[0] - 0.5);
	var yPlayer = Math.floor(player.position[1] - 0.5);
	if ((x == xPlayer || x == xPlayer + 1) && (y == yPlayer || y == yPlayer + 1)) {
		// hero shadow
		canvas.fillStyle = 'rgba(0,0,0,0.2)';  // white
		canvas.strokeStyle = 'rgba(0,0,0,0.0)';  // white
		var heroOnMap = [x, y];
		if (cell(heroOnMap[0], heroOnMap[1]) > 0) {
			var mapHeight = cell(heroOnMap[0], heroOnMap[1]);
			var shadowRadius = player.radius * (1.0 - Math.max(0, player.position[2] - mapHeight) * 0.14);
			var shadow = [8];
			for(var z = 0; z < shadowPoints.length; z++) {
				shadow[z] = [
					Math.max(heroOnMap[0], Math.min(heroOnMap[0] + 1, player.position[0] + shadowPoints[z][0] * shadowRadius)),
					Math.max(heroOnMap[1], Math.min(heroOnMap[1] + 1, player.position[1] + shadowPoints[z][1] * shadowRadius)),
					mapHeight];
			}
			drawProjectedPolygon(shadow);
			canvas.fill();
		}
	}
}
function drawHero() {
	// test
	//canvas.font = "20pt Arial";
	//canvas.fillText("coord " + heroOnMap[0] + " " + heroOnMap[1] +  " " + cell(heroOnMap[0], heroOnMap[1]), 10, 30);
	// circle - hero
	canvas.fillStyle= '#FF0000';  // red
	canvas.beginPath();
	var heroPosition = toScreenSpace(vAdd(player.position, [0,0,player.hoverHeight]));
	canvas.arc(heroPosition[0], heroPosition[1], player.radius * /*4 * 18*/camera.unit, 0, 2*Math.PI);
	canvas.closePath();
	canvas.fill();
	canvas.fillStyle= '#FFFFFF';  // white
	canvas.beginPath();
	canvas.arc(heroPosition[0] + player.radius * 0.3 * /*4 * 18*/camera.unit, heroPosition[1] - player.radius * 0.3 */* 4 * 18*/camera.unit, player.radius * 0.2 * /*4 * 18*/camera.unit, 0, 2*Math.PI);
	canvas.closePath();
	canvas.fill();
}