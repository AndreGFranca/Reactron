
 import './css/App.css';
import { faMinus,faCoffee,prefix,fas } from "@fortawesome/free-solid-svg-icons";
import{faSquare,faWindowRestore} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState} from 'react'
// const { ipcRenderer } = require('electron')
// const path = require("path");
//  const { app } = require("electron");

// const remote = require('electron').remote;
const ipcRenderer =  window.require('electron').ipcRenderer;
 async function minWindow() {  
  await ipcRenderer.invoke('minimize');
}

async function maxMinWindow(){
    let windowState = await ipcRenderer.invoke('windowState');
      console.log(windowState);
      if (windowState) {
        await ipcRenderer.invoke('unMaximize')
      } else {
        await ipcRenderer.invoke('maximize')
      }
    return windowState;
}
async function closeWindow(){
  await ipcRenderer.invoke('close');  
}

function App() {

  const [batata,setBatata] = useState(true);

  async function maxMinWindow(){
    let windowState = await ipcRenderer.invoke('windowState');
      console.log(windowState);
      if (windowState) {
        await ipcRenderer.invoke('unMaximize')
      } else {
        await ipcRenderer.invoke('maximize')
      }
      setBatata(windowState);    
  }
  return (
    <div className="App">
      <header className="App-header">   
      <div className="App-row">        
          <div className="App-title-row">
            <img alt="/" src="/logo192.png" className="App-title-image" width="20x" height="20px"></img>
            <span className="App-title">Reactron</span> 
          </div>
        

        
        <div className="App-buttons">
          <button className="App-button App-button-normal" onClick={async()=>{await minWindow()}}>
            <FontAwesomeIcon icon={faMinus} className="App-icons-buttons" viewBox="0 0 560 512" />
          </button>
          <button className="App-button App-button-normal" onClick={async()=>{await maxMinWindow()}} >
            {batata?
            <FontAwesomeIcon icon={faSquare} className="App-icons-buttons" viewBox="0 0 450 512"/>:
            <FontAwesomeIcon icon={faWindowRestore} className="App-icons-buttons" viewBox="0 0 450 512"/>}
          </button>
          <button className="App-button App-close-button" onClick={async()=>{await closeWindow()}}>
          {/* <FontAwesomeIcon icon={faTimes} transform="" className="App-icons-buttons" viewBox="0 50 480 512" /> */}
            <div className="App-button-x"></div>
          </button>
        </div>
      

      </div>



      </header>
      <nav>
          teste
        </nav>
    </div>
  );
}

export default App;
