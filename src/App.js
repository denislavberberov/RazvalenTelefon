import React, { useRef, useState } from 'react';
import './App.css';
import letTheGameBegin from './assets/let-the-game-begin-jigsaw.gif';
import Ainsley_Harriott from './assets/Ainsley_Harriott.png';
import MaybeSearch from "./AwsomeStuffHere/MaybeSearch/MaybeSearch";
import IdkIgraNaKoram from './AwsomeStuffHere/MaybeSearch/IdkIgraNaKoram';
import HelikopterButton from './AwsomeStuffHere/HelikopterButton';
import BoofCounter from './AwsomeStuffHere/ZaZaBoof/BoofCounter';
import ReactModal from 'react-modal';
import BoofStream from './AwsomeStuffHere/ZaZaBoof/BoofStream';
import AwesomeCursor from './AwsomeStuffHere/AwesomeCursor/AwesomeCursor';

function App() {

  const [offerBuff, setOfferBuff] = useState(false)

  const heheBoy = useRef(new Audio("ainsley_harriott_and_his_spicy_meatconverttoaudio.mp3"));

  const cursorSounds = useRef([
    new Audio("cursors/1.mp3"),
    new Audio("cursors/2.mp3"),
    new Audio("cursors/3.mp3"),
    new Audio("cursors/4.mp3"),
    new Audio("cursors/5.mp3"),
    new Audio("cursors/6.mp3"),
    new Audio("cursors/7.mp3"),
    new Audio("cursors/8.mp3"),
    new Audio("cursors/9.mp3"),
    new Audio("cursors/10.mp3"),
    new Audio("cursors/11.mp3"),
  ])

  const handleAinsley = () => {
      console.log("handleAinsley")
      heheBoy.current.load();
      heheBoy.current.play().catch(e => console.log("error while trying to play: ", e));
      document.querySelector("#game-image").style.marginTop = "300px"
  }

  const bruh = () => {
    console.log("bruh")
    const sound = cursorSounds.current[Math.floor(Math.random() * cursorSounds.current.length)];
    console.log(cursorSounds.current, sound);
    if(sound) {
      sound.load();
      sound.play().catch(e => console.log("error while trying to play: ", e));
    }
  }

  return (
    <div style={{display: 'flex', flexDirection:'row'}} onClick={bruh}>
    <BoofCounter onClick={()=>setOfferBuff(true)} booffCounter="420"/>
    <div className="App" style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: '60vw'}}>

      <MaybeSearch></MaybeSearch>

      <div id='center-image'>
        <img id='game-image' src={letTheGameBegin} style={{width: '500px'}} alt= "letTheGameBegin"></img>
        <img id='ainsley'
          onClick={handleAinsley}
          src={Ainsley_Harriott} style={{width: '500px'}}
          alt= "ainsley"></img>

      </div>

      <HelikopterButton>
        <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0`" target="_blank" rel="noopener noreferrer">
          КЛИКНИ ТУК
        </a>
      </HelikopterButton>

      <IdkIgraNaKoram></IdkIgraNaKoram>

    </div>
    <BoofCounter onClick={()=>setOfferBuff(true)} booffCounter="420"/>
    <ReactModal
    appElement={document.getElementById('root')}
    isOpen={offerBuff}
    >
      <BoofStream/>
    </ReactModal>

    <AwesomeCursor/>

    </div>
  );
}

export default App;