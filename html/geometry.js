// basic vector2[x, y] functons
function vAdd(av, bv) {
	return [av[0] + bv[0], av[1] + bv[1],  av[2] + bv[2]];
}
function vSub(av, bv) {
	return [av[0] - bv[0], av[1] - bv[1], av[2] - bv[2]];
}
function magnitude(va, vb) {
	return Math.sqrt((va[0] - vb[0]) * (va[0] - vb[0]) + (va[1] - vb[1]) * (va[1] - vb[1]));
}
function vNorm(v) { // normilize
	var dist = 1 / magnitude(v, [0, 0, 0]);
	if (dist <= 0) {
		dist = 0.0000000001;
	}
	if (dist == Infinity) {
		dist = Number.MAX_VALUE;
	}
	if (dist == -Infinity) {
		dist = Number.MIN_VALUE;
	}
	return vMult(v, dist);
}
function vMult(v, m) { // m - float
	return [v[0] * m, v[1] * m, v[2] * m];
}
function vInRect(v, rect) { // rect is arr[4] description of AABB rect
	return (v[0] >= rect[0] && v[0] <= rect[2] && v[1] >= rect[1] && v[1] <= rect[3]);
}