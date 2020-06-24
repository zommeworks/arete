import React from 'react';
import Sound from 'react-sound';
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
 ┃  ┃  ┃  props: voiceInput (0/1)    ┃  ┃
 ┃  ┃  ┃  state: voiceInput (0/1)    ┃  ┃
 ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
 ┃  ┃  ┏━━━━ TextSubtitle ━━━━━━━━━━━┓  ┃
 ┃  ┃  ┃  props: text (string)       ┃  ┃
 ┃  ┃  ┃         voiceInput (0/1)    ┃  ┃
 ┃  ┃  ┃  state: voiceInput (0/1)    ┃  ┃
 ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
 ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ┃
 ┃  ┏━━━━ BoxController ━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃  ┃  props: theme (light / dark)              ┃
 ┃  ┃         voiceInput (0/1)                  ┃
 ┃  ┃  state: theme (light / dark)              ┃
 ┃  ┃         voiceInput (0/1)                  ┃
 ┃  ┃  ┏━━━━ div.box-bar ━━━━━━━━━━━━━━━━━━━━┓  ┃
 ┃  ┃  ┃  ┏━━━━ ProgressBar ━━━━━━━━━━━━━━┓  ┃  ┃
 ┃  ┃  ┃  ┃  props: voiceInput (0/1)      ┃  ┃  ┃
 ┃  ┃  ┃  ┃         maxTimeout (int)      ┃  ┃  ┃
 ┃  ┃  ┃  ┃  state: voiceInput (0/1)      ┃  ┃  ┃
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
 ┃  ┃  ┃  ┃         voiceInput (0/1)      ┃  ┃  ┃
 ┃  ┃  ┃  ┃  state: theme (light / dark)  ┃  ┃  ┃
 ┃  ┃  ┃  ┃         voiceInput (0/1)      ┃  ┃  ┃
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

**/



/* * * * * * * * * * *
 * global variables  *
 * * * * * * * * * * */

var currentData = {};
var nextDataName = '';



//functions

function initData(){
  try {
    let docID = getUrlParams().name;
    $.each(data.list, function(i){
      if(data.list[i].name === docID){
        overwriteData(data.list[i], currentData);
      }
    });
  }
  catch(e) {
    alert('failed to load data');
  }
  nextDataName = getnextDataName();
}

function initNext() {
  $.each(data.list, function(i){
    if(data.list[i].name === nextDataName){
      overwriteData(data.list[i], currentData);
    }
  });
  nextDataName = getnextDataName();
}

function getnextDataName() {
  let j;
  for(let i = 0; i < data.list.length; i++){
    if(data.list[i].name === currentData.name){
      j = i+1;
      break;
    }
  }
  for(j; j < data.list.length; j++){
    if(data.list[j].name.match(/(prompt|statement)/)) {
      return data.list[j].name;
      break;
    }
  }
}

function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
    return params;
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
      voiceInput: 0,
      theme: 'light',
      playStatus: Sound.status.PLAYING
    }
    this.voiceInputHandler = this.voiceInputHandler.bind(this);
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
  updateState() {
    window.location.href = '?name=' + nextDataName;//
    initNext();
    this.setState({
      name: currentData.name,
      message: currentData.message,
      displayMessage: currentData.displayMessage,
      displayOnly: currentData.displayOnly,
      hasImage: currentData.hasImage,
      epd: currentData.epd,
      answerEntity: currentData.answerEntity,
      maxTimeout: currentData.maxTimeout,
      duration: currentData.duration,
      currentPlayTime: 0,
      voiceInput: 0,
      playStatus: Sound.status.PLAYING,
    });
    console.log('redirected to next script: '+window.location);
  }
  voiceInputHandler() {
    //getting user turn
    if(currentData.name.match(/(prompt|feedback)/)) {
      switch(this.state.voiceInput) {
        case 0: //starts getting voice input
          this.setState({
            theme: 'dark',
            voiceInput: 1,
            playStatus: Sound.status.STOPPED
          });
          break;
        case 1: //exceeded max timeout
        this.setState({
          theme: 'dark',
        });
          setTimeout(function() {
            this.updateState();
          }, 500);
          break;
      }
    }
    //pass to next target
    else if(currentData.name.match(/statement/)) {
      this.updateState();
    }
  }
  render() {
    return(
      <div id="baseplate">
        <TTSComp
          name={this.state.name}
          duration={this.state.duration}
          currentPlayTime={this.state.currentPlayTime}
          voiceInput={this.state.voiceInput}
          voiceInputHandler={this.voiceInputHandler}
          playStatus={this.state.playStatus}
        />
        <BoxAgent
          voiceInput={this.state.voiceInput}
          theme={this.state.theme}
          displayMessage={this.state.displayMessage}
          voiceInputHandler={this.voiceInputHandler}
        />
        <BoxController
          theme={this.state.theme}
          voiceInputHandler={this.voiceInputHandler}
        />
      </div>
    );
  }
}

class TTSComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voiceInput: 0,
      playStatus: Sound.status.PAUSED
    }
  }
  static getDerivedStateFromProps(props, state) {
    return {
      url: 'tts/'+props.name+'.mp3',
      name: props.name,
      duration: props.duration,
      currentPlayTime: props.currentPlayTime,
      voiceInput: props.voiceInput,
      playStatus: props.playStatus
    };
  }
  /*
  playStatusHandler = () => {
    this.setStthis.state.voiceInput === 1 ? Sound.status.PAUSED : Sound.status.PLAYING;
  }
  */
  render() {
    return(
      <Sound
        url={this.state.url}
        autoLoad={true}
        //playStatus={Sound.status.PLAYING}
        playStatus={this.state.playStatus}
        //onLoading={this.handleSongLoading}
        //onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.props.voiceInputHandler}
      />
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
      voiceInput: 0,
      theme: 'light',
      displayMessage: "dummy text"
    };
  }
  static getDerivedStateFromProps(props, state) {
    return {
      voiceInput: props.voiceInput,
      theme: props.theme,
      displayMessage: props.displayMessage
    };
  }
  render() {
    return(
      <div className="box-agent">
        <ButtonAgent
          voiceInput={this.state.voiceInput}
          voiceInputHandler={this.props.voiceInputHandler}
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
      voiceInput: 0,
    };
  }
  static getDerivedStateFromProps(props, state) {
    return {
      voiceInput: props.voiceInput
    };
  }
  setButtonStatus = (param) => {
    switch(param) {
      case 0:
        return 'idle';
      case 1:
        return 'listening';
      default:
        return 'idle';
    }
  }
  render() {
    return(
      <button
        id="btnAgent"
        className={"button-agent status-"+this.setButtonStatus(this.state.voiceInput)}
        onClick={this.props.voiceInputHandler}
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
          <ButtonSmall
            name="btnRewind"
            alignRight={false}
            theme={this.state.theme}
          />
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
  initData();
  const element =
    <Baseplate
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
