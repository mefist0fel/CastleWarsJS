
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