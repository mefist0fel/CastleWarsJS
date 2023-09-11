const
	unitHeight = 5,
	unitSize = 1,
	unitSpeed = 1,
	zeroVector = [0, 0]

var
	units = []

function CreateUnit(x, y, factionId, pathToTarget, offset = 0) {
	var unit = {
		offset: offset,
		offsetVector: [0, 0],
		coord: [x, y],
		position: CreateVector3(x * 50, y * 50),
		screenPosition: CreateVector3(),
		screenPositionTop: CreateVector3(),
		velocity: zeroVector,
		moveTime: 0,
		faction: factionId,
		target: null,
		path: [...pathToTarget],
		lives: 1,
        prepareScene () {
			this.screenPosition = WorldToScreenVector3(this.position)
			this.screenPositionTop = WorldToScreenVector3(AddVector3(this.position, CreateVector3(0, 0, unitHeight)))
           // this.depth = -this.screenPosition[2] - 50
            this.depth = -this.screenPosition[2] - 500
        },
		draw() {
			// Draw unit
			var height = Math.abs(SubstractVector3(this.screenPosition, this.screenPositionTop)[2]);
			var smallHeight = height * 0.2;
			var width = height * 0.34;
			let shieldLeft = [
				AddVector3(this.screenPosition, CreateVector3(0, smallHeight)),
				AddVector3(this.screenPosition, CreateVector3(width, 0)),
				AddVector3(this.screenPosition, CreateVector3(width, -height)),
				AddVector3(this.screenPosition, CreateVector3(0, -height)),
			]
			let shieldRight = [
				AddVector3(this.screenPosition, CreateVector3(0, smallHeight)),
				AddVector3(this.screenPosition, CreateVector3(0, -height)),
				AddVector3(this.screenPosition, CreateVector3(-width, -height)),
				AddVector3(this.screenPosition, CreateVector3(-width, 0)),
			]
			// canvas.fillRect  (this.screenPosition[0] - width, this.screenPosition[1] - height, width + width, height)
			canvas.fillStyle = Vector3ToColor(MultiplyVector3(getFactionColorVector3(this.faction), 0.95));
			DrawQuad(shieldLeft)
			canvas.fillStyle = Vector3ToColor(MultiplyVector3(getFactionColorVector3(this.faction), 0.85));
			DrawQuad(shieldRight)
		},
		update(dt) {
			// move to point
			this.coord = AddVector2(this.coord, MultiplyVector2(this.velocity, dt))
			this.position = [
				(this.coord[0] + this.offsetVector[0] * this.offset * 0.2) * 50,
				(this.coord[1] + this.offsetVector[1] * this.offset * 0.2) * 50,
				Sin(this.moveTime * 30 + this.offset) * 2]
			this.moveTime -= dt
			// if movement ended - check do we have path or this is the end point of path
			if (this.moveTime <= 0) {
				if (this.path.length > 0) {
					// get next point from path stack
					this.target = this.path.pop()
					var delta = SubstractVector2(this.target.coord, this.coord)
					var direction = NormalizeVector2(delta)
					this.offsetVector = [-direction[1], direction[0]] // prependicular
					var distance = Vector2Length(delta)
					this.velocity = MultiplyVector2(direction, unitSpeed)
					this.moveTime = distance / unitSpeed
				} else {
					// attack and
					this.target.attack(this.faction)
					// kill
					removeItem(gameObjects, unit)
					removeItem(objects3d, unit)
					removeItem(units, unit)
				}
			}
		}
	}
	gameObjects.push(unit)
	objects3d.push(unit)
	units.push(unit)
	return unit;
}

function removeUnits() {
	for(i = 0; i < units.length; i++)
	{
		removeItem(gameObjects, units[i])
		removeItem(objects3d, units[i])
	}
	units = []
}

function removeItem(array, item) {
	const index = array.indexOf(item);
	if (index > -1) {
		array.splice(index, 1);
	}
}
