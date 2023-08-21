const castleSize = 40;
const selectionHeight = 45;

function Castle(x, y, factionId = -1) {
	var castle = {
		pos: [x, y],
		faction: factionId,
		lives: 10,
		max: 100,
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
		apply() {
			if (castle.lives < castle.max) {
				castle.lives += 1;
			}
		},
		contains(point) {
			let pos = castle.pos;
			return (
				pos[0] - castleSize < point[0] && 
				pos[1] - castleSize < point[1] && 
				pos[0] + castleSize > point[0] && 
				pos[1] + castleSize > point[1])
		}
	}
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