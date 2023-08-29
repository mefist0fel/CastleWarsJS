// Camera props and function
var objects3d = [],
    cameraWorldMatrix = CreateUnitMatrix3(),
    cameraProjectionMatrix = CreateProjectionMatrix4(1.0, 1.0, 1.0, 2.0),
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
	if (objectA.screenPosition[2] < objectB.screenPosition[2])
		return -1
	if (objectA.screenPosition[2] > objectB.screenPosition[2])
		return 1
	return 0
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
		screenPosition: CreateVector3(),
		color: color,
        setPoints(a, b, c, d, position = null) {
            quad.points = [a, b, c, d]
            if (position == null)
                quad.position = FindMiddlePoint(quad.points)
            else
                quad.position = position
		},
        prepareScene () {
            quad.screenPosition = WorldToScreenVector3(quad.position)
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
            canvas.beginPath()
            let last = quad.screenPoints[quad.screenPoints.length - 1]
            canvas.moveTo(last[0], last[1])
            for(let i = 0; i < quad.screenPoints.length; i++) {
                canvas.lineTo(quad.screenPoints[i][0], quad.screenPoints[i][1])
            }
            canvas.closePath()
            canvas.fill()
            // canvas.stroke()
        }
    }
    quad.setPoints(a, b, c, d)
    objects3d.push(quad)
    return quad
}