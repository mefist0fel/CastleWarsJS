// Geometry functions
const MAX_NUMBER = Number.MAX_VALUE
const MIN_NUMBER = Number.MIN_VALUE
const PI = Math.PI
const Cos = Math.cos
const Sin = Math.sin
const Min = Math.min
const Max = Math.max
const Round = Math.round

function Clamp01(value) {
	return Max(Min(value, 1), 0)
}

function Vector2InRect(v, rect) { // rect is arr[4] description of AABB rect
	return (v[0] >= rect[0] && v[0] <= rect[2] && v[1] >= rect[1] && v[1] <= rect[3]);
}

// vector 2 functions
function CreateVector2(x = 0.0, y = 0.0) {
	return [x, y,]
}

function AddVector2(a, b) {
	return [a[0] + b[0], a[1] + b[1]]
}

function SubstractVector2(a, b) {
	return [a[0] - b[0], a[1] - b[1]]
}

function MultiplyVector2(v, multiplier) {
	return [v[0] * multiplier, v[1] * multiplier]
}

function LerpVector2(a, b, t) {
	return AddVector2(
		MultiplyVector2(a, 1.0 - t),
		MultiplyVector2(b, t)
	)
}

function Vector2Distance(a, b) {
	return Vector2Length(SubstractVector2(a, b))
}

function Vector2Length(v) {
	return Math.sqrt(v[0] * v[0] + v[1] * v[1])
}

function NormalizeVector2(v) {
	var dist = 1.0 / Vector2Length(v);
	if (dist == Infinity) {
		dist = MAX_NUMBER;
	}
	if (dist == -Infinity) {
		dist = MIN_NUMBER;
	}
	return MultiplyVector2(v, dist);
}

function DotProductVector2(a, b) {
	return a[0] * b[0] + a[1] * b[1];
}

function DistanceToLineDistance(lineStart, lineEnd, point) {
	let lineDirection = SubstractVector2(lineEnd, lineStart)
	let perpendicular = [lineDirection[1], -lineDirection[0]]
	let pointDirection = SubstractVector2(lineStart, point)
	return Math.abs(DotProductVector2(NormalizeVector2(perpendicular), pointDirection))
}

function PointToLine(lineStart, lineEnd, point) {
	let lineDirection = SubstractVector2(lineEnd, lineStart)
	let perpendicular = [lineDirection[1], -lineDirection[0]]
	let pointDirection = SubstractVector2(lineStart, point)
	return DotProductVector2(NormalizeVector2(perpendicular), pointDirection)
}


function FindMiddlePoint (points) {
	let sum = CreateVector3()
	for(let i = 0; i < points.length; i++) {
		sum = AddVector3(sum, points[i])
	}
	return MultiplyVector3(sum, 1.0 / parseFloat(points.length))
}

// vector 3 functions
function CreateVector3(x = 0.0, y = 0.0, z = 0.0) {
	return [x, y, z]
}

function AddVector3(a, b) {
	return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
}

function SubstractVector3(a, b) {
	return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
}

function MultiplyVector3(v, multiplier) {
	return [v[0] * multiplier, v[1] * multiplier, v[2] * multiplier]
}
function Vector3Length(v) {
	return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
}

function Vector3Distance(a, b) {
	return Vector3Length(SubstractVector3(a, b))
}

// Matrix

// Matrix 3 * 3 functions
function CreateUnitMatrix3() {
	return [     //  ids
		1, 0, 0, // 0 1 2
		0, 1, 0, // 3 4 5
		0, 0, 1  // 6 7 8
	]
}

function CreateRotationMatrix3(axeVector, angle) { // axe vector must be unit
	let u = axeVector[0]
	let v = axeVector[1]
	let w = axeVector[2]
	let radian = angle / 180.0 * PI
	let c = Cos(radian)
	let s = Sin(radian)
	let q = (1.0 - c)
	return [
		u * u + (1.0 - u * u) * c, 	u * v * q - w * s, 			u * w * q + v * s,
		u * v * q + w * s,			v * v + (1.0 - v * v) * c,	v * w * q - u * s,
		u * w * q - v * s,			v * w * q + u * s,			w * w + (1.0 - w * w) * c
	]
}

function MultiplyMatrix3(ma, mb) {
	return [
		ma[0] * mb[0] + ma[1] * mb[3] + ma[2] * mb[6],  ma[0] * mb[1] + ma[1] * mb[4] + ma[2] * mb[7],  ma[0] * mb[2] + ma[1] * mb[5] + ma[2] * mb[8],
		ma[3] * mb[0] + ma[4] * mb[3] + ma[5] * mb[6],  ma[3] * mb[1] + ma[4] * mb[4] + ma[5] * mb[7],  ma[3] * mb[2] + ma[4] * mb[5] + ma[5] * mb[8],
		ma[6] * mb[0] + ma[7] * mb[3] + ma[8] * mb[6],  ma[6] * mb[1] + ma[7] * mb[4] + ma[8] * mb[7],  ma[6] * mb[2] + ma[7] * mb[5] + ma[8] * mb[8]
	]
}

function MultiplyVector3ToMatrix3(v, m) {
	return [
		v[0] * m[0] + v[1] * m[1] + v[2] * m[2],
		v[0] * m[3] + v[1] * m[4] + v[2] * m[5],
		v[0] * m[6] + v[1] * m[7] + v[2] * m[8]
	]
}


// Matrix 4 * 4 functions
function CreateUnitMatrix4() {
	return [         //  ids
		1, 0, 0, 0,  //  0  1  2  3
		0, 1, 0, 0,  //  4  5  6  7
		0, 0, 1, 0,  //  8  9 10 11
		0, 0, 0, 1   // 12 13 14 15
	]
}
function CreateMatrix4FromMatrix3(m) { // matrix3 and position
	return [         //  ids
		m[0], m[1], m[2],    0,  //  0  1  2  3
		m[3], m[4], m[5],    0,  //  4  5  6  7
		m[6], m[7], m[8],    0,  //  8  9 10 11
		   0,    0,    0,    1   // 12 13 14 15
	]
}

function CreateMatrix4(positionVector3, scale = 1.0) {
	var x = positionVector3[0]
	var y = positionVector3[1]
	var z = positionVector3[2]
	var s = scale
	return [
		s, 0, 0, 0,
		0, s, 0, 0,
		0, 0, s, 0,
		x, y, z, 1
	]
}

function MultiplyVector3ToMatrix4(v, m) {
	var vec4 = [v[0], v[1], v[2], 1.0]
	var res = MultiplyVector4ToMatrix4(vec4, m)
	return [
		res[0] / res[3],
		res[1] / res[3],
		res[2] / res[3]
	]
}

function MultiplyVector4ToMatrix4(v, m) {
	return [
		v[0] * m[ 0] + v[1] * m[ 4] + v[2] * m[ 8] + v[3] * m[12],
		v[0] * m[ 1] + v[1] * m[ 5] + v[2] * m[ 9] + v[3] * m[13],
		v[0] * m[ 2] + v[1] * m[ 6] + v[2] * m[10] + v[3] * m[14],
		v[0] * m[ 3] + v[1] * m[ 7] + v[2] * m[11] + v[3] * m[15]
	]
}

function CreateProjectionMatrix4(topY = 100.0, rightX = 100.0, nearZ = 1.0, farZ = 100.0) {
	// http://www.songho.ca/opengl/gl_projectionmatrix.html
	var n = nearZ
	var f = farZ
	var t = topY
	var r = rightX
	var g = (f + n) / (f - n)
	var h = (-2.0 * f * n) / (f - n)
	return [
		n/r,   0,   0,   0,
		  0, n/t,   0,   0,
		  0,   0,   g,  -1,
		  0,   0,   h,   0
	]
}

function MultiplyMatrix4(ma, mb) {
	return [
		ma[ 0] * mb[ 0] + ma[ 1] * mb[ 4] + ma[ 2] * mb[ 8]  + ma[ 3] * mb[12],
		ma[ 0] * mb[ 1] + ma[ 1] * mb[ 5] + ma[ 2] * mb[ 9]  + ma[ 3] * mb[13],
		ma[ 0] * mb[ 2] + ma[ 1] * mb[ 6] + ma[ 2] * mb[10]  + ma[ 3] * mb[14],
		ma[ 0] * mb[ 3] + ma[ 1] * mb[ 7] + ma[ 2] * mb[11]  + ma[ 3] * mb[15],

		ma[ 4] * mb[ 0] + ma[ 5] * mb[ 4] + ma[ 6] * mb[ 8]  + ma[ 7] * mb[12],
		ma[ 4] * mb[ 1] + ma[ 5] * mb[ 5] + ma[ 6] * mb[ 9]  + ma[ 7] * mb[13],
		ma[ 4] * mb[ 2] + ma[ 5] * mb[ 6] + ma[ 6] * mb[10]  + ma[ 7] * mb[14],
		ma[ 4] * mb[ 3] + ma[ 5] * mb[ 7] + ma[ 6] * mb[11]  + ma[ 7] * mb[15],

		ma[ 8] * mb[ 0] + ma[ 9] * mb[ 4] + ma[10] * mb[ 8]  + ma[11] * mb[12],
		ma[ 8] * mb[ 1] + ma[ 9] * mb[ 5] + ma[10] * mb[ 9]  + ma[11] * mb[13],
		ma[ 8] * mb[ 2] + ma[ 9] * mb[ 6] + ma[10] * mb[10]  + ma[11] * mb[14],
		ma[ 8] * mb[ 3] + ma[ 9] * mb[ 7] + ma[10] * mb[11]  + ma[11] * mb[15],

		ma[12] * mb[ 0] + ma[13] * mb[ 4] + ma[14] * mb[ 8]  + ma[15] * mb[12],
		ma[12] * mb[ 1] + ma[13] * mb[ 5] + ma[14] * mb[ 9]  + ma[15] * mb[13],
		ma[12] * mb[ 2] + ma[13] * mb[ 6] + ma[14] * mb[10]  + ma[15] * mb[14],
		ma[12] * mb[ 3] + ma[13] * mb[ 7] + ma[14] * mb[11]  + ma[15] * mb[15]
	]
}function Input(rect) {
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
		mouseLeftDown: false,
		mouseRightDown: false,
		mouseLeft: false,
		mouseRight: false,
		mousePosition: [0, 0],
		update (/* dt */) {
			this.mouseLeftDown = false
			this.mouseRightDown = false
		}
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
		// event.preventDefault();
		//ballCoord[0] = event.clientX - rect.left;
		//ballCoord[1] = event.clientY - rect.top;
	}

	function preventmenu(event) {
		event.preventDefault();
		//ballCoord[0] = event.clientX - rect.left;
		//ballCoord[1] = event.clientY - rect.top;
	}

	function mousedown(event) {
		if(event.button == 0) {
			input.mouseLeftDown = true;
			input.mouseLeft = true;
		}
		if(event.button == 2) {
			input.mouseRightDown = true;
			input.mouseLeft = true;
		}
	}

	function mouseup(event) {
		if(event.button == 0) {
			input.mouseLeft = false;
		}
		if(event.button == 2) {
			input.mouseRight = false;
		}
	}

	function mousemove(event) {
		input.mousePosition[0] = event.clientX - rect.left;
		input.mousePosition[1] = event.clientY - rect.top;
	}

	// function ontouchstart(event) {
	// }

	// function ontouchmove(event) {
	// }

	// addEvent('contextmenu', preventmenu);

	addEvent('keydown',    onkeydown );
	addEvent('keyup',      onkeyup   );
	addEvent('click',	   onclick   );
	addEvent('mousedown',  mousedown );
	addEvent('mouseup',	   mouseup   );
	addEvent('mousemove',  mousemove );
	// addEvent('touchstart',ontouchstart);
	// addEvent('touchmove',	ontouchmove);

	return input;
}
function addEvent(event, func) {
	doc.addEventListener(event, func, false)
}
/**
 * SfxrParams
 *
 * Copyright 2010 Thomas Vian
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Thomas Vian
 */
/** @constructor */
function SfxrParams() {
  //--------------------------------------------------------------------------
  //
  //  Settings String Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Parses a settings array into the parameters
   * @param array Array of the settings values, where elements 0 - 23 are
   *                a: waveType
   *                b: attackTime
   *                c: sustainTime
   *                d: sustainPunch
   *                e: decayTime
   *                f: startFrequency
   *                g: minFrequency
   *                h: slide
   *                i: deltaSlide
   *                j: vibratoDepth
   *                k: vibratoSpeed
   *                l: changeAmount
   *                m: changeSpeed
   *                n: squareDuty
   *                o: dutySweep
   *                p: repeatSpeed
   *                q: phaserOffset
   *                r: phaserSweep
   *                s: lpFilterCutoff
   *                t: lpFilterCutoffSweep
   *                u: lpFilterResonance
   *                v: hpFilterCutoff
   *                w: hpFilterCutoffSweep
   *                x: masterVolume
   * @return If the string successfully parsed
   */
  this.setSettings = function(values)
  {
    for ( var i = 0; i < 24; i++ )
    {
      this[String.fromCharCode( 97 + i )] = values[i] || 0;
    }

    // I moved this here from the reset(true) function
    if (this['c'] < .01) {
      this['c'] = .01;
    }

    var totalTime = this['b'] + this['c'] + this['e'];
    if (totalTime < .18) {
      var multiplier = .18 / totalTime;
      this['b']  *= multiplier;
      this['c'] *= multiplier;
      this['e']   *= multiplier;
    }
  }
}

/**
 * SfxrSynth
 *
 * Copyright 2010 Thomas Vian
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Thomas Vian
 */
/** @constructor */
function SfxrSynth() {
  // All variables are kept alive through function closures

  //--------------------------------------------------------------------------
  //
  //  Sound Parameters
  //
  //--------------------------------------------------------------------------

  this._params = new SfxrParams();  // Params instance

  //--------------------------------------------------------------------------
  //
  //  Synth Variables
  //
  //--------------------------------------------------------------------------

  var _envelopeLength0, // Length of the attack stage
      _envelopeLength1, // Length of the sustain stage
      _envelopeLength2, // Length of the decay stage

      _period,          // Period of the wave
      _maxPeriod,       // Maximum period before sound stops (from minFrequency)

      _slide,           // Note slide
      _deltaSlide,      // Change in slide

      _changeAmount,    // Amount to change the note by
      _changeTime,      // Counter for the note change
      _changeLimit,     // Once the time reaches this limit, the note changes

      _squareDuty,      // Offset of center switching point in the square wave
      _dutySweep;       // Amount to change the duty by

  //--------------------------------------------------------------------------
  //
  //  Synth Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Resets the runing variables from the params
   * Used once at the start (total reset) and for the repeat effect (partial reset)
   */
  this.reset = function() {
    // Shorter reference
    var p = this._params;

    _period       = 100 / (p['f'] * p['f'] + .001);
    _maxPeriod    = 100 / (p['g']   * p['g']   + .001);

    _slide        = 1 - p['h'] * p['h'] * p['h'] * .01;
    _deltaSlide   = -p['i'] * p['i'] * p['i'] * .000001;

    if (!p['a']) {
      _squareDuty = .5 - p['n'] / 2;
      _dutySweep  = -p['o'] * .00005;
    }

    _changeAmount =  1 + p['l'] * p['l'] * (p['l'] > 0 ? -.9 : 10);
    _changeTime   = 0;
    _changeLimit  = p['m'] == 1 ? 0 : (1 - p['m']) * (1 - p['m']) * 20000 + 32;
  }

  // I split the reset() function into two functions for better readability
  this.totalReset = function() {
    this.reset();

    // Shorter reference
    var p = this._params;

    // Calculating the length is all that remained here, everything else moved somewhere
    _envelopeLength0 = p['b']  * p['b']  * 100000;
    _envelopeLength1 = p['c'] * p['c'] * 100000;
    _envelopeLength2 = p['e']   * p['e']   * 100000 + 12;
    // Full length of the volume envelop (and therefore sound)
    // Make sure the length can be divided by 3 so we will not need the padding "==" after base64 encode
    return ((_envelopeLength0 + _envelopeLength1 + _envelopeLength2) / 3 | 0) * 3;
  }

  /**
   * Writes the wave to the supplied buffer ByteArray
   * @param buffer A ByteArray to write the wave to
   * @return If the wave is finished
   */
  this.synthWave = function(buffer, length) {
    // Shorter reference
    var p = this._params;

    // If the filters are active
    var _filters = p['s'] != 1 || p['v'],
        // Cutoff multiplier which adjusts the amount the wave position can move
        _hpFilterCutoff = p['v'] * p['v'] * .1,
        // Speed of the high-pass cutoff multiplier
        _hpFilterDeltaCutoff = 1 + p['w'] * .0003,
        // Cutoff multiplier which adjusts the amount the wave position can move
        _lpFilterCutoff = p['s'] * p['s'] * p['s'] * .1,
        // Speed of the low-pass cutoff multiplier
        _lpFilterDeltaCutoff = 1 + p['t'] * .0001,
        // If the low pass filter is active
        _lpFilterOn = p['s'] != 1,
        // masterVolume * masterVolume (for quick calculations)
        _masterVolume = p['x'] * p['x'],
        // Minimum frequency before stopping
        _minFreqency = p['g'],
        // If the phaser is active
        _phaser = p['q'] || p['r'],
        // Change in phase offset
        _phaserDeltaOffset = p['r'] * p['r'] * p['r'] * .2,
        // Phase offset for phaser effect
        _phaserOffset = p['q'] * p['q'] * (p['q'] < 0 ? -1020 : 1020),
        // Once the time reaches this limit, some of the    iables are reset
        _repeatLimit = p['p'] ? ((1 - p['p']) * (1 - p['p']) * 20000 | 0) + 32 : 0,
        // The punch factor (louder at begining of sustain)
        _sustainPunch = p['d'],
        // Amount to change the period of the wave by at the peak of the vibrato wave
        _vibratoAmplitude = p['j'] / 2,
        // Speed at which the vibrato phase moves
        _vibratoSpeed = p['k'] * p['k'] * .01,
        // The type of wave to generate
        _waveType = p['a'];

    var _envelopeLength      = _envelopeLength0,     // Length of the current envelope stage
        _envelopeOverLength0 = 1 / _envelopeLength0, // (for quick calculations)
        _envelopeOverLength1 = 1 / _envelopeLength1, // (for quick calculations)
        _envelopeOverLength2 = 1 / _envelopeLength2; // (for quick calculations)

    // Damping muliplier which restricts how fast the wave position can move
    var _lpFilterDamping = 5 / (1 + p['u'] * p['u'] * 20) * (.01 + _lpFilterCutoff);
    if (_lpFilterDamping > .8) {
      _lpFilterDamping = .8;
    }
    _lpFilterDamping = 1 - _lpFilterDamping;

    var _finished = false,     // If the sound has finished
        _envelopeStage    = 0, // Current stage of the envelope (attack, sustain, decay, end)
        _envelopeTime     = 0, // Current time through current enelope stage
        _envelopeVolume   = 0, // Current volume of the envelope
        _hpFilterPos      = 0, // Adjusted wave position after high-pass filter
        _lpFilterDeltaPos = 0, // Change in low-pass wave position, as allowed by the cutoff and damping
        _lpFilterOldPos,       // Previous low-pass wave position
        _lpFilterPos      = 0, // Adjusted wave position after low-pass filter
        _periodTemp,           // Period modified by vibrato
        _phase            = 0, // Phase through the wave
        _phaserInt,            // Integer phaser offset, for bit maths
        _phaserPos        = 0, // Position through the phaser buffer
        _pos,                  // Phase expresed as a Number from 0-1, used for fast sin approx
        _repeatTime       = 0, // Counter for the repeats
        _sample,               // Sub-sample calculated 8 times per actual sample, averaged out to get the super sample
        _superSample,          // Actual sample writen to the wave
        _vibratoPhase     = 0; // Phase through the vibrato sine wave

    // Buffer of wave values used to create the out of phase second wave
    var _phaserBuffer = new Array(1024),
        // Buffer of random values used to generate noise
        _noiseBuffer  = new Array(32);
    for (var i = _phaserBuffer.length; i--; ) {
      _phaserBuffer[i] = 0;
    }
    for (var i = _noiseBuffer.length; i--; ) {
      _noiseBuffer[i] = Math.random() * 2 - 1;
    }

    for (var i = 0; i < length; i++) {
      if (_finished) {
        return i;
      }

      // Repeats every _repeatLimit times, partially resetting the sound parameters
      if (_repeatLimit) {
        if (++_repeatTime >= _repeatLimit) {
          _repeatTime = 0;
          this.reset();
        }
      }

      // If _changeLimit is reached, shifts the pitch
      if (_changeLimit) {
        if (++_changeTime >= _changeLimit) {
          _changeLimit = 0;
          _period *= _changeAmount;
        }
      }

      // Acccelerate and apply slide
      _slide += _deltaSlide;
      _period *= _slide;

      // Checks for frequency getting too low, and stops the sound if a minFrequency was set
      if (_period > _maxPeriod) {
        _period = _maxPeriod;
        if (_minFreqency > 0) {
          _finished = true;
        }
      }

      _periodTemp = _period;

      // Applies the vibrato effect
      if (_vibratoAmplitude > 0) {
        _vibratoPhase += _vibratoSpeed;
        _periodTemp *= 1 + Math.sin(_vibratoPhase) * _vibratoAmplitude;
      }

      _periodTemp |= 0;
      if (_periodTemp < 8) {
        _periodTemp = 8;
      }

      // Sweeps the square duty
      if (!_waveType) {
        _squareDuty += _dutySweep;
        if (_squareDuty < 0) {
          _squareDuty = 0;
        } else if (_squareDuty > .5) {
          _squareDuty = .5;
        }
      }

      // Moves through the different stages of the volume envelope
      if (++_envelopeTime > _envelopeLength) {
        _envelopeTime = 0;

        switch (++_envelopeStage)  {
          case 1:
            _envelopeLength = _envelopeLength1;
            break;
          case 2:
            _envelopeLength = _envelopeLength2;
        }
      }

      // Sets the volume based on the position in the envelope
      switch (_envelopeStage) {
        case 0:
          _envelopeVolume = _envelopeTime * _envelopeOverLength0;
          break;
        case 1:
          _envelopeVolume = 1 + (1 - _envelopeTime * _envelopeOverLength1) * 2 * _sustainPunch;
          break;
        case 2:
          _envelopeVolume = 1 - _envelopeTime * _envelopeOverLength2;
          break;
        case 3:
          _envelopeVolume = 0;
          _finished = true;
      }

      // Moves the phaser offset
      if (_phaser) {
        _phaserOffset += _phaserDeltaOffset;
        _phaserInt = _phaserOffset | 0;
        if (_phaserInt < 0) {
          _phaserInt = -_phaserInt;
        } else if (_phaserInt > 1023) {
          _phaserInt = 1023;
        }
      }

      // Moves the high-pass filter cutoff
      if (_filters && _hpFilterDeltaCutoff) {
        _hpFilterCutoff *= _hpFilterDeltaCutoff;
        if (_hpFilterCutoff < .00001) {
          _hpFilterCutoff = .00001;
        } else if (_hpFilterCutoff > .1) {
          _hpFilterCutoff = .1;
        }
      }

      _superSample = 0;
      for (var j = 8; j--; ) {
        // Cycles through the period
        _phase++;
        if (_phase >= _periodTemp) {
          _phase %= _periodTemp;

          // Generates new random noise for this period
          if (_waveType == 3) {
            for (var n = _noiseBuffer.length; n--; ) {
              _noiseBuffer[n] = Math.random() * 2 - 1;
            }
          }
        }

        // Gets the sample from the oscillator
        switch (_waveType) {
          case 0: // Square wave
            _sample = ((_phase / _periodTemp) < _squareDuty) ? .5 : -.5;
            break;
          case 1: // Saw wave
            _sample = 1 - _phase / _periodTemp * 2;
            break;
          case 2: // Sine wave (fast and accurate approx)
            _pos = _phase / _periodTemp;
            _pos = (_pos > .5 ? _pos - 1 : _pos) * 6.28318531;
            _sample = 1.27323954 * _pos + .405284735 * _pos * _pos * (_pos < 0 ? 1 : -1);
            _sample = .225 * ((_sample < 0 ? -1 : 1) * _sample * _sample  - _sample) + _sample;
            break;
          case 3: // Noise
            _sample = _noiseBuffer[Math.abs(_phase * 32 / _periodTemp | 0)];
        }

        // Applies the low and high pass filters
        if (_filters) {
          _lpFilterOldPos = _lpFilterPos;
          _lpFilterCutoff *= _lpFilterDeltaCutoff;
          if (_lpFilterCutoff < 0) {
            _lpFilterCutoff = 0;
          } else if (_lpFilterCutoff > .1) {
            _lpFilterCutoff = .1;
          }

          if (_lpFilterOn) {
            _lpFilterDeltaPos += (_sample - _lpFilterPos) * _lpFilterCutoff;
            _lpFilterDeltaPos *= _lpFilterDamping;
          } else {
            _lpFilterPos = _sample;
            _lpFilterDeltaPos = 0;
          }

          _lpFilterPos += _lpFilterDeltaPos;

          _hpFilterPos += _lpFilterPos - _lpFilterOldPos;
          _hpFilterPos *= 1 - _hpFilterCutoff;
          _sample = _hpFilterPos;
        }

        // Applies the phaser effect
        if (_phaser) {
          _phaserBuffer[_phaserPos % 1024] = _sample;
          _sample += _phaserBuffer[(_phaserPos - _phaserInt + 1024) % 1024];
          _phaserPos++;
        }

        _superSample += _sample;
      }

      // Averages out the super samples and applies volumes
      _superSample *= .125 * _envelopeVolume * _masterVolume;

      // Clipping if too loud
      buffer[i] = _superSample >= 1 ? 32767 : _superSample <= -1 ? -32768 : _superSample * 32767 | 0;
    }

    return length;
  }
}

// Adapted from http://codebase.es/riffwave/
var synth = new SfxrSynth();
// Export for the Closure Compiler
window['jsfxr'] = function(settings) {
  // Initialize SfxrParams
  synth._params.setSettings(settings);
  // Synthesize Wave
  var envelopeFullLength = synth.totalReset();
  var data = new Uint8Array(((envelopeFullLength + 1) / 2 | 0) * 4 + 44);
  var used = synth.synthWave(new Uint16Array(data.buffer, 44), envelopeFullLength) * 2;
  var dv = new Uint32Array(data.buffer, 0, 44);
  // Initialize header
  dv[0] = 0x46464952; // "RIFF"
  dv[1] = used + 36;  // put total size here
  dv[2] = 0x45564157; // "WAVE"
  dv[3] = 0x20746D66; // "fmt "
  dv[4] = 0x00000010; // size of the following
  dv[5] = 0x00010001; // Mono: 1 channel, PCM format
  dv[6] = 0x0000AC44; // 44,100 samples per second
  dv[7] = 0x00015888; // byte rate: two bytes per sample
  dv[8] = 0x00100002; // 16 bits per sample, aligned on every two bytes
  dv[9] = 0x61746164; // "data"
  dv[10] = used;      // put number of samples here

  // Base64 encoding written by me, @maettig
  used += 44;
  var i = 0,
      base64Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      output = 'data:audio/wav;base64,';
  for (; i < used; i += 3)
  {
    var a = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
    output += base64Characters[a >> 18] + base64Characters[a >> 12 & 63] + base64Characters[a >> 6 & 63] + base64Characters[a & 63];
  }
  return output;
}

var url = window.URL || window.webkitURL;

function playSound(params) {
  try {
    var soundURL = jsfxr(params);
    var player = new Audio();
    player.addEventListener('error', function(e) {
      console.log("Error: " + player.error.code);
    }, false);
    player.src = soundURL;
    player.play();
    player.addEventListener('ended', function(e) {
      url.revokeObjectURL(soundURL);
    }, false);
  } catch(e) {
    console.log(e.message);
  }
}
      
function playString(str) {
   var temp = str.split(",");
   var params = new Array();
   for(var i = 0; i < temp.length; i++) {
     params[i] = parseFloat(temp[i]);
   }
   playSound(params);
}
//playSound([3,,0.3708,0.5822,0.3851,0.0584,,-0.0268,,,,-0.0749,0.7624,,,,,,1,,,,,0.5]); return false;
//playSound([1,,0.3201,,0.4743,0.3202,,0.0833,,0.4207,0.4278,,,,,,,,1,,,,,0.5]); return false;
//playSound([0,,0.1812,,0.1349,0.4524,,0.2365,,,,,,0.0819,,,,,1,,,,,0.5]); return false;
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
}let
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
castles.rebuild()const castleSize = 3;
const troopSendDelay = 0.2;
var castles = []

function CreateCastle(x, y, factionId = -1, level=0) {
	const sizes = [1, 2, 3];
	const spawn = [1, 2, 3];
	const upgradeCost = [15, 20, 999]
	var castle = {
		pos: [x, y],
		faction: factionId,
		attackCount: 0,
		pathToTarget: null,
		target: null,
		level: level,
		lives: 10,
		max: 100,
		reloadTime: 1,
		sendTroopTime: 0,
		neibghors: [],
		distance: 0,
		pathCastle: null,
		draw() {
			canvas.fillStyle = getFactionColor(castle.faction);
			let size = sizes[this.level];
			fillRect(castle.pos[0] - size, castle.pos[1] - size, size + size, size + size)
			canvas.textAlign = 'center';
			fillText(castle.lives, castle.pos[0], castle.pos[1] - size - 1);
			// upgrade marker
			if (castle.lives >= upgradeCost[castle.level]) {
				fillRect (castle.pos[0] + size + size, castle.pos[1] - size - size - 1, 1, 1)
			}
		},
		drawSelection() {
			canvas.fillStyle = '#FFFFFF';// white
			let size = sizes[this.level] + 1;
			fillRect (castle.pos[0] - size, castle.pos[1] - size, size + size, size + size)
			// Move
			canvas.fillStyle = '#FF00FF';
			castles.forEach(c => {
				if (c.pathCastle != null) {
					let size = sizes[c.level] + 1;
					fillRect(c.pos[0] - size, c.pos[1] - size, size + size, size + size)
				}
			});
		},
		upgrade() {
			if (this.lives >= upgradeCost[castle.level]) {
				this.lives -= upgradeCost[castle.level]
				this.level += 1
			}
		},
		update(dt) {
			this.reloadTime -= dt;
			if (this.reloadTime <= 0) {
				this.reloadTime = reloadTime;
				if (this.faction >= 0 && castle.lives < castle.max) {
					this.lives += spawn[this.level];
				}
			}
			if (this.sendTroopTime > 0) {
				this.sendTroopTime -= dt;
			} else {
				if (this.lives > 0 && this.attackCount > 0) {
					this.lives -= 1;
					this.attackCount -= 1;
					CreateUnit(this.pos[0], this.pos[1], this.faction, this.pathToTarget);
					this.sendTroopTime += troopSendDelay;
				} else {
					this.target = null;
				} 
			}
		},
		
		contains(x, y) {
			let pos = castle.pos;
			return (
				pos[0] - castleSize < x && 
				pos[1] - castleSize < y && 
				pos[0] + castleSize > x && 
				pos[1] + castleSize > y)
		},
		attack(factionId) {
			if (this.faction == factionId) {
				this.lives += 1;
			} else {
				if (this.lives <= 0) {
					this.faction = factionId;
					this.lives = 1;
				} else {
					this.lives -= 1;
				}
			}
		},
		sendArmy(target) {
			if (target == null || target.pathCastle == null)
				return
			
			this.target = target
			this.attackCount = this.lives / 2
			let pathToTarget = []
			pathToTarget.push(target)
			while (target.pathCastle != null) {
				target = target.pathCastle
				pathToTarget.push(target)
			}
			this.pathToTarget = pathToTarget
		},
	}
	gameObjects.push(castle)
	drawObjects.push(castle)
	castles.push(castle)
	return castle;
}

function getFactionColor(factionId) {
	switch (factionId) {
		case 0: return '#0000FF'; // player
		case 1: return '#FF0000'; // enemy
		case 2: return '#00FF00'; // enemy 2
		case -1:
		default:	
			return '#555555'; // neutral
	}
}

function getCastle(pos) {
	let
		x = (pos[0] - centerX) / screenScale,
		y = (pos[1] - centerY) / screenScale

	for(var i = 0; i < castles.length; i++) {
		if (castles[i].contains(x, y)) {
			return castles[i];
		}
	}
	return null;
}

function findNeibghors(maxDistance) {
	for(var i = 0; i < castles.length; i++) {
		for(var j = 0; j < castles.length; j++) {
			if (i != j && Vector2Distance(castles[i].pos, castles[j].pos) < maxDistance) {
				castles[i].neibghors.push(castles[j]);
			}
		}
	}
}

function findAvailableForMoveCastles(startCastle) {
	castles.forEach(
		castle => {
			castle.distance = 99999
			castle.pathCastle = null
		})
	if (startCastle == null) {
		return
	}
	let openList = []
	openList.push(startCastle)
	startCastle.distance = 0
	while (openList.length > 0) {
		let castle = openList.pop()
		castle.neibghors.forEach(
			nCastle => {
				let distanceFromStart = castle.distance + Vector2Distance(castle.pos, nCastle.pos)
				if (nCastle.distance > distanceFromStart) {
					nCastle.distance = distanceFromStart
					nCastle.pathCastle = castle
					if (nCastle.faction == startCastle.faction) {
						openList.push(nCastle)
					}
				}
			})
	}
}
const unitSize = 1;
const unitSpeed = 10;
const zeroVector = [0, 0];

function CreateUnit(x, y, factionId, pathToTarget) {
	var unit = {
		pos: [x, y],
		velocity: zeroVector,
		moveTime: 0,
		faction: factionId,
		target: null,
		path: [...pathToTarget],
		lives: 1,
		draw(canvas) {
			canvas.fillStyle = getFactionColor(unit.faction);
			fillRect (unit.pos[0] - unitSize, unit.pos[1] - unitSize, unitSize + unitSize, unitSize + unitSize)
		},
		update(dt) {
			// move to point
			unit.pos = AddVector2(unit.pos, MultiplyVector2(unit.velocity, dt))
			unit.moveTime -= dt
			// if movement ended - check do we have path or this is the end point of path
			if (unit.moveTime <= 0) {
				if (unit.path.length > 0) {
					// get next point from path stack
					unit.target = unit.path.pop()
					var delta = SubstractVector2(unit.target.pos, unit.pos)
					var direction = NormalizeVector2(delta)
					var distance = Vector2Length(delta)
					unit.velocity = MultiplyVector2(direction, unitSpeed)
					unit.moveTime = distance / unitSpeed
				} else {
					// attack and
					unit.target.attack(unit.faction)
					// kill
					removeItem(gameObjects, unit)
					removeItem(drawObjects, unit)
				}
			}
		},
	}
	gameObjects.push(unit)
	drawObjects.push(unit)
	return unit;
}

function removeItem(array, item) {
	const index = array.indexOf(item);
	if (index > -1) {
		array.splice(index, 1);
	}
}
				
const reloadTime = 1.0;
const playerFaction = 0;
var now,
	dt = 0,
	time = timestamp(),
	reloadTimer = reloadTime,
	step = 1/30,
	doc = document,
	canvasElement = doc.getElementById('a'),
	canvas = canvasElement.getContext('2d'),
	width = 1, // 1024
	height = 1, // 768
	minSize = 1, // 768
	centerX = 1, // 768 * 0.5
	centerY = 1, // 768 * 0.5
	screenScale = 1, // find size of 1/10 cell
	docElement = doc.documentElement,
	currentMatrix = CreateUnitMatrix3(),
	angle = 0

UpdateCanvasSize()

// init
let rect = canvasElement.getBoundingClientRect();
var selectedCastle = null;

var gameObjects = [];
var drawObjects = [];
CreateCastle(-40, 0, 0, 2)
CreateCastle(40, 0, 1, 2)
for(var i = -1; i < 2; i++) {
	for(var j = -1; j < 2; j++) {
		CreateCastle(i * 20, j * 20)
	}
}
findNeibghors(30);

var input = Input(rect)
gameObjects.push(input)

function timestamp() {
	let perf = window.performance;
	return perf && perf.now ? perf.now() : new Date().getTime();
}


function render() {
	// clear
	canvas.fillStyle    = '#101010';  // black
	canvas.fillRect ( 0, 0, width, height);

	// map
	// drawMap()
	// camera
	DrawCamera()

	canvas.fillStyle    = '#333333';  // black
	canvas.strokeStyle    = '#101010';  // black
	// Selected castle
	if (selectedCastle != null) {
		selectedCastle.drawSelection(canvas)
	}

	// castles
	drawObjects.forEach(g => g.draw(canvas))

	// help
	// canvas.font = "14pt Arial";
	// canvas.fillText("Q / E - Rotate level", 10, 30)
	// canvas.fillText("Z / X - change height constant", 10, 50)
	// canvas.fillText("dt " + dt, 10, 30)
}

function update(dt) {
	if (input.mouseLeftDown) {
		selectedCastle = getCastle(input.mousePosition);
		findAvailableForMoveCastles(selectedCastle)
	}
	if (input.mouseRightDown) {
		let target = getCastle(input.mousePosition);
		if (selectedCastle != null && target != null) {
			if (selectedCastle == target) {
				selectedCastle.upgrade()
			} else {
				selectedCastle.sendArmy(target)
			}
		}
	}
    if (input.key[32]) { // space
		console.log(objects3d)
    }
	gameObjects.forEach(g => g.update(dt));
	// rotate camera
    //angle += 20 * dt
    //currentMatrix = CreateRotationMatrix3(CreateVector3(0, 0, 1), angle)
	angle += 0.1 * dt
	currentMatrix = CreateRotationMatrix3(CreateVector3(0, 0, 1), Sin(angle) * 10 + 45)
	let pitch = CreateRotationMatrix3(CreateVector3(1, 0, 0), 40)
    cameraWorldMatrix = MultiplyMatrix3(pitch, currentMatrix)
}

let animationFrameFunction = requestAnimationFrame

function frame() {
	now = timestamp();
	dt = Math.min(1, (now - time) / 1000);
	if (dt > step) {
		dt = step;
	}
	time = now;
	update(dt);
	render();
	animationFrameFunction(frame);
	// update canvas on window change
	if (width != docElement.clientWidth || height != docElement.clientHeight) {
		UpdateCanvasSize()
	}
}
animationFrameFunction(frame);

function UpdateCanvasSize() {
	width = docElement.clientWidth
	height = docElement.clientHeight
	minSize = Math.min(width, height)

	centerX = width * 0.5
	centerY = height * 0.5
	screenScale = minSize * 0.01 // find size of 1/10 cell

	canvasElement.width = width
	canvasElement.height = height

	let fontSize = 24.0
	if (height > width) {
		fontSize *= height / width
	}
	canvas.font = parseInt(fontSize) + "pt Arial"

	SetCameraSize(width, height)
}

function fillRect(x, y, w, h) {
	canvas.fillRect (x * screenScale + centerX, y * screenScale + centerY, w * screenScale, h * screenScale)
}

function fillText(text, x, y) {
	canvas.fillText(text, x * screenScale + centerX, y * screenScale + centerY);
}