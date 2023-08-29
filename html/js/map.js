let
	heightMap = [],
	pointsMap = [],
	axeX = [1, 0],
	axeY = [0, 1],
	axeZ = [0, 0.5],
	mapSize = 30,
	halfMapSize = 15,
	mapScale = 80,
	halfMapScale = 40


for(i = 0; i < mapSize; i++)
{
	for(j = 0; j < mapSize; j++)
	{
		heightMap.push(Math.random() * 60)

		let point = CreateVector3()
		pointsMap.push(point)
		pointsMap.push(point)
		pointsMap.push(point)
		pointsMap.push(point)

		pointsMap.push(point)
		pointsMap.push(point)
		pointsMap.push(point)
		pointsMap.push(point)
	}
}

function SynchHeight() {
	for(i = 0; i < mapSize; i++)
	{
		for(j = 0; j < mapSize; j++)
		{
			let index = i * mapSize + j
			let point = CreateVector3((i - halfMapSize) * mapScale, (j - halfMapSize) * mapScale)
			let height = heightMap[index] - 100
			let baseHeight = -100
	
			pointsMap[index * 8 + 0] = AddVector3(point, CreateVector3(-halfMapScale,-halfMapScale, baseHeight))
			pointsMap[index * 8 + 1] = AddVector3(point, CreateVector3(-halfMapScale, halfMapScale, baseHeight))
			pointsMap[index * 8 + 2] = AddVector3(point, CreateVector3( halfMapScale, halfMapScale, baseHeight))
			pointsMap[index * 8 + 3] = AddVector3(point, CreateVector3( halfMapScale,-halfMapScale, baseHeight))
	
			pointsMap[index * 8 + 4] = AddVector3(point, CreateVector3(-halfMapScale,-halfMapScale, height))
			pointsMap[index * 8 + 5] = AddVector3(point, CreateVector3(-halfMapScale, halfMapScale, height))
			pointsMap[index * 8 + 6] = AddVector3(point, CreateVector3( halfMapScale, halfMapScale, height))
			pointsMap[index * 8 + 7] = AddVector3(point, CreateVector3( halfMapScale,-halfMapScale, height))
		}
	}
}
SynchHeight()

for(i = 0; i < mapSize; i++)
{
	for(j = 0; j < mapSize; j++)
	{
		let index = i * mapSize + j
		let height = Math.round(heightMap[index])
		// let point = CreateVector3((i - halfMapSize) * mapScale, (j - halfMapSize) * mapScale, -200)
		CreateQuad3D( 
			pointsMap[index * 8 + 4],
			pointsMap[index * 8 + 5],
			pointsMap[index * 8 + 6],
			pointsMap[index * 8 + 7],
			RgbToHex(120, 140 + height % 10 * 10, 120)
		)
		CreateQuad3D( 
			pointsMap[index * 8 + 0],
			pointsMap[index * 8 + 1],
			pointsMap[index * 8 + 5],
			pointsMap[index * 8 + 4],
			RgbToHex(120, 100 + height % 10 * 10, 120)
		)
		CreateQuad3D( 
			pointsMap[index * 8 + 1],
			pointsMap[index * 8 + 2],
			pointsMap[index * 8 + 6],
			pointsMap[index * 8 + 5],
			RgbToHex(120, 80 + height % 10 * 10, 120)
		)
		CreateQuad3D( 
			pointsMap[index * 8 + 2],
			pointsMap[index * 8 + 3],
			pointsMap[index * 8 + 7],
			pointsMap[index * 8 + 6],
			RgbToHex(120, 100 + height % 10 * 10, 120)
		)
		CreateQuad3D( 
			pointsMap[index * 8 + 3],
			pointsMap[index * 8 + 0],
			pointsMap[index * 8 + 4],
			pointsMap[index * 8 + 7],
			RgbToHex(120, 120 + height % 10 * 10, 120)
		)
	}
}

function GetMapIndex(i, j, xFactor = 1, yFactor = 1) {
	return i * xFactor + j * yFactor;
}