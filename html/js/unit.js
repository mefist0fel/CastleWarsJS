const unitSize = 6;
const unitSpeed = 100;

function CreateUnit(x, y, factionId, target) {
	var delta = vSub(target.pos, [x, y])
	var direction = vNorm(delta)
	var distance = magnitude(delta)

	var unit = {
		pos: [x, y],
		velocity: vMult(direction, unitSpeed),
		lifeTime: distance / unitSpeed,
		faction: factionId,
		target: target,
		lives: 1,
		draw(canvas) {
			canvas.fillStyle = getFactionColor(unit.faction);
			canvas.fillRect (unit.pos[0] - unitSize, unit.pos[1] - unitSize, unitSize + unitSize, unitSize + unitSize)
		},
		update(dt) {
			unit.pos = vAdd(unit.pos, vMult(unit.velocity, dt))
			unit.lifeTime -= dt
			if (unit.lifeTime <= 0) {
				target.attack(unit.faction)
				// kill
				removeItem(gameObjects, unit)
				removeItem(drawObjects, unit)
			}
		}
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
