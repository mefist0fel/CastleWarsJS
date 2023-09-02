let
	heightMap = [],
	tileMap = [],

	castleHeightMap = [],
	castleTileMap = [],

	mapSize = 35,
	halfMapSize = 17,
	mapScale = 60,
	halfMapScale = 30


for(i = 0; i < mapSize; i++)
{
	for(j = 0; j < mapSize; j++)
	{
		let height = Math.random() * 80

		let position = CreateVector3((i - halfMapSize) * mapScale, (j - halfMapSize) * mapScale)
		let normalizedDistance = Clamp01(Vector3Length(position) / (mapScale * halfMapSize) * 2.8 - 1)
		// if (normalizedDistance == 0) {
		//	normalizedDistance = -1
		// }
		height *= normalizedDistance
		
		let isBorder = !(i > 0 && j > 0 && i < mapSize - 1 && j < mapSize - 1);
		if (isBorder)
			height = -1
		heightMap.push(height)

		tileMap.push(CreateTile3D(position, height, halfMapScale, GetColor(height * 1.3)))
	}
}

for(i = 1; i < mapSize - 1; i++)
{
	for(j = 1; j < mapSize - 1; j++)
	{
		let height = heightMap[GetMapIndex(i, j, mapSize)]
		tileMap[GetMapIndex(i, j, mapSize)].neigbhors = [
			heightMap[GetMapIndex(i - 1, j    , mapSize)],
			heightMap[GetMapIndex(i    , j + 1, mapSize)],
			heightMap[GetMapIndex(i + 1, j    , mapSize)],
			heightMap[GetMapIndex(i    , j - 1, mapSize)]
		]
		tileMap[GetMapIndex(i, j, mapSize)].sideColors = [
			GetColor(height * 0.9),
			GetColor(height * 1.1),
			GetColor(height * 0.9),
			GetColor(height * 0.7)
		]
	}
}

function GetColor(level) {
	// level should be 0-100
	let value = Max(Min(Round(level), 100), 0)
	return RgbToHex(120, 150 + value, 120)
}

function GetMapIndex(i, j, xFactor = 1, yFactor = 1) {
	return i * xFactor + j * yFactor;
}