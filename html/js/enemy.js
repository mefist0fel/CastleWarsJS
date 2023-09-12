

function CreateEnemy(factionId = 1, dummyDelay = 1) {
	const updateDelay = 0.5
	let enemy = {
		enable: true,
		factionId: factionId,
		timer: updateDelay,
		threshold: 20,
		dummyDelay: dummyDelay,
		update(dt) {
			if (!this.enable) {
				return
			}
			this.timer -= dt
			if (this.timer < 0) {
				this.timer = updateDelay + Random() * this.dummyDelay
				castles.forEach(
					castle => {
						if (castle.factionId == this.factionId) {
							if (castle.lives > this.threshold) {
								// can try to upgrade castle
								if (castle.level > 3) {
									this.attackSomebody(castle)
								}
								if (Random() < 0.3) {
									castle.upgrade()
								} else {
									this.attackSomebody(castle)
								}
							}
							this.threshold = 20 + Random(15)
						}
					})
			}
		},
		attackSomebody(fromCastle) {
			findAvailableForMoveCastles(fromCastle)
			let castlesToAttack = []
			// attack enemy castles first
			castles.forEach(castle => {
				if (castle != fromCastle && castle.pathCastle != null && castle.factionId != this.factionId) {
					castlesToAttack.push(castle)
				}
			})
			// your castle
			if (castlesToAttack.length == 0) {
				castles.forEach(castle => {
					if (castle != fromCastle && castle.pathCastle != null && castle.factionId == this.factionId) {
						castlesToAttack.push(castle)
					}
				})
			}
			if (castlesToAttack.length > 0) {
				fromCastle.sendArmy(castlesToAttack[Math.floor(Random()*castlesToAttack.length)])
			}
		}
	}
	gameObjects.push(enemy)
	return enemy
}
