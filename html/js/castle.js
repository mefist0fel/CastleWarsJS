const castleSize = 3;
const troopSendDelay = 0.2;
var castles = []

function CreateCastle(x, y, factionId = -1, level=0) {
	const sizes = [1, 2, 3];
	const spawn = [1, 2, 3];
	const upgradeCost = [15, 20, 999]
	var castle = {
		pos: [x, y],
		faction: factionId,
		attackCount: 0,
		pathToTarget: null,
		target: null,
		level: level,
		lives: 10,
		max: 100,
		reloadTime: 1,
		sendTroopTime: 0,
		neibghors: [],
		distance: 0,
		pathCastle: null,
		draw() {
			canvas.fillStyle = getFactionColor(castle.faction);
			let size = sizes[this.level];
			fillRect(castle.pos[0] - size, castle.pos[1] - size, size + size, size + size)
			canvas.textAlign = 'center';
			fillText(castle.lives, castle.pos[0], castle.pos[1] - size - 1);
			// upgrade marker
			if (castle.lives >= upgradeCost[castle.level]) {
				fillRect (castle.pos[0] + size + size, castle.pos[1] - size - size - 1, 1, 1)
			}
		},
		drawSelection() {
			canvas.fillStyle = '#FFFFFF';// white
			let size = sizes[this.level] + 1;
			fillRect (castle.pos[0] - size, castle.pos[1] - size, size + size, size + size)
			// Move
			canvas.fillStyle = '#FF00FF';
			castles.forEach(c => {
				if (c.pathCastle != null) {
					let size = sizes[c.level] + 1;
					fillRect(c.pos[0] - size, c.pos[1] - size, size + size, size + size)
				}
			});
		},
		upgrade() {
			if (this.lives >= upgradeCost[castle.level]) {
				this.lives -= upgradeCost[castle.level]
				this.level += 1
			}
		},
		update(dt) {
			this.reloadTime -= dt;
			if (this.reloadTime <= 0) {
				this.reloadTime = reloadTime;
				if (this.faction >= 0 && castle.lives < castle.max) {
					this.lives += spawn[this.level];
				}
			}
			if (this.sendTroopTime > 0) {
				this.sendTroopTime -= dt;
			} else {
				if (this.lives > 0 && this.attackCount > 0) {
					this.lives -= 1;
					this.attackCount -= 1;
					CreateUnit(this.pos[0], this.pos[1], this.faction, this.pathToTarget);
					this.sendTroopTime += troopSendDelay;
				} else {
					this.target = null;
				} 
			}
		},
		
		contains(x, y) {
			let pos = castle.pos;
			return (
				pos[0] - castleSize < x && 
				pos[1] - castleSize < y && 
				pos[0] + castleSize > x && 
				pos[1] + castleSize > y)
		},
		attack(factionId) {
			if (this.faction == factionId) {
				this.lives += 1;
			} else {
				if (this.lives <= 0) {
					this.faction = factionId;
					this.lives = 1;
				} else {
					this.lives -= 1;
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
	}
	gameObjects.push(castle)
	drawObjects.push(castle)
	castles.push(castle)
	return castle;
}

function getFactionColor(factionId) {
	switch (factionId) {
		case 0: return '#0000FF'; // player
		case 1: return '#FF0000'; // enemy
		case 2: return '#00FF00'; // enemy 2
		case -1:
		default:	
			return '#555555'; // neutral
	}
}

function getCastle(pos) {
	let
		x = (pos[0] - centerX) / screenScale,
		y = (pos[1] - centerY) / screenScale

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
			if (i != j && Vector2Distance(castles[i].pos, castles[j].pos) < maxDistance) {
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
				let distanceFromStart = castle.distance + Vector2Distance(castle.pos, nCastle.pos)
				if (nCastle.distance > distanceFromStart) {
					nCastle.distance = distanceFromStart
					nCastle.pathCastle = castle
					if (nCastle.faction == startCastle.faction) {
						openList.push(nCastle)
					}
				}
			})
	}
}
