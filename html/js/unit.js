const unitSize = 1;
const unitSpeed = 1;
const zeroVector = [0, 0];

function CreateUnit(x, y, factionId, pathToTarget) {
	var unit = {
		coord: [x, y],
		pos2d: [x * 10, y * 10],
		velocity: zeroVector,
		moveTime: 0,
		faction: factionId,
		target: null,
		path: [...pathToTarget],
		lives: 1,
		draw(canvas) {
			canvas.fillStyle = getFactionColor(unit.faction);
			fillRect (unit.pos2d[0] - unitSize, unit.pos2d[1] - unitSize, unitSize + unitSize, unitSize + unitSize)
		},
		update(dt) {
			// move to point
			unit.coord = AddVector2(unit.coord, MultiplyVector2(unit.velocity, dt))
			unit.pos2d = [unit.coord[0] * 10, unit.coord[1] * 10]
			unit.moveTime -= dt
			// if movement ended - check do we have path or this is the end point of path
			if (unit.moveTime <= 0) {
				if (unit.path.length > 0) {
					// get next point from path stack
					unit.target = unit.path.pop()
					var delta = SubstractVector2(unit.target.coord, unit.coord)
					var direction = NormalizeVector2(delta)
					var distance = Vector2Length(delta)
					unit.velocity = MultiplyVector2(direction, unitSpeed)
					unit.moveTime = distance / unitSpeed
				} else {
					// attack and
					unit.target.attack(unit.faction)
					// kill
					removeItem(gameObjects, unit)
					removeItem(drawObjects, unit)
				}
			}
		},
	}
	gameObjects.push(unit)
	drawObjects.push(unit)
	return unit;
}

function removeItem(array, item) {
	const index = array.indexOf(item);
	if (index > -1) {
		array.splice(index, 1);
	}
}
