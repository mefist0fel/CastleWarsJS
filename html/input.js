function Input(rect) {
	//  KEY KODES
	//	BACKSPACE: 8,
	//	TAB:       9,	RETURN:   13,
	//	ESC:      27,	SPACE:    32,
	//	PAGEUP:   33,	PAGEDOWN: 34,
	//	END:      35,	HOME:     36,
	//	LEFT:     37,	UP:       38,
	//	RIGHT:    39,	DOWN:     40,
	//	INSERT:   45,	DELETE:   46,
	//	ZERO:     48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57,
	//	A:        65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
	//	TILDA:    192
	
	var input = {
		key: [200],
		mouseLeft: false,
		mousePosition: [0, 0]
	}
	for(var i = 0; i < 200; i++) {
		input.key[i] = false;
	}

	function setKey(keyCode, value) {
		input.key[keyCode] = value;
	}

	function onkeydown(event) {
		setKey(event.keyCode, true);
	}
	function onkeyup(event) {
		setKey(event.keyCode, false);
	}

	function onclick(event) {
		//ballCoord[0] = event.clientX - rect.left;
		//ballCoord[1] = event.clientY - rect.top;
	}

	function mousedown(event) {
		input.mouseLeft = true;
	}

	function mouseup(event) {
		input.mouseLeft = false;
	}

	function mousemove(event) {
		input.mousePosition[0] = event.clientX - rect.left;
		input.mousePosition[1] = event.clientY - rect.top;
	}

	function ontouchstart(event) {
	}

	function ontouchmove(event) {
	}

	document.addEventListener('keydown',    onkeydown,    false);
	document.addEventListener('keyup',      onkeyup,      false);
	document.addEventListener('click',		onclick,		false);
	document.addEventListener('mousedown', mousedown,		false);
	document.addEventListener('mouseup',	mouseup,		false);
	document.addEventListener('mousemove',	mousemove,		false);
	document.addEventListener('touchstart',ontouchstart,	false);
	document.addEventListener('touchmove',	ontouchmove,	false);
	return input;
}