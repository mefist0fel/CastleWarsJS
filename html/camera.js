function getBasis(len, angle, aspect) { // aspect y / x
	var angX = Math.sin(angle / 180 * 3.14);
	var angY = Math.cos(angle / 180 * 3.14);
	return [angX * len, angY * len * aspect];
}

function cutAngle(angle) {
	if (angle < 0) {
		angle += 360;
	}
	if (angle >= 360) {
		angle -= 360;
	}
	return angle;
}

function Camera() {
	var camera = {
		position: [25, 25, 0],
		angle: 42, 				// angle of camera view
		aspect: 1.6 / 3, 		// x / y aspect isometric 
		basis: [[70, 40], [40, -70]], // instead of projection matrix - 2 vector. Enougth for isometric view
		height: 50.0, // 50 - 1 unit height in pixels
		unit: 70,
		recalculateBasis: function(unitSize) {
			this.unit = unitSize;
			this.angle = cutAngle(this.angle);
			this.basis[0] = getBasis(unitSize, this.angle - 90, this.aspect);
			this.basis[1] = getBasis(unitSize, this.angle, this.aspect);
		}
	}
	camera.recalculateBasis(70); // 70 - 1 unit lenght in pixels.
	return camera;
}

function toScreenSpace(objectPosition) { // array [x, y, z]
	var position = vSub(objectPosition, camera.position);
	var x = position[0] * camera.basis[0][0] + position[1] * camera.basis[1][0];
	var y = position[0] * camera.basis[0][1] + position[1] * camera.basis[1][1];
	return [x + width * 0.5, y + height * 0.5 - position[2] * camera.height]; // isometric
	
	//var position = vSub(objectPosition, camera.position);
	//var x = position[0] * camera.basis[0][0] + position[1] * camera.basis[1][0];
	//var y = position[0] * camera.basis[0][1] + position[1] * camera.basis[1][1];
	//return [x * (1 + y / height * 0.5) + width * 0.5, y - position[2] * camera.height * (1 + y / height * 0.5) + height * 0.5];
	//perspective = 0.9 + (y / (height * 0.5) * 0.1);
	//return [(x * perspective + width * 0.5), (y * perspective + height * 0.5) - position[2] * camera.height]; // perspective isometric try
}

function drawProjectedPolygon(point) { // array of points [x, y, z]
	canvas.beginPath(); // top
	var coords = toScreenSpace(point[0]);
	canvas.moveTo(coords[0], coords[1]);
	for(var i = 1; i < point.length; i++) {
		coords = toScreenSpace(point[i]);
		canvas.lineTo(coords[0], coords[1]);
	}
	canvas.closePath(); // make line to first point
	canvas.fill();
	canvas.stroke();
}