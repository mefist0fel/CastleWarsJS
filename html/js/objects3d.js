// Camera props and function
var objects3d = [],
    axeX = CreateVector3(1, 0, 0),
    axeY = CreateVector3(0, 1, 0),
    axeZ = CreateVector3(0, 0, 1),
    cameraOffset = CreateVector3(0, 0,-20),
    cameraPosition = CreateVector3(),
    centerOffcet = null,
    cameraScale = 1,
    cameraScreenScale = 1,
    projectionFactor = 0.0001


function SetCameraSize(width, height) {
    centerOffcet = CreateVector3(width * 0.5, height * 0.5)
    cameraScreenScale = Math.min(width, height) / 1024
}

function SetCameraAngle(angle) {
    // Set iso axes
    let
        isoFactor = 0.6,
        radX = angle / 180.0 * PI
        radY = (angle / 180.0  + 0.5) * PI
    axeX = CreateVector3(Cos(radX), Sin(radX) * isoFactor, Sin(radX)),
    axeY = CreateVector3(Cos(radY), Sin(radY) * isoFactor, Sin(radY)),
    axeZ = CreateVector3(0, -0.4, 2)
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

function WorldToScreenVector3 (point) {
    worldPoint = AddVector3(point, MultiplyVector3(cameraPosition, -1.0))
    // worldPoint = MultiplyVector3ToMatrix3(worldPoint, cameraWorldMatrix)
    worldPoint = AddVector3(AddVector3(MultiplyVector3(axeX, worldPoint[0]),MultiplyVector3(axeY, worldPoint[1])), MultiplyVector3(axeZ, worldPoint[2]))
    worldPoint = AddVector3(worldPoint, cameraOffset)
    worldPoint = MultiplyVector3(worldPoint, cameraScale * cameraScreenScale * (1 + worldPoint[2] * projectionFactor))
    return AddVector3(worldPoint, centerOffcet)
}

// 3d Quad class
function CreateQuad3D (a, b, c, d, color = CreateVector3(1, 1, 1)) {
    var quad = {
		screenPoints: [a, b, c, d],
		depth: 0,
		color: color,
		enable: true,
        setPoints(a, b, c, d, position = null) {
            quad.points = [a, b, c, d]
            if (position == null)
                quad.position = FindMiddlePoint(quad.points)
            else
                quad.position = position
		},
        setColor(newColor) {
            quad.color = newColor
		},
        prepareScene () {
            if (!quad.enable)
                return
            quad.depth = -WorldToScreenVector3(quad.position)[2]
            for(let i = 0; i < quad.screenPoints.length; i++) {
                quad.screenPoints[i] = WorldToScreenVector3(quad.points[i])
            }
        },
        draw () {
            if (!quad.enable)
                return
            canvas.fillStyle = Vector3ToColor(quad.color)
            DrawQuad(quad.screenPoints)
        }
    }
    quad.setPoints(a, b, c, d)
    objects3d.push(quad)
    return quad
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

function Vector3ToColor(vector3) {
    // level should be 0-100
    let r = Round(Clamp01(vector3[0]) * 255)
    let g = Round(Clamp01(vector3[1]) * 255)
    let b = Round(Clamp01(vector3[2]) * 255)
    return RGBToHex(r, g, b)
}

function RGBToHex(r, g, b, a = 255) {
    function componentToHex(c) {
        var hex = c.toString(16)
        return hex.length == 1 ? "0" + hex : hex;
    }
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a);
}