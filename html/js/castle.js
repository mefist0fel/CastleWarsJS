const castleSize = 3;
const troopSendDelay = 0.3;
var castles = []
var selectedCastle = null;

function CreateCastle(x, y, factionId = -1, level=0) {
	const
		_ = -0.0001,
		spawn = [1, 2, 3],
		upgradeCost = [15, 20, 999],
		max = [50, 80, 100],
		whiteColor = CreateVector3(1, 1, 1),
		grayColor = CreateVector3(0.5, 0.5, 0.5),
		heightMap = [
			// small castle
			[
				_, _, _, _, _,
				_, 4, 2, 4, _,
				_, 2, 0, 2, _,
				_, 4, 2, 4, _,
				_, _, _, _, _
			],
			// med castle
			[
				_, 4, 2, 4, _,
				4, 2, 2, 2, 4,
				2, 2, 5, 2, 2,
				4, 2, 2, 2, 4,
				_, 4, 2, 4, _
			],
			// big castle
			[
				4, 2, 3, 2, 4,
				2, 7, 5, 7, 2,
				3, 5, 3, 5, 3,
				2, 7, 5, 7, 2,
				4, 2, 3, 2, 4
			]
		]
	
	var castle = {
		coord: [x, y],
		position: CreateVector3(x * 50, y * 50),
		screenPosition: CreateVector3(),
		screenTopPosition: CreateVector3(),
		screenSize: [10, 10],
		factionId: factionId,
		attackCount: 0,
		pathToTarget: null,
		target: null,
		level: level,
		lives: 10,
		reloadTime: 1,
		sendTroopTime: 0,
		neibghors: [],
		distance: 0,
		depth: 0,
		pathCastle: null,
        prepareScene () {
			this.screenPosition = WorldToScreenVector3(this.position)
			this.screenTopPosition = WorldToScreenVector3(AddVector3(this.position, CreateVector3(0, 0, 64)))
			let rectSize = Math.abs(this.screenTopPosition[1] - this.screenPosition[1])
			this.screenSize = [rectSize * 1.2, rectSize]
            this.depth = -this.screenPosition[2] - 1000
        },
		draw() {
			// Draw
			canvas.fillStyle = Vector3ToColor(getFactionColorVector3(castle.factionId))
			canvas.textAlign = 'center'
			fillText(castle.lives, castle.screenTopPosition[0], castle.screenTopPosition[1])
			// upgrade marker
			if (castle.lives >= upgradeCost[castle.level]) {
				fillText ("^", castle.screenTopPosition[0] + this.screenSize[0] * 0.5, castle.screenTopPosition[1])
			}
		},
		upgrade() {
			if (this.lives >= upgradeCost[castle.level]) {
				this.lives -= upgradeCost[castle.level]
				this.level += 1
				// update size
				this.rebuild()
			}
		},
		update(dt) {
			this.reloadTime -= dt
			if (this.reloadTime <= 0) {
				this.reloadTime = reloadTime
				if (this.factionId >= 0 && castle.lives < max[castle.level]) {
					this.lives += spawn[this.level]
				}
			}
			if (this.sendTroopTime > 0) {
				this.sendTroopTime -= dt
			} else {
				if (this.lives > 0 && this.attackCount > 0) {
					let unitsToSend = 3
					while (unitsToSend > 0 && this.attackCount > 0 && this.lives > 0) {
						this.lives -= 1
						this.attackCount -= 1
						CreateUnit(this.coord[0], this.coord[1], this.factionId, this.pathToTarget, (unitsToSend - 2))
						unitsToSend -= 1
					}
					this.sendTroopTime += troopSendDelay
				} else {
					this.target = null
				} 
			}
		},
		
		contains(x, y) {
			return (
				this.screenPosition[0] - this.screenSize[0] < x && 
				this.screenPosition[1] - this.screenSize[1] < y && 
				this.screenPosition[0] + this.screenSize[0] > x && 
				this.screenPosition[1] + this.screenSize[1] > y
			)
		},
		attack(factionId) {
			if (this.factionId == factionId) {
				this.lives += 1
			} else {
				if (this.lives <= 0) {
					this.factionId = factionId
					// update color
					this.rebuild()
					this.lives = 1
				} else {
					this.lives -= 1
				}
			}
		},
		sendArmy(target) {
			if (target == null || target.pathCastle == null)
				return
			
			this.target = target
			this.attackCount = this.lives / 2
			let pathToTarget = []
			pathToTarget.push(target)
			while (target.pathCastle != null) {
				target = target.pathCastle
				pathToTarget.push(target)
			}
			this.pathToTarget = pathToTarget
		},
		rebuild() {
			ApplyCastleHeight(castleTiles, 40 + this.coord[0] * 5, 40 + this.coord[1] * 5, heightMap[this.level], 5, 6);
			ApplyCastleColor(castleTiles, 40 + this.coord[0] * 5, 40 + this.coord[1] * 5, 5, getFactionColorVector3(this.factionId))
			castleTiles.rebuild()
		},
		setSelected(isSelected) {
			let 
				height = -0.00001,
				color = whiteColor
			if (this.pathCastle != null) {
				color = grayColor
				height = 0
			}
			if (isSelected) {
				height = 0
			}
			SetSelectionBorder(castleTiles, 39 + this.coord[0] * 5, 39 + this.coord[1] * 5, 7, color, height)
		}
	}
	gameObjects.push(castle)
	objects3d.push(castle)
	castles.push(castle)
	castle.rebuild()
	return castle;
}

function updateSelection() {
	castles.forEach(c => c.setSelected(c == selectedCastle));
	castleTiles.rebuild()
}
function getFactionColorVector3(factionId) {
	switch (factionId) {
		case 0: return CreateVector3(0.2, 0.2, 1.0); // player
		case 1: return CreateVector3(1.0, 0.2, 0.2); // enemy
		case 2: return CreateVector3(0.2, 1.0, 0.2); // enemy 2
		case -1:
		default:	
			return CreateVector3(0.6, 0.6, 0.6); // neutral
	}
}

function getCastle(pos) {
	let
		x = pos[0],
		y = pos[1]

	for(var i = 0; i < castles.length; i++) {
		if (castles[i].contains(x, y)) {
			return castles[i];
		}
	}
	return null;
}

function findNeibghors(maxDistance) {
	for(var i = 0; i < castles.length; i++) {
		for(var j = 0; j < castles.length; j++) {
			if (i != j && Vector2Distance(castles[i].coord, castles[j].coord) < maxDistance) {
				castles[i].neibghors.push(castles[j]);
			}
		}
	}
}

function findAvailableForMoveCastles(startCastle) {
	castles.forEach(
		castle => {
			castle.distance = 99999
			castle.pathCastle = null
		})
	if (startCastle == null) {
		return
	}
	let openList = []
	openList.push(startCastle)
	startCastle.distance = 0
	while (openList.length > 0) {
		let castle = openList.pop()
		castle.neibghors.forEach(
			nCastle => {
				let distanceFromStart = castle.distance + Vector2Distance(castle.coord, nCastle.coord)
				if (nCastle.distance > distanceFromStart) {
					nCastle.distance = distanceFromStart
					nCastle.pathCastle = castle
					if (nCastle.factionId == startCastle.factionId) {
						openList.push(nCastle)
					}
				}
			})
	}
}
