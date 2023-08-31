// Camera props and function
var objects3d = [],
    cameraWorldMatrix = CreateUnitMatrix3(),
    cameraProjectionMatrix = CreateProjectionMatrix4(1.0, 1.0, 1.0, 4.0),
    cameraOffset = CreateVector3(0, 0,-1000),
    cameraPosition = CreateVector3(),
    centerOffcet = null,
    cameraScale = null


function SetCameraSize(width, height) {
    centerOffcet = CreateVector3(width * 0.5, height * 0.5)
    cameraScale = Math.min(width, height)
}

function DrawCamera () {
    for (let i = 0; i < objects3d.length; i++) {
        objects3d[i].prepareScene()
    }
    objects3d.sort(Object3DDepthComparator)
    for (let i = 0; i < objects3d.length; i++) {
        objects3d[i].draw()
    }
}

function Object3DDepthComparator (objectA, objectB) {
	if (objectA.depth < objectB.depth)
		return 1
	if (objectA.depth > objectB.depth)
		return -1
	return 0
}

function WorldToNormVector3 (point) {
    let worldPoint = point
    worldPoint = AddVector3(worldPoint, MultiplyVector3(cameraPosition, -1.0))
    worldPoint = MultiplyVector3ToMatrix3(worldPoint, cameraWorldMatrix)
    worldPoint = AddVector3(worldPoint, cameraOffset)
    worldPoint = MultiplyVector3ToMatrix4(worldPoint, cameraProjectionMatrix)
    return worldPoint
}

function WorldToScreenVector3 (point) {
    let worldPoint = point
    worldPoint = AddVector3(worldPoint, MultiplyVector3(cameraPosition, -1.0))
    worldPoint = MultiplyVector3ToMatrix3(worldPoint, cameraWorldMatrix)
    worldPoint = AddVector3(worldPoint, cameraOffset)
    worldPoint = MultiplyVector3ToMatrix4(worldPoint, cameraProjectionMatrix)
    worldPoint = MultiplyVector3(worldPoint, cameraScale)
    return AddVector3(worldPoint, centerOffcet)
}

// 3d Quad class
function CreateQuad3D (a, b, c, d, color = '#FFEEEE') {
    var quad = {
		screenPoints: [a, b, c, d],
		depth: 0,
		color: color,
        setPoints(a, b, c, d, position = null) {
            quad.points = [a, b, c, d]
            if (position == null)
                quad.position = FindMiddlePoint(quad.points)
            else
                quad.position = position
		},
        prepareScene () {
            quad.depth = WorldToScreenVector3(quad.position)[2]
            for(let i = 0; i < quad.screenPoints.length; i++) {
                quad.screenPoints[i] = WorldToScreenVector3(quad.points[i])
            }
        },
        draw () {
            // ignore backface
            let dot = PointToLine(quad.screenPoints[0], quad.screenPoints[1], quad.screenPoints[2])
            if (dot > 0)
                return
            canvas.fillStyle = quad.color
            canvas.strokeStyle = quad.color
            DrawQuad(quad.screenPoints)
        }
    }
    quad.setPoints(a, b, c, d)
    objects3d.push(quad)
    return quad
}

const tileOffsets = [
    CreateVector3(-1,-1),
    CreateVector3(-1, 1),
    CreateVector3( 1, 1),
    CreateVector3( 1,-1)
]

// 3d map cell class
function CreateTile3D (pos, height, scale, color = '#FFEEEE') {
    var tile = {
		basePosition: pos,
		position: AddVector3(pos, CreateVector3(0, 0, height)),
		height: height,
        scale: scale,
		points: CreateQuadArray(),
		basePoints: CreateQuadArray(),
		screenPoints: CreateQuadArray(),
        sideColors:[color, color, color, color],
        neigbhors:[0, 0, 0, 0],
        walls:[CreateQuadArray(), CreateQuadArray(), CreateQuadArray(), CreateQuadArray()],
		depth: 0,
		color: color,
        setHeight(scale) {
            tile.scale = scale
        },
        prepareScene () {
            for(let i = 0; i < 4; i++) {
                tile.points[i] = AddVector3(AddVector3(tile.basePosition, MultiplyVector3(tileOffsets[i], tile.scale)), CreateVector3(0, 0, tile.height))
            }
            let normPosition = WorldToNormVector3(tile.position)
            tile.depth = normPosition[2]
            for(let i = 0; i < 4; i++) {
                tile.screenPoints[i] = WorldToScreenVector3(tile.points[i])
            }
            for(let j = 0; j < 4; j++) {
                let height = tile.neigbhors[j]
                if (tile.height < height)
                    height = tile.height
                for(let i = 0; i < 4; i++) {
                    tile.basePoints[i] = AddVector3(AddVector3(tile.basePosition, MultiplyVector3(tileOffsets[i], tile.scale)), CreateVector3(0, 0, height))
                }
                tile.walls[j][0] = WorldToScreenVector3(tile.points[(j + 1) % 4])
                tile.walls[j][1] = WorldToScreenVector3(tile.points[(j + 0) % 4])
                tile.walls[j][2] = WorldToScreenVector3(tile.basePoints[(j + 0) % 4])
                tile.walls[j][3] = WorldToScreenVector3(tile.basePoints[(j + 1) % 4])
            }
        },
        draw () {
            // ignore 0 height tiles
            if (tile.height <= -1)
                return
            canvas.fillStyle = tile.color
            DrawQuad(tile.screenPoints)
            for(let i = 0; i < tile.walls.length; i++) {
                canvas.fillStyle = tile.sideColors[i]
                DrawQuad(tile.walls[i])
            }
        }
    }
    objects3d.push(tile)
    return tile
}

function DrawQuad(points) {
    // ignore backface
    let dot = PointToLine(points[0], points[1], points[2])
    if (dot > 0)
        return
    canvas.beginPath()
    let last = points[3]
    canvas.moveTo(last[0], last[1])
    for(let i = 0; i < 4; i++) {
        canvas.lineTo(points[i][0], points[i][1])
    }
    canvas.closePath()
    canvas.fill()
}

function CreateQuadArray() {
    let a = CreateVector3()
    return [a, a, a, a]
}

function RgbToHex(r, g, b, a = 255) {
    function componentToHex(c) {
        var hex = c.toString(16)
        return hex.length == 1 ? "0" + hex : hex;
    }
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a);
}