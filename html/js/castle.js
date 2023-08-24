const castleSize = 40;
const selectionHeight = 45;
const troopSendDelay = 0.2;

function CreateCastle(x, y, factionId = -1) {
	var castle = {
		pos: [x, y],
		faction: factionId,
		attackCount: 0,
		target: null,
		lives: 10,
		max: 100,
		reloadTime: 1,
		sendTroopTime: 0,
		draw(canvas) {
			canvas.fillStyle = getFactionColor(castle.faction);
			canvas.fillRect (castle.pos[0] - castleSize, castle.pos[1] - castleSize, castleSize + castleSize, castleSize + castleSize)
			canvas.textAlign = 'center';
			canvas.fillText(castle.lives, castle.pos[0], castle.pos[1] - 50);
		},
		drawSelection(canvas) {
			canvas.fillStyle = '#FFFFFF';// white
			canvas.fillRect (castle.pos[0] - selectionHeight, castle.pos[1] - selectionHeight, selectionHeight + selectionHeight, selectionHeight + selectionHeight)
		},
		update(dt) {
			castle.reloadTime -= dt;
			if (castle.reloadTime <= 0) {
				castle.reloadTime = reloadTime;
				if (castle.faction >= 0 && castle.lives < castle.max) {
					castle.lives += 1;
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
			if (castle.faction == factionId) {
				castle.lives += 1;
			} else {
				if (castle.lives <= 0) {
					castle.faction = factionId;
					castle.lives = 1;
				} else {
					castle.lives -= 1;
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
