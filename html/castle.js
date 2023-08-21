function Castle(x, y, factionId = -1) {
	var castle = {
		pos: [x, y],
		faction: factionId,
		lives: 10,
		max: 100,
		draw(canvas) {
			const castleHeight = 60;
			canvas.fillStyle = getFactionColor(castle.faction);  // white
			canvas.fillRect (castle.pos[0] - castleHeight, castle.pos[1] - castleHeight, castleHeight + castleHeight, castleHeight + castleHeight)
			canvas.fillText(castle.lives, castle.pos[0], castle.pos[1] - 70);
		},
		apply() {
			if (castle.lives < castle.max) {
				castle.lives += 1;
			}
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