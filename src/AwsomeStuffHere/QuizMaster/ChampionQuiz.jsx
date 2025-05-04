import React, { useState, useEffect, useRef } from 'react';
import Wordle from './Wordle';
import champions from './datasets/champions.json';
import './ChampionQuiz.css';

const HINT_KEYS = [
  'Position',
  'Class',
  'ReleaseDate',
  'Description',
  'HasMana',
  'IsRanged'
];

export default function ChampionQuiz({ onBack }) {
  const [champion, setChampion] = useState(null);
  const [hintIdx, setHintIdx] = useState(0);
  const [canHint, setCanHint] = useState(false);
  const [hints, setHints] = useState([]);
  const videoRef = useRef(null);

  // Pick and reset a single random champion
  const pickChampion = () => {
    const randomChampion = champions[Math.floor(Math.random() * champions.length)];
    setChampion({ ...randomChampion, Name: randomChampion.Name.toUpperCase() });
    setHintIdx(0);
    setHints([]);
    setCanHint(false);
  };

  useEffect(pickChampion, []);

  useEffect(() => {
    if (videoRef.current) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const source = ctx.createMediaElementSource(videoRef.current);
      const gainNode = ctx.createGain();
      gainNode.gain.value = 10; 
      source.connect(gainNode).connect(ctx.destination);
    }
  }, []);

  // Allow another hint each time the user submits a guess
  const handleGuess = () => setCanHint(true);

  // Reveal one more hint if allowed
  const showHint = () => {
    if (!canHint || hintIdx >= HINT_KEYS.length) return;
    const key = HINT_KEYS[hintIdx];
    setHints(prev => [...prev, `${key}: ${champion[key]}`]);
    setHintIdx(i => i + 1);
    setCanHint(false);
  };

  const restartQuiz = () => pickChampion();

  if (!champion) return null;

  const getImage = () => require('../../assets/nomnom.webp');
  const getVideo = () => require('../../assets/lol.mp4');
  const getBomba = () => require('../../assets/lol-bomba.mp4');
  const getAudio = () => require('../../assets/brainrot.mp3');


  return (
    <div className="cringe-lol">
      <audio src={getAudio()} autoPlay loop />
      <video src={getBomba()} autoPlay muted loop/>
      <div className="champion-quiz">
        <header className="cq-header">
          <button className="cq-back" onClick={onBack}>← Back</button>
          <h2 className="cq-title">Guess the Champion</h2>
          <button className="cq-restart" onClick={restartQuiz}>🔄 Restart</button>
        </header>

        <div className="cq-body">
          <div className="cq-wordle">
            <Wordle solution={champion.Name} onGuess={handleGuess} wordList={champions.map(c => c.Name.toUpperCase())} />
          </div>

          <div className="cq-controls">
            <button
              className="cq-hint-btn"
              onClick={showHint}
              disabled={!canHint || hintIdx >= HINT_KEYS.length}
            >
              Show Hint
            </button>
            <ul className="cq-hints-list">
              {hints.map((h, i) => (
                <li key={i} className="cq-hint-item">{h}</li>
              ))}
            </ul>
          </div>
        </div>
        <img className='lol-img' src={getImage()} alt='lol' />
      </div>

      <video
        ref={videoRef}
        src={getVideo()}
        autoPlay
        loop
        className="feet"
      />
    </div>
  );
}
