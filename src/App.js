import React from 'react';
import styles from './App.css';
import Interaction from './interaction.js';
//import Testscript from './testscript'



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

class Baseplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = currentData;
    this.handler = this.handler.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return currentData;
  }
  handler() {
    if(currentData.playStatus === 2) {
      currentData.playStatus = 3;
      currentData.theme = 'light';
    }
    else {
      currentData.playStatus = 2;
      currentData.theme = 'dark';
    }
    this.setState(currentData);
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



const currentData = {
  name: '',
  message: 'this is a dummy text',
  displayMessage: 'dummy text',
  displayOnly: 0,
  hasImage: 0,
  epd: 0,
  answerEntity: '',
  maxTimeout: 0,
  duration: 0,
  currentPlayTime: 0,
  playStatus: 0,
  theme: 'light',
};

class AudioController extends React.Component {
  constructor(props) {
    super(props);
    this.state = currentData;
  }
  getData = () => {

  }
  /*
  render() {
    return(
      true;
    );
  }
  */
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
      playStatus: 0
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
      displayMessage: "dummy text"
    };
  }
  static getDerivedStateFromProps(props, state) {
    return {
      theme: props.theme,
      message: props.message
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
    this.setState({ theme: this.state.theme == 'light' ? 'dark' : 'light' });
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
    };
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
  const element = <Baseplate
    name={currentData.name}
    message={currentData.message}
    displayMessage={currentData.displayMessage}
    displayOnly={currentData.displayOnly}
    hasImage={currentData.hasImage}
    epd={currentData.epd}
    answerEntity={currentData.answerEntity}
    maxTimeout={currentData.maxTimeout}
    duration={currentData.duration}
    currentPlayTime={currentData.currentPlayTime}
    playStatus={currentData.playStatus}
    theme={currentData.theme}
  />;
  return(element);
}
export default App;
