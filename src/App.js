import React from 'react';
import styles from './App.css';
import data from './testscript.json'
import $ from 'jquery';


/*
  UI scheme

 ┏━━━━ baseplate ━━━━┓
 ┃  ┏━━━━ AudioController ━━━━┓
 ┃  ┃
 ┃  ┗━━━━━━━━┛  ┃
 ┃  ┏━━━━ BoxAgent ━━━━━━━━━━━━━━━━━━━━━┓
 ┃  ┃  ┏━━━━ ButtonAgent ━━━━━━━━━━━━┓  ┃
 ┃  ┃  ┃  props: playStatus (0/1/2)  ┃  ┃
 ┃  ┃  ┃  state: playStatus (0/1/2)  ┃  ┃
 ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
 ┃  ┃  ┏━━━━ TextSubtitle ━━━━━━━━━━━┓  ┃
 ┃  ┃  ┃  props: text (string)       ┃  ┃
 ┃  ┃  ┃         playStatus (0/1/2)  ┃  ┃
 ┃  ┃  ┃  state: playStatus (0/1/2)  ┃  ┃
 ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
 ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ┃
 ┃  ┏━━━━ BoxController ━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃  ┃  props: theme (light / dark)              ┃
 ┃  ┃         playStatus (0/1/2)                ┃
 ┃  ┃  state: theme (light / dark)              ┃
 ┃  ┃         playStatus (0/1/2)                ┃
 ┃  ┃  ┏━━━━ div.box-bar ━━━━━━━━━━━━━━━━━━━━┓  ┃
 ┃  ┃  ┃  ┏━━━━ ProgressBar ━━━━━━━━━━━━━━┓  ┃  ┃
 ┃  ┃  ┃  ┃  props: playStatus (0/1/2)    ┃  ┃  ┃
 ┃  ┃  ┃  ┃         maxTimeout (int)      ┃  ┃  ┃
 ┃  ┃  ┃  ┃  state: playStatus (0/1/2)    ┃  ┃  ┃
 ┃  ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃  ┃
 ┃  ┃  ┃  ┏━━━━ div.bar-base ━━━━━━━━━━━━━┓  ┃  ┃
 ┃  ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃  ┃
 ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
 ┃  ┃  ┏━━━━ div.box-buttons ━━━━━━━━━━━━━━━━┓  ┃
 ┃  ┃  ┃  ┏━━━━ BtnSmall #btnRewind ━━━━━━┓  ┃  ┃
 ┃  ┃  ┃  ┃  props: theme (light / dark)  ┃  ┃  ┃
 ┃  ┃  ┃  ┃  state: theme (light / dark)  ┃  ┃  ┃
 ┃  ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃  ┃
 ┃  ┃  ┃  ┏━━━━ BtnSmall #btnPlayPause ━━━┓  ┃  ┃
 ┃  ┃  ┃  ┃  props: theme (light / dark)  ┃  ┃  ┃
 ┃  ┃  ┃  ┃         playStatus (0/1/2)    ┃  ┃  ┃
 ┃  ┃  ┃  ┃  state: theme (light / dark)  ┃  ┃  ┃
 ┃  ┃  ┃  ┃         playStatus (0/1/2)    ┃  ┃  ┃
 ┃  ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃  ┃
 ┃  ┃  ┃  ┏━━━━ BtnSmall #btnSkip ━━━━━━━━┓  ┃  ┃
 ┃  ┃  ┃  ┃  props: theme (light / dark)  ┃  ┃  ┃
 ┃  ┃  ┃  ┃  state: theme (light / dark)  ┃  ┃  ┃
 ┃  ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃  ┃
 ┃  ┃  ┃  ┏━━━━ BtnSmall #btnExit ━━━━━━━━┓  ┃  ┃
 ┃  ┃  ┃  ┃  props: theme (light / dark)  ┃  ┃  ┃
 ┃  ┃  ┃  ┃  state: theme (light / dark)  ┃  ┃  ┃
 ┃  ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃  ┃
 ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
 ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛


 props and states

 playStatus:
  0: null,
  1: audio ready,
  2: playing,
  3: audio end
**/



/* * * * * * * * * * *
 * global variables  *
 * * * * * * * * * * */

const currentData = {};
const nextData = {};
var ttsBuffer = null;
// webAudioAPI Fix up prefixing
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();



/* * * * * * * * * * * * *
 * webAudioAPI functions *
 * * * * * * * * * * * * */

function initAudio() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

function loadSound(filename) {
  var request = new XMLHttpRequest();
  var url = '../src/sfx/'+filename+'.mp3';
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

//functions
function initData(){
  try {
    let docID = window.location.hash.split('#');
    $.each(data.list, function(i){
      if(data.list[i].name === docID[1]){
        overwriteData(data.list[i], currentData);
        if(data.list[i].name.match(/(prompt|statement)/)) {
        }
      }
    });
  }
  catch(e) {
    alert('failed to load data');
  }
}
function overwriteData(source, target) {
  target.name = source.name;
  target.message = source.message;
  target.displayMessage = source.displayMessage;
  target.displayOnly = source.displayOnly;
  target.hasImage = source.hasImage;
  target.epd = source.epd;
  target.answerEntity = source.answerEntity;
  target.maxTimeout = source.maxTimeout;
  //target.duration = source.duration;
}

class Baseplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: '',
      displayMessage: '',
      displayOnly: 0,
      hasImage: 0,
      epd: 0,
      answerEntity: '',
      maxTimeout: 0,
      duration: 0,
      currentPlayTime: 0,
      playStatus: 0,
      theme: 'light'
    }
    this.handler = this.handler.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return {
      name: props.name,
      message: props.message,
      displayMessage: props.displayMessage,
      displayOnly: props.displayOnly,
      hasImage: props.hasImage,
      epd: props.epd,
      answerEntity: props.answerEntity,
      maxTimeout: props.maxTimeout,
    };
  }
  handler() {
    if(this.state.playStatus === 2) {
      this.setState({
        playStatus: 3,
        theme: 'light'
      });
    }
    else {
      this.setState({
        playStatus: 2,
        theme: 'dark'
      });
    }
  }
  render() {
    return(
      <div id="baseplate">
        <BoxAgent
          playStatus={this.state.playStatus}
          theme={this.state.theme}
          displayMessage={this.state.displayMessage}
          handler={this.handler}
        />
        <BoxController
          theme={this.state.theme}
          handler={this.handler}
        />
      </div>
    );
  }
}




/* * * * * * * * * * * * *
 * BoxAgent and children *
 * * * * * * * * * * * * */

class BoxAgent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playStatus: 0,
      theme: 'light',
      displayMessage: "dummy text"
    };
  }
  static getDerivedStateFromProps(props, state) {
    return {
      playStatus: props.playStatus,
      theme: props.theme,
      displayMessage: props.displayMessage
    };
  }
  render() {
    return(
      <div className="box-agent">
        <ButtonAgent
          playStatus={this.state.playStatus}
          handler={this.props.handler}
        />
        <TextSubtitle theme={this.state.theme} displayMessage={this.state.displayMessage}/>
      </div>
    );
  }
}

class ButtonAgent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playStatus: 0,
    };
  }
  static getDerivedStateFromProps(props, state) {
    return {
      playStatus: props.playStatus
    };
  }
  setButtonStatus = (param) => {
    switch(param) {
      case 0: //audio is not loaded
        return 'idle';
      case 1: //audio is ready
        return 'idle';
      case 2: //audio is playing
        return 'listening';
      case 3: //audio ended
        return 'idle';
      default:
        return 'idle';
    }
  }
  render() {
    return(
      <button
        id="btnAgent"
        className={"button-agent status-"+this.setButtonStatus(this.state.playStatus)}
        onClick={this.props.handler}
      >
      </button>
    );
  }
}

class TextSubtitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
      displayMessage: 'dummy text'
    };
  }
  static getDerivedStateFromProps(props, state) {
    return {
      theme: props.theme,
      displayMessage: props.displayMessage
    };
  }
  render() {
    return(
      <p
        id="txtSubtitle"
        className={"theme-"+this.state.theme}
      >
        {this.state.displayMessage}
      </p>
    );
  }
}

/*
class AudioController extends React.Component {

}
class AudioComp extends React.Component {
  constructor(props) {
    super(props);
  }
  static getDerivedStateFromProps(props, state) {
    return {
      name: props.name,
      message: props.message,
      displayMessage: props.displayMessage,
      displayOnly: props.displayOnly,
      hasImage: props.hasImage,
      epd: props.epd,
      answerEntity: props.answerEntity,
      maxTimeout: props.maxTimeout,
      duration: props.duration,
      currentPlayTime: props.currentPlayTime,
      playStatus: props.playStatus,
      theme: props.theme
    };
  }
  render() {
    return(

    );
  }
}
*/

/* * * * * * * * * * * * * * * *
 * BoxController and children  *
 * * * * * * * * * * * * * * * */

class BoxController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light'
    };
  }
  static getDerivedStateFromProps(props, state) {
    return {
      theme: props.theme
    };
  }
  setTheme = () => {
    this.setState({ theme: this.state.theme === 'light' ? 'dark' : 'light' });
  }
  render() {
    return(
      <div className="box-controller">
        <div className="box-bar">
          <div className={"bar bar-base theme-"+this.state.theme}
          onClick={this.setTheme}></div>
        </div>
        <div className="box-buttons">
          <ButtonSmall name="btnRewind" alignRight={false} theme={this.state.theme} />
          <ButtonSmall name="btnSkip" alignRight={false} theme={this.state.theme} />
          <ButtonSmall name="btnExit" alignRight={true} theme={this.state.theme} />
        </div>
      </div>
    );
  }
}

class ButtonSmall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
      clicked: false
    }
  }
  static getDerivedStateFromProps(props, state) {
    return {
      theme: props.theme,
      clicked: props.clicked
    };
  }
  render() {
    return (
      <button
        id={this.props.name}
        className={
          "button-small theme-"+
          this.state.theme+
          (this.props.alignRight ? ' align-right' : '')
        }
      >
      </button>
    );
  }
}


function App() {
  //initAudio();
  initData();
  const element = <Baseplate
    name={currentData.name}
    message={currentData.message}
    displayMessage={currentData.displayMessage}
    displayOnly={currentData.displayOnly}
    hasImage={currentData.hasImage}
    epd={currentData.epd}
    answerEntity={currentData.answerEntity}
    maxTimeout={currentData.maxTimeout}
  />;
  return(element);
}
export default App;
