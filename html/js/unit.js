const unitSize = 1;
const unitSpeed = 10;
const zeroVector = [0, 0];

function CreateUnit(x, y, factionId, pathToTarget) {
	var unit = {
		pos: [x, y],
		velocity: zeroVector,
		moveTime: 0,
		faction: factionId,
		target: null,
		path: [...pathToTarget],
		lives: 1,
		draw(canvas) {
			canvas.fillStyle = getFactionColor(unit.faction);
			fillRect (unit.pos[0] - unitSize, unit.pos[1] - unitSize, unitSize + unitSize, unitSize + unitSize)
		},
		update(dt) {
			// move to point
			unit.pos = AddVector2(unit.pos, MultiplyVector2(unit.velocity, dt))
			unit.moveTime -= dt
			// if movement ended - check do we have path or this is the end point of path
			if (unit.moveTime <= 0) {
				if (unit.path.length > 0) {
					// get next point from path stack
					unit.target = unit.path.pop()
					var delta = SubstractVector2(unit.target.pos, unit.pos)
					var direction = NormalizeVector2(delta)
					var distance = magnitude(delta)
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
