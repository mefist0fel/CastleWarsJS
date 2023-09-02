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
function CreateTile3D (pos, height, scale, color, depth = 0) {
    var tile = {
		basePosition: pos,
		position: AddVector3(pos, CreateVector3(0, 0, height)),
		height: height,
        scale: scale,
		points: CreateQuadArray(),
		basePoints: CreateQuadArray(),
		screenPoints: CreateQuadArray(),
		color: color,
        sideColors:[color, color, color, color],
        neigbhors:[0, 0, 0, 0],
        walls:[CreateQuadArray(), CreateQuadArray(), CreateQuadArray(), CreateQuadArray()],
		depth: 0,
        setHeight(height) {
            this.height = height
        },
        setColor(color) {
            this.color = getColor(color)
            this.sideColors = [
                getColor(MultiplyVector3(color, 0.9)),
                getColor(MultiplyVector3(color, 0.7)),
                getColor(MultiplyVector3(color, 0.5)),
                getColor(MultiplyVector3(color, 0.7))
            ]
        },
        prepareScene () {
            for(let i = 0; i < 4; i++) {
                this.points[i] = AddVector3(AddVector3(this.basePosition, MultiplyVector3(tileOffsets[i], this.scale)), CreateVector3(0, 0, this.height))
            }
            let normPosition = WorldToNormVector3(this.position)
            this.depth = normPosition[2] + depth
            for(let i = 0; i < 4; i++) {
                this.screenPoints[i] = WorldToScreenVector3(this.points[i])
            }
            for(let j = 0; j < 4; j++) {
                let height = this.neigbhors[j]
                if (this.height < height)
                    height = this.height
                for(let i = 0; i < 4; i++) {
                    this.basePoints[i] = AddVector3(AddVector3(this.basePosition, MultiplyVector3(tileOffsets[i], this.scale)), CreateVector3(0, 0, height))
                }
                this.walls[j][0] = WorldToScreenVector3(this.points[(j + 1) % 4])
                this.walls[j][1] = WorldToScreenVector3(this.points[(j + 0) % 4])
                this.walls[j][2] = WorldToScreenVector3(this.basePoints[(j + 0) % 4])
                this.walls[j][3] = WorldToScreenVector3(this.basePoints[(j + 1) % 4])
            }
        },
        draw () {
            // ignore 0 height tiles
            if (this.height <= -1)
                return
            canvas.fillStyle = this.color
            DrawQuad(this.screenPoints)
            for(let i = 0; i < this.walls.length; i++) {
                canvas.fillStyle = this.sideColors[i]
                DrawQuad(this.walls[i])
            }
        }
    }
    objects3d.push(tile)
    return tile

    function getColor(vector3) {
        // level should be 0-100
        let r = Round(Clamp01(vector3[0]) * 255)
        let g = Round(Clamp01(vector3[1]) * 255)
        let b = Round(Clamp01(vector3[2]) * 255)
        return rgbToHex(r, g, b)
    }
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

function rgbToHex(r, g, b, a = 255) {
    function componentToHex(c) {
        var hex = c.toString(16)
        return hex.length == 1 ? "0" + hex : hex;
    }
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a);
}