import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import letTheGameBegin from './assets/let-the-game-begin-jigsaw.gif';
import MaybeSearch from "./AwsomeStuffHere/MaybeSearch/MaybeSearch";
import IdkIgraNaKoram from './AwsomeStuffHere/MaybeSearch/IdkIgraNaKoram';

function App() {


  return (
    <div className="App" style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', width: '100vw'}}>

      <MaybeSearch></MaybeSearch>

      <img src={letTheGameBegin} style={{width: '500px'}}></img>

      <button className="fancy-button">
        <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank" rel="noopener noreferrer">
          КЛИКНИ ТУК
        </a>
      </button>

      <IdkIgraNaKoram></IdkIgraNaKoram>

    </div>
  );
}

export default App;