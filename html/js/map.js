let
	mapSize = 35,
	halfMapSize = 17,
	mapScale = 60,
	halfMapScale = 30,
	CreateArray = Array,
	maps = []

const tileOffsets = [
	CreateVector3(-1, 1),
	CreateVector3(-1,-1),
	CreateVector3( 1, 1),
	CreateVector3( 1,-1)
]

//CreateQuad3D(tileOffsets[0], tileOffsets[1], tileOffsets[2], tileOffsets[3])

function CreateCellMap(mapSize, scale, threshold = -1, depthOffset = 0) {
	let pointsLen = mapSize * 4;
	let map = {
		heightMap: CreateArray(mapSize * mapSize),
		heightMapCache: CreateArray(mapSize * mapSize),
		points: CreateArray(mapSize * mapSize * 4),
		colors: CreateArray(mapSize * mapSize),
		colorsCache: CreateArray(mapSize * mapSize),
		tiles: CreateArray(mapSize * mapSize),
		tilesTop: CreateArray(mapSize * mapSize),
		tilesLeft: CreateArray(mapSize * mapSize),
		size: mapSize,
		threshold: threshold,
		setHeight(x, y, height) {
			SetElementSafe(this.heightMapCache, x, y, this.size, height)
		},
		getHeight(x, y) {
			return GetElementSafe(this.heightMapCache, x, y, this.size, 0)
		},
		setColor(x, y, color) {
			SetElementSafe(this.colorsCache, x, y, this.size, color)
		},
		getColor(x, y) {
			return GetElementSafe(this.colorsCache, x, y, this.size, CreateVector3())
		},
		update(dt) {
			const
				heightConversionTime = 50,
				colorConversionTime = 2
			let needRebuild = false
			for(var i = 0; i < this.heightMapCache.length; i++)
			{
				if (this.heightMap[i] != this.heightMapCache[i]) {
					this.heightMap[i] = Merge(this.heightMap[i], this.heightMapCache[i], heightConversionTime * dt)
					needRebuild = true
				}
			}
			for(var i = 0; i < this.colorsCache.length; i++)
			{
				if (this.colors[i][0] != this.colorsCache[i][0] ||
					this.colors[i][1] != this.colorsCache[i][1] ||
					this.colors[i][2] != this.colorsCache[i][2])
					{
						needRebuild = true
						this.colors[i][0] = Merge(this.colors[i][0], this.colorsCache[i][0], colorConversionTime * dt)
						this.colors[i][1] = Merge(this.colors[i][1], this.colorsCache[i][1], colorConversionTime * dt)
						this.colors[i][2] = Merge(this.colors[i][2], this.colorsCache[i][2], colorConversionTime * dt)
					}
			}
			if (needRebuild) {
				this.rebuild()
			}
		},
		rebuild() {
			for(var i = 0; i < this.size; i++)
			{
				for(var j = 0; j < this.size; j++)
				{
					let index = GetMapIndex(i, j, this.size)
					let position = CreateVector3((i -  mapHalfSize) *  scale, (j - mapHalfSize) * scale, this.heightMap[index])

					for(let pointIdx = 0; pointIdx < 4; pointIdx ++) {
						let ptIndex = GetMapIndex(i * 2 + Math.floor(pointIdx / 2) ,  j * 2 + pointIdx % 2, pointsLen)
						this.points[ptIndex] = AddVector3(position, MultiplyVector3(tileOffsets[pointIdx], mapHalfScale))
					}
				}
			}
			for(var i = 0; i < this.size; i++)
			{
				for(var j = 0; j < this.size; j++)
				{
					let index = GetMapIndex(i, j, this.size)
					this.tiles[index].setPoints(
						this.points[GetMapIndex(i * 2 + 0 ,  j * 2 + 0, pointsLen)],
						this.points[GetMapIndex(i * 2 + 1 ,  j * 2 + 0, pointsLen)],
						this.points[GetMapIndex(i * 2 + 1 ,  j * 2 + 1, pointsLen)],
						this.points[GetMapIndex(i * 2 + 0 ,  j * 2 + 1, pointsLen)])
					this.tiles[index].setColor(this.colors[index])
					this.tiles[index].enable = this.heightMap[index] >= this.threshold

					if (i < this.size - 1) {
						this.tilesTop[index].setPoints(
							this.points[GetMapIndex(i * 2 + 1 ,  j * 2 + 0, pointsLen)],
							this.points[GetMapIndex(i * 2 + 2 ,  j * 2 + 0, pointsLen)],
							this.points[GetMapIndex(i * 2 + 2 ,  j * 2 + 1, pointsLen)],
							this.points[GetMapIndex(i * 2 + 1 ,  j * 2 + 1, pointsLen)])
						let topIndex = GetMapIndex(i + 1, j, this.size)
						let color
						if (this.heightMap[index] > this.heightMap[topIndex]) {
							color = MultiplyVector3(this.colors[index], 0.8)
							this.tilesTop[index].enable = this.heightMap[index] >= this.threshold
						} else {
							color = MultiplyVector3(this.colors[topIndex], 0.8)
							this.tilesTop[index].enable = this.heightMap[topIndex] >= this.threshold
						}
						this.tilesTop[index].setColor(color)
					}

					if (j < this.size - 1) {
						this.tilesLeft[index].setPoints(
							this.points[GetMapIndex(i * 2 + 1 ,  j * 2 + 0, pointsLen)],
							this.points[GetMapIndex(i * 2 + 0 ,  j * 2 + 0, pointsLen)],
							this.points[GetMapIndex(i * 2 + 0 ,  j * 2 + 3, pointsLen)],
							this.points[GetMapIndex(i * 2 + 1 ,  j * 2 + 3, pointsLen)])
						let leftIndex = GetMapIndex(i, j + 1, this.size)
						let color
						if (this.heightMap[index] > this.heightMap[leftIndex]) {
							color = MultiplyVector3(this.colors[index], 0.7)
							this.tilesLeft[index].enable = this.heightMap[index] >= this.threshold
						} else {
							color = MultiplyVector3(this.colors[leftIndex], 0.7)
							this.tilesLeft[index].enable = this.heightMap[leftIndex] >= this.threshold
						}
						this.tilesLeft[index].setColor(color)
					}
				}
			}
		},
		clear(height = 0) {
			for(var i = 0; i < this.size; i++)
			{
				for(var j = 0; j < this.size; j++)
				{
					let index = GetMapIndex(i, j, this.size)
					this.heightMapCache[index] = height
				}
			}
			this.rebuild()
		}
	}

	let
		mapHalfSize = (mapSize - 1) * 0.5,
		mapHalfScale = scale * 0.5

	for(var i = 0; i < map.size; i++)
	{
		for(var j = 0; j < map.size; j++)
		{
			let index = GetMapIndex(i, j, map.size)
			map.heightMap[index] = map.threshold
			map.heightMapCache[index] = map.threshold
			let color = CreateVector3(1, 1, 1)
			map.tiles[index] = CreateQuad3D(color, color, color, color, color, depthOffset)
			map.tilesTop[index] = CreateQuad3D(color, color, color, color, color, depthOffset)
			map.tilesLeft[index] = CreateQuad3D(color, color, color, color, color, depthOffset)
			map.colorsCache[index] = color;
			map.colors[index] = CreateVector3(0, 0, 0);
		}
	}
	map.rebuild()
	maps.push(map)
	return map
	
	function SetElementSafe(list, x, y, size, value) {
		let index = GetMapIndex(x, y, size);
		if (index >= 0 && index < list.length) {
			list[index] = value
		}
	}
	
	function GetElementSafe(list, x, y, size, defaultValue = null) {
		let index = GetMapIndex(x, y, size);
		if (index >= 0 && index < list.length) {
			return list[index]
		}
		return defaultValue
	}

	function GetMapIndex(i, j, xFactor = 1, yFactor = 1) {
		return i * xFactor + j * yFactor;
	}
	
	function Merge(from, to, speed) {
		if (from > to) {
			from -= speed
			if (from < to) {
				from = to
			}
		} else {
			from += speed
			if (from > to) {
				from = to
			}
		}
		return from
	}
}

function GetHeightColor(level) {
	// level should be 0-1
	let r = Clamp01(0.3 + level * 0.1)
	let g = Clamp01(0.5 + level * 0.5)
	let b = Clamp01(0.3 + level * 0.1)
	return CreateVector3(r, g, b)
}

function GetDesertHeightColor(level) {
	// level should be 0-1
	let r = Clamp01(0.5 + level * 0.5)
	let g = Clamp01(0.5 + level * 0.5)
	let b = Clamp01(0.3 + level * 0.1)
	return CreateVector3(r, g, b)
}

function GetSnowHeightColor(level) {
	if (level < 0) {
		level -= 0.5
	}
	// level should be 0-1
	let r = Clamp01(0.5 + level * 0.9)
	let g = Clamp01(0.5 + level * 0.9)
	let b = Clamp01(0.7 + level * 1.5)
	return CreateVector3(r, g, b)
}

function ApplyCastleHeight(tileMap, x, y, castleHeight, size, heightScale = 1) {
	for(var i = 0; i < size; i++) {
		for(var j = 0; j < size; j++) {
			tileMap.setHeight(x + i, y + j, castleHeight[i * size + j] * heightScale)
		}
	}
}

function SetSelectionBorder(tileMap, x, y, size, color, height) {
	for(var i = 0; i < size; i++) {
		for(var j = 0; j < size; j++) {
			if (i == 0 || j == 0 || i == size - 1 || j == size - 1) {
				tileMap.setHeight(x + i, y + j, height)
				tileMap.setColor(x + i, y + j, color)
			}
		}
	}
}

function ApplyCastleColor(tileMap, x , y, size, color) {
	for(var i = 0; i < size; i++) {
		for(var j = 0; j < size; j++) {
			tileMap.setColor(x + i, y + j, color)
		}
	}
}

const mapOffsets = [
    CreateVector3(-1,-1),
    CreateVector3(-1, 1),
    CreateVector3( 1, 1),
    CreateVector3( 1,-1)
]

var castleTiles = CreateCellMap(85, 10, 0, -50)
var map = CreateCellMap(mapSize, 50, -100)

function updateMap(heightFunction, colorFunction) {
	for(var i = 0; i < mapSize; i++)
	{
		for(var j = 0; j < mapSize; j++)
		{
			let height = heightFunction(i, j)
	
			let position = CreateVector3(i - halfMapSize, j - halfMapSize)
			let normalizedDistance = Clamp01(Vector3Length(position) / halfMapSize * 2.4 - 1)
			height *= normalizedDistance
			
			let isBorder = !(i > 0 && j > 0 && i < mapSize - 1 && j < mapSize - 1);
			if (isBorder)
				height = -100.01
	
			map.setHeight(i, j, height)
			map.setColor(i, j, colorFunction(i, j))
		}
	}
}
function getCenterFlat(x, y) {
	let position = CreateVector3(x - halfMapSize, y - halfMapSize)
	return Clamp01(Vector3Length(position) / halfMapSize * 2.4 - 1)
}

map.rebuild()

function CreateLevel(id) {
	removeUnits()
	removeCastles()
	castleTiles.clear(-0.00001)
	enemy.enable = true
	enemy.dummyDelay = 1 // default
	switch (id) {
		case -1:
			// Menu castle
			const
				_ = -0.0001,
				A = 15,
				F = 12,
				castleHeights = [
					A, F, A, F, A,
					F, F, F, F, F,
					A, F, F, F, A,
					F, F, F, F, F,
					A, F, A, F, A
				],
				castleTower = [
					7, 6, 7, 6, 7,
					6, 6, 6, 6, 6,
					7, 6, 2, 6, 7,
					6, 6, 6, 6, 6,
					7, 6, 7, 6, 7,
				],
				wallVer = [
					_, 4, 3, 4, _,
					_, 3, 3, 3, _,
					_, 4, 3, 4, _,
					_, 3, 3, 3, _,
					_, 4, 3, 4, _,
				], 
				wallHor = [
					_, _, _, _, _,
					4, 3, 4, 3, 4,
					3, 3, 3, 3, 3,
					4, 3, 4, 3, 4,
					_, _, _, _, _,
				]
			// angular towers
			ApplyCastleHeight(castleTiles, 33, 33, castleTower, 5, 6);
			ApplyCastleHeight(castleTiles, 33, 47, castleTower, 5, 6);
			ApplyCastleHeight(castleTiles, 47, 47, castleTower, 5, 6);
			ApplyCastleHeight(castleTiles, 47, 33, castleTower, 5, 6);
			// central tower
			ApplyCastleHeight(castleTiles, 40, 40, castleHeights, 5, 6);
			// walls tower
			ApplyCastleHeight(castleTiles, 38, 33, wallVer, 5, 6);
			ApplyCastleHeight(castleTiles, 42, 33, wallVer, 5, 6);
			ApplyCastleHeight(castleTiles, 38, 47, wallVer, 5, 6);
			ApplyCastleHeight(castleTiles, 42, 47, wallVer, 5, 6);

			ApplyCastleHeight(castleTiles, 33, 38, wallHor, 5, 6);
			ApplyCastleHeight(castleTiles, 33, 42, wallHor, 5, 6);
			ApplyCastleHeight(castleTiles, 47, 38, wallHor, 5, 6);
			ApplyCastleHeight(castleTiles, 47, 42, wallHor, 5, 6);
			ApplyCastleColor(castleTiles, 30, 30, 25, getFactionColorVector3(0))
			// Green
			updateMap(
				(x, y) => GetNoiseA(x, y, 0.3) * 80 * getCenterFlat(x, y),
				(x, y) => GetHeightColor(GetNoiseA(x, y, 0.3) * getCenterFlat(x, y)))
			break;
		case 0: // tutorial
			levelName = "tutorial"
			CreateCastle(3, 3, 0, 1) // player castle
			CreateCastle(-3, -3, 1, 1) // enemy castle
			CreateCastle(-1, 1)
			CreateCastle(1, -1)
			findNeibghors(6)
			enemy.enable = false
			// Green
			updateMap(
				(x, y) => GetNoiseA(x, y, 0.3, 300) * 80 * getCenterFlat(x, y),
				(x, y) => GetHeightColor(GetNoiseA(x, y, 0.3, 300) * getCenterFlat(x, y)))
			break;
		case 1:
			enemy.dummyDelay = 5 // dumm
			levelName = "vikings raid"
			CreateCastle(3, 3, 0, 1) // player castle
			CreateCastle(-3, -3, 1, 1) // enemy castle
			CreateCastle(0, 0)
			CreateCastle(-3, 0)
			CreateCastle(3, 0)
			CreateCastle(0, -3)
			CreateCastle(0, 3)
			findNeibghors(6)
			// Snow
			updateMap(
				(x, y) => (GetNoiseA(x, y, 0.35, 300) - 0.5) * 180 * getCenterFlat(x, y),
				(x, y) => GetSnowHeightColor((GetNoiseA(x, y, 0.35, 300) * 0.5) * getCenterFlat(x, y)))
			break;
		case 2:
			enemy.dummyDelay = 3 // dumm
			levelName = "desert storm"
			CreateCastle(0, 6, 0, 2) // player castle
			CreateCastle(0, -6, 1, 2) // enemy castle
			for(var i = -1; i < 2; i++) {
				for(var j = -1; j < 2; j++) {
					CreateCastle(i * 3, j * 3)
				}
			}
			findNeibghors(6)
			// Desert
			updateMap(
				(x, y) => GetNoiseA(x, y, 0.45) * 80 * getCenterFlat(x, y),
				(x, y) => GetDesertHeightColor(GetNoiseA(x, y, 0.45) * getCenterFlat(x, y)))
			break;
		case 3:
			enemy.dummyDelay = 2// dumm
			levelName = "Normann clash"
			CreateCastle(3, 3, 0, 1) // player castle
			CreateCastle(-3, -3, 1, 1) // enemy castle
			CreateCastle(-3, 3, 2, 1) // enemy castle
			CreateCastle(3, -3, 3, 1) // enemy castle
			CreateCastle(0, 0)
			CreateCastle(-3, 0)
			CreateCastle(3, 0)
			CreateCastle(0, -3)
			CreateCastle(0, 3)
			findNeibghors(6)
			// Snow
			updateMap(
				(x, y) => GetNoiseA(x, y, 0.35, 300) * 80 * getCenterFlat(x, y),
				(x, y) => GetSnowHeightColor(GetNoiseA(x, y, 0.35, 300) * getCenterFlat(x, y)))
			break;
		case 4:
			levelName = "Great war"
			CreateCastle(0, 6, 0, 2) // player castle
			CreateCastle(0, -6, 1, 2) // enemy castle
			CreateCastle(6, 0, 2, 2) // enemy 2 castle
			CreateCastle(-6, 0, 3, 2) // enemy 3 castle
			for(var i = -1; i < 2; i++) {
				for(var j = -1; j < 2; j++) {
					CreateCastle(i * 3, j * 3)
				}
			}
			findNeibghors(6)
			// Green
			updateMap(
				(x, y) => (GetNoiseA(x, y, 0.3, 300) - 0.7) * 160 * getCenterFlat(x, y),
				(x, y) => GetHeightColor((GetNoiseA(x, y, 0.3, 300) - 0.7) * getCenterFlat(x, y)))
			break;
		default:
			levelName = "Random level " + id
			var isValidated = false
			var playersAmount = 2 + (id * 16807 % 3)
			var castlesAmount = playersAmount + 3 + (id * 16807 % 8)
			var maxLevel = 1 + (id * 16807 % 2)
			seed = id
			while (!isValidated) {
				var grid = CreateArray(100)
				removeUnits()
				removeCastles()
				castleTiles.clear(-0.00001)
				for (let i = 0; i < castlesAmount; i++) {
					let
						randomX = GetRandomInt(4),
						randomY = GetRandomInt(4),
						index = randomX + randomY * 4
					if (grid[index] == undefined) {
						randomX = randomX * 3 - 5 - GetRandomInt(2)
						randomY = randomY * 3 - 5 - GetRandomInt(2)
						grid[index] = CreateCastle(randomX, randomY, -1, GetRandomInt(maxLevel))
					} else {
						i -= 1
					}
				}
				findNeibghors(6)
				// check availability
				findAvailableForMoveCastles(castles[0])
				castles[0].pathCastle = castles[0]
				updateSelection()
				isValidated = true
				for(var i = 0; i < castles.length; i++) {
					if (castles[i].pathCastle == null) {
						isValidated = false
					}
				}
				seed += 1
			}
			for(var f = 0; f < playersAmount; f++) {
				castles[f].factionId = f;
				castles[f].level = maxLevel;
				castles[f].rebuild()
			}
			let
				offsetX = GetRandomInt(5000),
				offsetY = GetRandomInt(5000)

			switch(id * 16807 % 5) {
				case 0:
					// Snow
					updateMap(
						(x, y) => GetNoiseA(x, y, 0.35, offsetX, offsetY) * 80 * getCenterFlat(x, y),
						(x, y) => GetSnowHeightColor(GetNoiseA(x, y, 0.35, offsetX, offsetY) * getCenterFlat(x, y)))
					break;
				case 1:
					// Green
					updateMap(
						(x, y) => GetNoiseA(x, y, 0.3, offsetX, offsetY) * 80 * getCenterFlat(x, y),
						(x, y) => GetHeightColor(GetNoiseA(x, y, 0.3, offsetX, offsetY) * getCenterFlat(x, y)))
					break;
				case 2:
					// Desert
					updateMap(
						(x, y) => GetNoiseA(x, y, 0.45, offsetX, offsetY) * 80 * getCenterFlat(x, y),
						(x, y) => GetDesertHeightColor(GetNoiseA(x, y, 0.45, offsetX, offsetY) * getCenterFlat(x, y)))
					break
				case 3:
					// Green
					updateMap(
						(x, y) => (GetNoiseA(x, y, 0.3, offsetX, offsetY) - 0.7) * 160 * getCenterFlat(x, y),
						(x, y) => GetHeightColor((GetNoiseA(x, y, 0.3, offsetX, offsetY) - 0.7) * getCenterFlat(x, y)))
					break;
				default:
				case 4:
					// Desert
					updateMap(
						(x, y) => (GetNoiseA(x, y, 0.45, offsetX, offsetY) - 0.7) * 160 * getCenterFlat(x, y),
						(x, y) => GetDesertHeightColor((GetNoiseA(x, y, 0.45, offsetX, offsetY) - 0.7) * getCenterFlat(x, y)))
					break
			}
			break;
	}
}