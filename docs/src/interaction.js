import $ from 'jquery';

function testtest() {
  console.log('hello');
}

function toggleAgent(target){
    if($(target).hasClass('status-idle')){
      $(target).removeClass('status-idle');
      $(target).addClass('status-listening');
      $('.theme-light').addClass('theme-dark');
      $('.theme-light').removeClass('theme-light');
      loadSound('sfx_listening');
      playSound(ttsBuffer);
    }
    else if($(target).hasClass('status-listening')){
      $(target).removeClass('status-listening');
      $(target).addClass('status-idle');
      $('.theme-dark').addClass('theme-light');
      $('.theme-dark').removeClass('theme-dark');
    }
  }


  /* web audio functions */
  window.addEventListener('load', init, false);
  function init() {
    try {
      // Fix up for prefixing
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
      context = new AudioContext();
    }
    catch(e) {
      alert('Web Audio API is not supported in this browser');
    }
  }
  var ttsBuffer = null;
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();

  function loadSound(filename) {
    var request = new XMLHttpRequest();
    var url = '../src/sfx/'+filename+'.wav';
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    // Decode asynchronously
    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        ttsBuffer = buffer;
      }, onError);
    }
    request.send();
  }

  function onError(e) {
    console.log("error loading an audio file.", e);
  }

  function playSound(buffer) {
    var source = context.createBufferSource(); // creates a sound source
    source.buffer = buffer;                    // tell the source which sound to play
    source.connect(context.destination);       // connect the source to the context's destination (the speakers)
    source.start(0);                           // play the source now
                                               // note: on older systems, may have to use deprecated noteOn(time);
  }


  /* execution */
  $(document).ready(function(){
  });
  $('#btnAgent').click(function(){
    toggleAgent('#btnAgent');
  });

  export default testtest
