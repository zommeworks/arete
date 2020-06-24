import React from 'react';
import Sound from 'react-sound'; //to install: npm install react-sound
import styles from './App.css';
import data from './testscript.json'
import $ from 'jquery';


/*
  UI scheme

 ┏━━━━ baseplate ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃                                                 ┃
 ┃  ┏━━━━ TTSComp ━━━━━━━━━━━━━━━━━━━━━━━┓         ┃
 ┃  ┃  state: url (string)               ┃         ┃
 ┃  ┃         name (string)              ┃         ┃
 ┃  ┃         maxTimeout (int)           ┃         ┃
 ┃  ┃         voiceInput (0/1)           ┃         ┃
 ┃  ┃         playStatus (Sound.Status)  ┃         ┃
 ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛         ┃
 ┃                                                 ┃
 ┃  ┏━━━━ BoxAgent ━━━━━━━━━━━━━━━━━━━━━━━━━━┓     ┃
 ┃  ┃  ┏━━━━ ButtonAgent ━━━━━━━━━━━━━━━━━┓  ┃     ┃
 ┃  ┃  ┃  state: voiceInput (0/1)         ┃  ┃     ┃
 ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃     ┃
 ┃  ┃  ┏━━━━ TextSubtitle ━━━━━━━━━━━━━━━━┓  ┃     ┃
 ┃  ┃  ┃  state: theme (light / dark)     ┃  ┃     ┃
 ┃  ┃  ┃         displayMessage (string)  ┃  ┃     ┃
 ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃     ┃
 ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛     ┃
 ┃                                                 ┃
 ┃  ┏━━━━ BoxImage ━━━━━━━━━━━━━━━━━━━━━━━━━━┓     ┃
 ┃  ┃  (props:hasImage)                      ┃     ┃
 ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛     ┃
 ┃                                                 ┃
 ┃  ┏━━━━ BoxController ━━━━━━━━━━━━━━━━━━━━━━━━┓  ┃
 ┃  ┃  state: theme (light / dark)              ┃  ┃
 ┃  ┃         voiceInput (0/1)                  ┃  ┃
 ┃  ┃  ┏━━━━ div.box-bar ━━━━━━━━━━━━━━━━━━━━┓  ┃  ┃
 ┃  ┃  ┃  ┏━━━━ ProgressBar ━━━━━━━━━━━━━━┓  ┃  ┃  ┃
 ┃  ┃  ┃  ┃  state: voiceInput (0/1)      ┃  ┃  ┃  ┃
 ┃  ┃  ┃  ┃         maxTimeout (int)      ┃  ┃  ┃  ┃
 ┃  ┃  ┃  ┃         elapsedTime (int)     ┃  ┃  ┃  ┃
 ┃  ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃  ┃  ┃
 ┃  ┃  ┃  ┏━━━━ div.bar-base ━━━━━━━━━━━━━┓  ┃  ┃  ┃
 ┃  ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃  ┃  ┃
 ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃  ┃
 ┃  ┃  ┏━━━━ div.box-buttons ━━━━━━━━━━━━━━━━┓  ┃  ┃
 ┃  ┃  ┃  ┏━━━━ BtnSmall #btnRewind ━━━━━━┓  ┃  ┃  ┃
 ┃  ┃  ┃  ┃  state: theme (light / dark)  ┃  ┃  ┃  ┃
 ┃  ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃  ┃  ┃
 ┃  ┃  ┃  ┏━━━━ BtnSmall #btnPlayPause ━━━┓  ┃  ┃  ┃
 ┃  ┃  ┃  ┃  state: theme (light / dark)  ┃  ┃  ┃  ┃
 ┃  ┃  ┃  ┃         voiceInput (0/1)      ┃  ┃  ┃  ┃
 ┃  ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃  ┃  ┃
 ┃  ┃  ┃  ┏━━━━ BtnSmall #btnSkip ━━━━━━━━┓  ┃  ┃  ┃
 ┃  ┃  ┃  ┃  state: theme (light / dark)  ┃  ┃  ┃  ┃
 ┃  ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃  ┃  ┃
 ┃  ┃  ┃  ┏━━━━ BtnSmall #btnExit ━━━━━━━━┓  ┃  ┃  ┃
 ┃  ┃  ┃  ┃  state: theme (light / dark)  ┃  ┃  ┃  ┃
 ┃  ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃  ┃  ┃
 ┃  ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃  ┃
 ┃  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ┃
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
      voiceInput: 0,
      elapsedTime: 0,
      theme: 'light',
      playStatus: Sound.status.STOPPED
    }
    this.voiceInputHandler = this.voiceInputHandler.bind(this);
    this.updateState = this.updateState.bind(this);
    this.playSound = this.playSound.bind(this);
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
      voiceInput: 0,
      elapsedTime: 0,
      playStatus: Sound.status.STOPPED,
    });
    console.log('redirected to next script: '+window.location);
  }
  stopAndSkip() {
    this.setState({
      theme: 'light',
      voiceInput: 0,
    });
    setTimeout(() => {
      clearInterval(this.timeoutCounter);
      this.updateState();
    }, 500);//
  }
  playSound() {
    this.setState({
      playStatus: Sound.status.PLAYING
    });
  }
  voiceInputHandler() {
    //getting user turn
    if(currentData.name.match(/(prompt|feedback)/)) {
      if(this.state.voiceInput === 0) {
        this.setState({
          theme: 'dark',
          voiceInput: 1,
          playStatus: Sound.status.STOPPED
        });
        //start timeout counter
        const limit = this.state.maxTimeout * 1000;
        const frequency = 100;
        var elapsedTime = 0;
        this.timeoutCounter = setInterval(() => {
          if(elapsedTime < limit) {
            elapsedTime += frequency;
            this.setState({ elapsedTime: elapsedTime/1000 });
            console.log('listening: ',elapsedTime/1000);
          }
          else {
            this.stopAndSkip();
          }
        }, frequency);
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
          maxTimeout={this.state.maxTimeout}
          voiceInput={this.state.voiceInput}
          voiceInputHandler={this.voiceInputHandler}
          playStatus={this.state.playStatus}
          playSound={this.playSound}
        />
        <BoxAgent
          voiceInput={this.state.voiceInput}
          theme={this.state.theme}
          displayMessage={this.state.displayMessage}
          voiceInputHandler={this.voiceInputHandler}
        />
        <BoxImage
          name={this.state.name}
          hasImage={this.state.hasImage}
          theme={this.state.theme}
        />
        <BoxController
          theme={this.state.theme}
          maxTimeout={this.state.maxTimeout}
          voiceInput={this.state.voiceInput}
          elapsedTime={this.state.elapsedTime}
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
      playStatus: Sound.status.STOPPED,
    }
  }
  static getDerivedStateFromProps(props, state) {
    return {
      url: 'tts/'+props.name+'.mp3',
      name: props.name,
      maxTimeout: props.maxTimeout,
      voiceInput: props.voiceInput,
      playStatus: props.playStatus,
    };
  }
  render() {
    return(
      <Sound
        url={this.state.url}
        autoLoad={true}
        onLoad={this.props.playSound}
        playStatus={this.state.playStatus}
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
 * Image If needed  *
 * * * * * * * * * * * * * * * */

class BoxImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
    }
  }
  static getDerivedStateFromProps(props, state) {
    return {
      theme: props.theme,
      name: props.name,
    };
  }
  onError = () => {
    this.setState({
      name: 'none',
    });
  }
  render() {
    return(
      <div className={'box-image'}>
        <img
          className={'image theme-'+this.state.theme}
          src={'./img/'+this.state.name+'.png'}
          //src={'./img/TASK_J2_03_prompt_1.png'}
          onError={this.onError}
          alt={''}
        ></img>
      </div>
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
          <ProgressBar
            voiceInput={this.state.voiceInput}
            elapsedTime={this.props.elapsedTime}
            maxTimeout={this.props.maxTimeout}
          />
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
class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voiceInput: 0
    }
  }
  static getDerivedStateFromProps(props, state) {
    return {
      voiceInput: props.voiceInput,
      elapsedTime: props.elapsedTime,
    };
  }
  getWidth = () => {
    let limit = this.props.maxTimeout;
    let percentage = (this.state.elapsedTime / limit) * 100 + '%';
    return percentage;
  }
  render() {
    return (
      <div
        className={"bar bar-progress"}
        style={{width: this.getWidth()}}
      ></div>
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
