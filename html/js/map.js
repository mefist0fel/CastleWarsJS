let
	mapSize = 35,
	halfMapSize = 17,
	mapScale = 60,
	halfMapScale = 30,
	CreateArray = Array

const tileOffsets = [
	CreateVector3(-1, 1),
	CreateVector3(-1,-1),
	CreateVector3( 1, 1),
	CreateVector3( 1,-1)
]

//CreateQuad3D(tileOffsets[0], tileOffsets[1], tileOffsets[2], tileOffsets[3])

function CreateCellMap(mapSize, scale, defaultHeight = -1) {
	let pointsLen = mapSize * 4;
	let map = {
		heightMap: CreateArray(mapSize * mapSize),
		points: CreateArray(mapSize * mapSize * 4),
		colors: CreateArray(mapSize * mapSize),
		tiles: CreateArray(mapSize * mapSize),
		tilesTop: CreateArray(mapSize * mapSize),
		tilesLeft: CreateArray(mapSize * mapSize),
		size: mapSize,
		setHeight(x, y, height) {
			SetElementSafe(this.heightMap, x, y, this.size, height)
		},
		getHeight(x, y) {
			return GetElementSafe(this.heightMap, x, y, this.size, 0)
		},
		setColor(x, y, color) {
			SetElementSafe(this.colors, x, y, this.size, color)
		},
		getColor(x, y) {
			return GetElementSafe(this.colors, x, y, this.size, CreateVector3())
		},
		rebuild() {
			//let points = CreateArray(4)
			for(i = 0; i < this.size; i++)
			{
				for(j = 0; j < this.size; j++)
				{
					let index = GetMapIndex(i, j, this.size)
					let position = CreateVector3((i -  mapHalfSize) *  scale, (j - mapHalfSize) * scale, this.heightMap[index])

					for(let pointIdx = 0; pointIdx < 4; pointIdx ++) {
						let ptIndex = GetMapIndex(i * 2 + Math.floor(pointIdx / 2) ,  j * 2 + pointIdx % 2, pointsLen)
						this.points[ptIndex] = AddVector3(position, MultiplyVector3(tileOffsets[pointIdx], mapHalfScale))
					}
					//this.tiles[index].setPoints(points[0], points[1], points[2], points[3])
					//this.tiles[index].setColor(this.colors[index])
				}
			}
			for(i = 0; i < this.size; i++)
			{
				for(j = 0; j < this.size; j++)
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
							color = MultiplyVector3(this.colors[index], 0.8)
							this.tilesLeft[index].enable = this.heightMap[index] >= 0
						} else {
							color = MultiplyVector3(this.colors[leftIndex], 0.8)
							this.tilesLeft[index].enable = this.heightMap[leftIndex] >= 0
						}
						this.tilesLeft[index].setColor(color)
					}
				}
			}
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
			let color = CreateVector3(1, 1, 1)
			map.tiles[index] = CreateQuad3D(color, color, color, color, color)
			map.tilesTop[index] = CreateQuad3D(color, color, color, color, color)
			map.tilesLeft[index] = CreateQuad3D(color, color, color, color, color)
			map.colors[index] = color;
		}
	}
	map.rebuild()
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

function applyCastleHeight(tileMap, x , y, castleHeight, size, heightScale = 1) {
	for(i = 0; i < size; i++) {
		for(j = 0; j < size; j++) {
			tileMap.setHeight(x + i, y + j, castleHeight[i * size + j] * heightScale)
		}
	}
}

const mapOffsets = [
    CreateVector3(-1,-1),
    CreateVector3(-1, 1),
    CreateVector3( 1, 1),
    CreateVector3( 1,-1)
]

var map = CreateCellMap(mapSize, 50, 50)
for(i = 0; i < mapSize; i++)
{
	for(j = 0; j < mapSize; j++)
	{
		let height = Math.random() * 80

		let position = CreateVector3(i - halfMapSize, j - halfMapSize)
		let normalizedDistance = Clamp01(Vector3Length(position) / halfMapSize * 2.8 - 1)
		height *= normalizedDistance
		
		let isBorder = !(i > 0 && j > 0 && i < mapSize - 1 && j < mapSize - 1);
		if (isBorder)
			height = -1

		map.setHeight(i, j, height)
		map.setColor(i, j, GetHeightColor(height / 80))
	}
}
map.rebuild()

var castles = CreateCellMap(65, 10)
for(i = 0; i < 60; i++)
{
	for(j = 0; j < 60; j++)
	{
		if (i < 30) {
			castles.setColor(i, j, CreateVector3(0.8, 0.2, 0.2))
		} else {
			castles.setColor(i, j, CreateVector3(0.2, 0.2, 0.8))
		}
	}
}

const
	_ = -0.0001
// castle
var small = [
	_, _, _, _, _,
	_, 4, 2, 4, _,
	_, 2, 0, 2, _,
	_, 4, 2, 4, _,
	_, _, _, _, _
]
// castle
var medium = [
	_, 4, 2, 4, _,
	4, 2, 2, 2, 4,
	2, 2, 5, 2, 2,
	4, 2, 2, 2, 4,
	_, 4, 2, 4, _
]
// castle
var big = [
	4, 2, 3, 2, 4,
	2, 7, 5, 7, 2,
	3, 5, 3, 5, 3,
	2, 7, 5, 7, 2,
	4, 2, 3, 2, 4
]

applyCastleHeight(castles, 15, 15, big, 5, 6);
applyCastleHeight(castles, 35, 15, small, 5, 6);
applyCastleHeight(castles, 45, 5, small, 5, 6);
applyCastleHeight(castles, 15, 35, small, 5, 6);
applyCastleHeight(castles, 35, 35, medium, 5, 6);
castles.rebuild()
