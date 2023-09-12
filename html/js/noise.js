let
	noiseSize = 100,
	seed = 1,
	noiseBase = []

// use pseudo random to get same landscapes
for(var i = 0; i < noiseSize * noiseSize; i++) {
	noiseBase.push(GetRandom())
}

function GetRandom() {
	seed = seed * 16807 % 2147483647
	return seed / 2147483647
}

function GetRandomInt(bazis = 100) {
	seed = seed * 16807 % 2147483647
	return seed % bazis
}

function GetNoise(x, y) {
	x = x % noiseSize
	y = y % noiseSize
	return noiseBase[x * noiseSize + y]
}

function LerpSin(a, b, t) {
	return a * (1 - t) + b * t
}

function GetNoiseInterpolated(x, y) {
	let
		baseX = Floor(x),
		baseY = Floor(y),
		tX = x - baseX,
		tY = y - baseY
	return LerpSin(
		LerpSin(GetNoise(baseX, baseY), GetNoise(baseX + 1, baseY), tX),
		LerpSin(GetNoise(baseX, baseY + 1), GetNoise(baseX + 1, baseY + 1), tX),
		tY
	)
}

function GetNoiseA(x, y, scale, offsetX = 1000, offsetY = 1000) {
	let
		baseX = Floor(x),
		baseY = Floor(y),
		tX = x - baseX,
		tY = y - baseY
	return GetNoiseInterpolated(x * scale + offsetX, y * scale + offsetY)
}