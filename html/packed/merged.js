// basic vector2[x, y] functons
function vAdd(av, bv) {
	return [av[0] + bv[0], av[1] + bv[1]];
}
function vSub(av, bv) {
	return [av[0] - bv[0], av[1] - bv[1]];
}
function magnitude(va) {
	return Math.sqrt(va[0] * va[0] + va[1] * va[1]);
}
function distance(va, vb) {
	return Math.sqrt((va[0] - vb[0]) * (va[0] - vb[0]) + (va[1] - vb[1]) * (va[1] - vb[1]));
}
function vNorm(v) { // normilize
	var dist = 1 / magnitude(v);
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
		update (dt) {
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
	document.addEventListener('contextmenu', preventmenu,	false);
	return input;
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
//playSound([0,,0.1812,,0.1349,0.4524,,0.2365,,,,,,0.0819,,,,,1,,,,,0.5]); return false;/**
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
const castleSize = 40;
const selectionHeight = 45;
const troopSendDelay = 0.2;

function CreateCastle(x, y, factionId = -1) {
	var castle = {
		pos: [x, y],
		faction: factionId,
		attackCount: 0,
		target: null,
		lives: 10,
		max: 100,
		reloadTime: 1,
		sendTroopTime: 0,
		draw(canvas) {
			canvas.fillStyle = getFactionColor(castle.faction);
			canvas.fillRect (castle.pos[0] - castleSize, castle.pos[1] - castleSize, castleSize + castleSize, castleSize + castleSize)
			canvas.textAlign = 'center';
			canvas.fillText(castle.lives, castle.pos[0], castle.pos[1] - 50);
		},
		drawSelection(canvas) {
			canvas.fillStyle = '#FFFFFF';// white
			canvas.fillRect (castle.pos[0] - selectionHeight, castle.pos[1] - selectionHeight, selectionHeight + selectionHeight, selectionHeight + selectionHeight)
		},
		update(dt) {
			castle.reloadTime -= dt;
			if (castle.reloadTime <= 0) {
				castle.reloadTime = reloadTime;
				if (castle.faction >= 0 && castle.lives < castle.max) {
					castle.lives += 1;
				}
			}
			if (this.sendTroopTime > 0) {
				this.sendTroopTime -= dt;
			} else {
				if (this.lives > 0 && this.attackCount > 0) {
					this.lives -= 1;
					this.attackCount -= 1;
					CreateUnit(this.pos[0], this.pos[1], this.faction, this.target);
					this.sendTroopTime += troopSendDelay;
				} else {
					this.target = null;
				} 
			}
		},
		
		contains(point) {
			let pos = castle.pos;
			return (
				pos[0] - castleSize < point[0] && 
				pos[1] - castleSize < point[1] && 
				pos[0] + castleSize > point[0] && 
				pos[1] + castleSize > point[1])
		},
		attack(factionId) {
			if (castle.faction == factionId) {
				castle.lives += 1;
			} else {
				if (castle.lives <= 0) {
					castle.faction = factionId;
					castle.lives = 1;
				} else {
					castle.lives -= 1;
				}
			}
		},
		sendArmy(target) {
			this.target = target
			this.attackCount = this.lives / 2
		},
	}
	gameObjects.push(castle)
	drawObjects.push(castle)
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
}const unitSize = 6;
const unitSpeed = 100;

function CreateUnit(x, y, factionId, target) {
	var delta = vSub(target.pos, [x, y])
	var direction = vNorm(delta)
	var distance = magnitude(delta)

	var unit = {
		pos: [x, y],
		velocity: vMult(direction, unitSpeed),
		lifeTime: distance / unitSpeed,
		faction: factionId,
		target: target,
		lives: 1,
		draw(canvas) {
			canvas.fillStyle = getFactionColor(unit.faction);
			canvas.fillRect (unit.pos[0] - unitSize, unit.pos[1] - unitSize, unitSize + unitSize, unitSize + unitSize)
		},
		update(dt) {
			unit.pos = vAdd(unit.pos, vMult(unit.velocity, dt))
			unit.lifeTime -= dt
			if (unit.lifeTime <= 0) {
				target.attack(unit.faction)
				// kill
				removeItem(gameObjects, unit)
				removeItem(drawObjects, unit)
			}
		}
	}
	gameObjects.push(unit)
	drawObjects.push(unit)
	return unit;
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
		width = 1024,
		height = 768;

	// init
	var canvasElement = document.getElementById('a');
	var canvas = canvasElement.getContext('2d');
	canvasElement.width = width;
	canvasElement.height = height;
	rect = canvasElement.getBoundingClientRect();
	var selectedCastle = null;

	var gameObjects = [];
	var drawObjects = [];
	var castles = [];
	castles.push(CreateCastle(300, 300, 0))
	castles.push(CreateCastle(300, 500))
	castles.push(CreateCastle(700, 500, 1))
	castles.push(CreateCastle(700, 300))

	var input = Input(rect)
	gameObjects.push(input)
	//var camera = Camera();
	//var player = Hero();
	// setMoveDirection(45);

	function timestamp() {
		let perf = window.performance;
		return perf && perf.now ? perf.now() : new Date().getTime();
	}

	function render(dt) {
		// clear
		canvas.fillStyle    = '#101010';  // black
		canvas.fillRect ( 0, 0, width, height);
		// test
		// canvas.fillStyle    = '#FFFFFF';  // white
		// canvas.fillRect (10, 10, 100, 100)

		// Selected castle
		if (selectedCastle != null) {
			selectedCastle.drawSelection(canvas);
		}

		// castles
		drawObjects.forEach(g => g.draw(canvas));

		// help
		canvas.font = "14pt Arial";
		// canvas.fillText("Q / E - Rotate level", 10, 30)
		// canvas.fillText("Z / X - change height constant", 10, 50)
		// canvas.fillText("C / V - c//hange tile aspect", 10, 50)
		// canvas.fillText("dt " + dt, 10, 30)
	}

	function update(dt) {
		if (input.mouseLeftDown) {
			selectedCastle = getCastle(input.mousePosition);
		}
		if (input.mouseRightDown) {
			let target = getCastle(input.mousePosition);
			if (selectedCastle != null && target != null) {
				selectedCastle.sendArmy(target)
			}
		}
		gameObjects.forEach(g => g.update(dt));
	}

	function getCastle(pos) {
		for(var i = 0; i < castles.length; i++) {
			if (castles[i].contains(pos)) {
				return castles[i];
			}
		}
		return null;
	}

	function frame() {
		now = timestamp();
		dt = Math.min(1, (now - time) / 1000);
		if (dt > step) {
			dt = step;
		}
		time = now;
		update(dt);
		render(dt);
		requestAnimationFrame(frame);
	}
	requestAnimationFrame(frame);