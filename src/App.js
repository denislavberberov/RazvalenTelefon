import React, { useState } from 'react';
import './App.css';
import letTheGameBegin from './assets/let-the-game-begin-jigsaw.gif';
import MaybeSearch from "./AwsomeStuffHere/MaybeSearch/MaybeSearch";
import IdkIgraNaKoram from './AwsomeStuffHere/MaybeSearch/IdkIgraNaKoram';
import HelikopterButton from './AwsomeStuffHere/HelikopterButton';
import BoofCounter from './AwsomeStuffHere/ZaZaBoof/BoofCounter';
import ReactModal from 'react-modal';
import BoofStream from './AwsomeStuffHere/ZaZaBoof/BoofStream';

function App() {

  const [offerBuff, setOfferBuff] = useState(false)

  return (
    <div style={{display: 'flex', flexDirection:'row'}}>
    <BoofCounter onClick={()=>setOfferBuff(true)} booffCounter="420"/>
    <div className="App" style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: '60vw'}}>

      <MaybeSearch></MaybeSearch>

      <img src={letTheGameBegin} style={{width: '500px'}} alt= "letTheGameBegin"></img>

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
    </div>
  );
}

export default App;