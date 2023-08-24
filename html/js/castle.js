const castleSize = 40;
const selectionHeight = 45;
const troopSendDelay = 0.2;
var castles = []

function CreateCastle(x, y, factionId = -1, level=0) {
	const sizes = [20, 30, 40];
	const spawn = [1, 2, 3];
	var castle = {
		pos: [x, y],
		faction: factionId,
		attackCount: 0,
		target: null,
		level: level,
		lives: 10,
		max: 100,
		reloadTime: 1,
		sendTroopTime: 0,
		draw() {
			canvas.fillStyle = getFactionColor(castle.faction);
			let size = sizes[this.level];
			canvas.fillRect (castle.pos[0] - size, castle.pos[1] - size, size + size, size + size)
			canvas.textAlign = 'center';
			canvas.fillText(castle.lives, castle.pos[0], castle.pos[1] - 50);
		},
		drawSelection() {
			canvas.fillStyle = '#FFFFFF';// white
			canvas.fillRect (castle.pos[0] - selectionHeight, castle.pos[1] - selectionHeight, selectionHeight + selectionHeight, selectionHeight + selectionHeight)
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
					CreateUnit(this.pos[0], this.pos[1], this.faction, this.target);
					this.sendTroopTime += troopSendDelay;
				} else {
					this.target = null;
				} 
			}
		},
		
		contains(point) {
			let pos = castle.pos;
			return (
				pos[0] - castleSize < point[0] && 
				pos[1] - castleSize < point[1] && 
				pos[0] + castleSize > point[0] && 
				pos[1] + castleSize > point[1])
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
			this.target = target
			this.attackCount = this.lives / 2
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
	for(var i = 0; i < castles.length; i++) {
		if (castles[i].contains(pos)) {
			return castles[i];
		}
	}
	return null;
}
