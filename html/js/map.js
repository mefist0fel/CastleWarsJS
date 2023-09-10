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

function CreateCellMap(mapSize, scale, defaultHeight = -1, depthOffset = 0) {
	let pointsLen = mapSize * 4;
	let map = {
		heightMap: CreateArray(mapSize * mapSize),
		heightMapCache: CreateArray(mapSize * mapSize),
		points: CreateArray(mapSize * mapSize * 4),
		colors: CreateArray(mapSize * mapSize),
		tiles: CreateArray(mapSize * mapSize),
		tilesTop: CreateArray(mapSize * mapSize),
		tilesLeft: CreateArray(mapSize * mapSize),
		size: mapSize,
		setHeight(x, y, height) {
			SetElementSafe(this.heightMapCache, x, y, this.size, height)
		},
		getHeight(x, y) {
			return GetElementSafe(this.heightMapCache, x, y, this.size, 0)
		},
		setColor(x, y, color) {
			SetElementSafe(this.colors, x, y, this.size, color)
		},
		getColor(x, y) {
			return GetElementSafe(this.colors, x, y, this.size, CreateVector3())
		},
		update(dt) {
			const conversionTime = 100;
			let needRebuild = false
			for(var i = 0; i < this.heightMapCache.length; i++)
			{
				if (this.heightMap[i] != this.heightMapCache[i]) {
					var needValue = this.heightMapCache[i]
					var value = this.heightMap[i]
					if (value > needValue) {
						value -= conversionTime * dt
						if (value < needValue) {
							value = needValue
						}
					} else {
						value += conversionTime * dt
						if (value > needValue) {
							value = needValue
						}
					}
					needRebuild = true
					this.heightMap[i] = value
				}
			}
			this.rebuild()
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
					this.tiles[index].enable = this.heightMap[index] >= 0

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
							this.tilesTop[index].enable = this.heightMap[index] >= 0
						} else {
							color = MultiplyVector3(this.colors[topIndex], 0.8)
							this.tilesTop[index].enable = this.heightMap[topIndex] >= 0
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
							this.tilesLeft[index].enable = this.heightMap[index] >= 0
						} else {
							color = MultiplyVector3(this.colors[leftIndex], 0.7)
							this.tilesLeft[index].enable = this.heightMap[leftIndex] >= 0
						}
						this.tilesLeft[index].setColor(color)
					}
				}
			}
		},
		clear() {
			for(i = 0; i < this.size; i++)
			{
				for(j = 0; j < this.size; j++)
				{
					let index = GetMapIndex(i, j, this.size)
					this.heightMapCache[index] = defaultHeight
				}
			}
			this.rebuild()
		}
	}

	let
		mapHalfSize = (mapSize - 1) * 0.5,
		mapHalfScale = scale * 0.5

	for(i = 0; i < map.size; i++)
	{
		for(j = 0; j < map.size; j++)
		{
			let index = GetMapIndex(i, j, map.size)
			map.heightMap[index] = defaultHeight
			map.heightMapCache[index] = defaultHeight
			let color = CreateVector3(1, 1, 1)
			map.tiles[index] = CreateQuad3D(color, color, color, color, color, depthOffset)
			map.tilesTop[index] = CreateQuad3D(color, color, color, color, color, depthOffset)
			map.tilesLeft[index] = CreateQuad3D(color, color, color, color, color, depthOffset)
			map.colors[index] = color;
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
}

function GetHeightColor(level) {
	// level should be 0-1
	let r = Clamp01(0.3 + level * 0.1)
	let g = Clamp01(0.5 + level * 0.5)
	let b = Clamp01(0.3 + level * 0.1)
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

var castleTiles = CreateCellMap(85, 10, -0.00001, -50)
var map = CreateCellMap(mapSize, 50, 50)

for(i = 0; i < mapSize; i++)
{
	for(j = 0; j < mapSize; j++)
	{
		let height = Math.random() * 80

		let position = CreateVector3(i - halfMapSize, j - halfMapSize)
		let normalizedDistance = Clamp01(Vector3Length(position) / halfMapSize * 2.4 - 1)
		height *= normalizedDistance
		
		let isBorder = !(i > 0 && j > 0 && i < mapSize - 1 && j < mapSize - 1);
		if (isBorder)
			height = -1

		map.setHeight(i, j, height)
		map.setColor(i, j, GetHeightColor(height / 80))
	}
}
map.rebuild()

function CreateLevel(id) {
	removeUnits()
	removeCastles()
	castleTiles.clear()
	enemy.enable = true
	switch (id) {
		case 0:
			CreateCastle(3, 3, 0, 1) // player castle
			CreateCastle(-3, -3, 1, 1) // enemy castle
			CreateCastle(1, -1)
			CreateCastle(-1, 1)
			findNeibghors(6)
			enemy.enable = false
			break;
		default:
		case 1:
			CreateCastle(0, 6, 0, 2) // player castle
			CreateCastle(0, -6, 1, 2) // enemy castle
			for(var i = -1; i < 2; i++) {
				for(var j = -1; j < 2; j++) {
					CreateCastle(i * 3, j * 3)
				}
			}
			findNeibghors(6)
			break;
		case 2:
			CreateCastle(3, 3, 0, 1) // player castle
			CreateCastle(-3, -3, 1, 1) // enemy castle
			CreateCastle(0, 0)
			CreateCastle(-3, 0)
			CreateCastle(3, 0)
			CreateCastle(0, -3)
			CreateCastle(0, 3)
			findNeibghors(6)
			break;
	}
}