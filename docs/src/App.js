import React from 'react';
import logo from './logo.svg';
import './App.css';


function button_small(props) {
  return (
    <button
      id={props.name}
      className={props.class}>
    </button>
  );
}

const btnExit = {
  name: 'btnExit',
  class: 'button-small',
  theme: 'light',
}

function App() {
  const element = (
    <button_small
      name={btnExit.name}
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  return(element);
}
export default App;
