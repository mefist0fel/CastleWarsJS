let
	heightMap = [],
	tiles = [],

	mapSize = 35,
	halfMapSize = 17,
	mapScale = 60,
	halfMapScale = 30

function CreateCellMap(mapSize, scale, offset = 0, defaultHeight = -1) {
	let map = {
		heightMap: [],
		colors: [],
		tiles: [],
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
			for(i = 0; i < this.size; i++)
			{
				for(j = 0; j < this.size; j++)
				{
					let index = GetMapIndex(i, j, this.size)
					this.tiles[index].setHeight(this.heightMap[index])
					this.tiles[index].setColor(this.colors[index])
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
			map.heightMap.push(defaultHeight)
	
			let position = CreateVector3((i -  mapHalfSize) *  scale, (j - mapHalfSize) * scale)
			let color = CreateVector3()
			map.tiles.push(CreateTile3D(position, defaultHeight, mapHalfScale, color, offset))
			map.colors.push(color);
		}
	}

	for(i = 1; i < map.size - 1; i++)
	{
		for(j = 1; j < map.size - 1; j++)
		{
			let height = map.heightMap[GetMapIndex(i, j, map.size)]
			map.tiles[GetMapIndex(i, j, map.size)].neigbhors = [
				map.heightMap[GetMapIndex(i - 1, j    , map.size)],
				map.heightMap[GetMapIndex(i    , j + 1, map.size)],
				map.heightMap[GetMapIndex(i + 1, j    , map.size)],
				map.heightMap[GetMapIndex(i    , j - 1, map.size)]
			]
			map.tiles[GetMapIndex(i, j, mapSize)].sideColors = [
				GetColor(height * 0.9),
				GetColor(height * 1.1),
				GetColor(height * 0.9),
				GetColor(height * 0.7)
			]
		}
	}
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

function GetColor(level) {
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
		map.setColor(i, j, GetColor(height / 80))
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
	_ = -1,
	L = 0
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