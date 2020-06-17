(this.webpackJsonpdocs=this.webpackJsonpdocs||[]).push([[0],{14:function(e,t,a){},15:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(8),r=a.n(i),o=(a(14),a(2)),l=a(5),u=a(6),c=a(3),m=a(4),h=(a(15),a(1)),d=a.n(h);function p(e){d()(e).hasClass("status-idle")?(d()(e).removeClass("status-idle"),d()(e).addClass("status-listening"),d()(".theme-light").addClass("theme-dark"),d()(".theme-light").removeClass("theme-light"),function(e){var t=new XMLHttpRequest,a="../src/sfx/"+e+".wav";t.open("GET",a,!0),t.responseType="arraybuffer",t.onload=function(){y.decodeAudioData(t.response,(function(e){g=e}),b)},t.send()}("sfx_listening"),function(e){var t=y.createBufferSource();t.buffer=e,t.connect(y.destination),t.start(0)}(g)):d()(e).hasClass("status-listening")&&(d()(e).removeClass("status-listening"),d()(e).addClass("status-idle"),d()(".theme-dark").addClass("theme-light"),d()(".theme-dark").removeClass("theme-dark"))}window.addEventListener("load",(function(){try{window.AudioContext=window.AudioContext||window.webkitAudioContext,y=new AudioContext}catch(e){alert("Web Audio API is not supported in this browser")}}),!1);var g=null;window.AudioContext=window.AudioContext||window.webkitAudioContext;var y=new AudioContext;function b(e){console.log("error loading an audio file.",e)}d()(document).ready((function(){})),d()("#btnAgent").click((function(){p("#btnAgent")}));var v=function(e){Object(m.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state=f,n.handler=n.handler.bind(Object(u.a)(n)),n}return Object(l.a)(a,[{key:"handler",value:function(){2===f.playStatus?(f.playStatus=3,f.theme="light"):(f.playStatus=2,f.theme="dark"),this.setState(f)}},{key:"render",value:function(){return s.a.createElement("div",{id:"baseplate"},s.a.createElement(w,{playStatus:this.state.playStatus,theme:this.state.theme,displayMessage:this.state.displayMessage,handler:this.handler}),s.a.createElement(O,{theme:this.state.theme,handler:this.handler}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return f}}]),a}(s.a.Component),f={name:"",message:"this is a dummy text",displayMessage:"dummy text",displayOnly:0,hasImage:0,epd:0,answerEntity:"",maxTimeout:0,duration:0,currentPlayTime:0,playStatus:0,theme:"light"},w=(s.a.Component,function(e){Object(m.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={playStatus:0,theme:"light",displayMessage:"dummy text"},n}return Object(l.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"box-agent"},s.a.createElement(k,{playStatus:this.state.playStatus,handler:this.props.handler}),s.a.createElement(S,{theme:this.state.theme,displayMessage:this.state.displayMessage}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return{playStatus:e.playStatus,theme:e.theme,displayMessage:e.displayMessage}}}]),a}(s.a.Component)),k=function(e){Object(m.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).setButtonStatus=function(e){switch(e){case 0:case 1:return"idle";case 2:return"listening";case 3:default:return"idle"}},n.state={playStatus:0},n}return Object(l.a)(a,[{key:"render",value:function(){return s.a.createElement("button",{id:"btnAgent",className:"button-agent status-"+this.setButtonStatus(this.state.playStatus),onClick:this.props.handler})}}],[{key:"getDerivedStateFromProps",value:function(e,t){return{playStatus:e.playStatus}}}]),a}(s.a.Component),S=function(e){Object(m.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={theme:"light",displayMessage:"dummy text"},n}return Object(l.a)(a,[{key:"render",value:function(){return s.a.createElement("p",{id:"txtSubtitle",className:"theme-"+this.state.theme},this.state.displayMessage)}}],[{key:"getDerivedStateFromProps",value:function(e,t){return{theme:e.theme,message:e.message}}}]),a}(s.a.Component),O=function(e){Object(m.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).setTheme=function(){n.setState({theme:"light"==n.state.theme?"dark":"light"})},n.state={theme:"light"},n}return Object(l.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"box-controller"},s.a.createElement("div",{className:"box-bar"},s.a.createElement("div",{className:"bar bar-base theme-"+this.state.theme,onClick:this.setTheme})),s.a.createElement("div",{className:"box-buttons"},s.a.createElement(C,{name:"btnRewind",alignRight:!1,theme:this.state.theme}),s.a.createElement(C,{name:"btnSkip",alignRight:!1,theme:this.state.theme}),s.a.createElement(C,{name:"btnExit",alignRight:!0,theme:this.state.theme})))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return{theme:e.theme}}}]),a}(s.a.Component),C=function(e){Object(m.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={theme:"light",clicked:!1},n}return Object(l.a)(a,[{key:"render",value:function(){return s.a.createElement("button",{id:this.props.name,className:"button-small theme-"+this.state.theme+(this.props.alignRight?" align-right":"")})}}],[{key:"getDerivedStateFromProps",value:function(e,t){return{theme:e.theme,clicked:e.clicked}}}]),a}(s.a.Component);var E=function(){return s.a.createElement(v,{name:f.name,message:f.message,displayMessage:f.displayMessage,displayOnly:f.displayOnly,hasImage:f.hasImage,epd:f.epd,answerEntity:f.answerEntity,maxTimeout:f.maxTimeout,duration:f.duration,currentPlayTime:f.currentPlayTime,playStatus:f.playStatus,theme:f.theme})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,a){e.exports=a(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.9e74a500.chunk.js.map