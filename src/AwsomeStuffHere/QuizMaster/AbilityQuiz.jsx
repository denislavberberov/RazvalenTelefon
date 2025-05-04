import React, { useState, useEffect } from "react";
import Wordle from "./Wordle";
import abilities from "./datasets/abilities.json";
import "./ChampionQuiz.css";

const HINT_KEYS = ["abilityName", "is_passive"];

export default function AbilityQuiz({ onBack }) {
    const [entry, setEntry] = useState(null);
    const [hintIdx, setHintIdx] = useState(0);
    const [canHint, setCanHint] = useState(false);
    const [hints, setHints] = useState([]);

    // load hard mode from localStorage, default false
    const [hardMode, setHardMode] = useState(() => {
        return localStorage.getItem("abilityHardMode") === "true";
    });
    // load rotation from localStorage, default 0
    const [rotation, setRotation] = useState(() => {
        const stored = parseInt(localStorage.getItem("abilityRotation"), 10);
        return isNaN(stored) ? 0 : stored;
    });

    // Persist hardMode and rotation
    useEffect(() => {
        localStorage.setItem("abilityHardMode", hardMode);
        localStorage.setItem("abilityRotation", rotation);
    }, [hardMode, rotation]);

    const championList = Array.from(
        new Set(
            abilities.map((a) => a.champion.toUpperCase().replace(/'/g, "").replace(" ", ""))
        )
    );

    // pick a random ability
    const pickEntry = () => {
        const rand = abilities[Math.floor(Math.random() * abilities.length)];
        setEntry({
            champion: rand.champion.toUpperCase().replace(/'/g, "").replace(" ", ""),
            abilityName: rand.name,
            is_passive: rand.is_passive,
            image_url: rand.image_url,
        });
        setHintIdx(0);
        setHints([]);
        setCanHint(false);
    };

    useEffect(pickEntry, []);

    const handleGuess = () => {
        setCanHint(true);
    };

    const showHint = () => {
        if (!canHint || hintIdx >= HINT_KEYS.length) return;
        const key = HINT_KEYS[hintIdx];
        const text =
            key === "is_passive"
                ? `Type: ${entry.is_passive ? "Passive" : "Not Passive"}`
                : `Ability: ${entry.abilityName}`;
        setHints((prev) => [...prev, text]);
        setHintIdx((i) => i + 1);
        setCanHint(false);
    };

    // toggle Hard Mode
    const toggleHardMode = () => {
        if (!hardMode) {
            const angle = Math.random() < 0.5 ? 90 : 180;
            setRotation(angle);
        } else {
            setRotation(0);
        }
        setHardMode((prev) => !prev);
    };

    if (!entry) return null;
    const getKesha1 = () => require("../../assets/kesha/kesha1.mp4");
    const getKesha2 = () => require("../../assets/kesha/kesha2.mp4");
    const getAudio = () => require("../../assets/naenae.mp3");

    return (
        <div className="cringe-lol">
            <audio src={getAudio()} autoPlay loop />
            <video className="kesha-video" src={getKesha1()} autoPlay loop />
            <div className="champion-quiz">
                <header className="cq-header">
                    <button className="cq-back" onClick={onBack}>
                        ← Back
                    </button>
                    <h2 className="cq-title">Guess the Champion</h2>
                    <button className="cq-restart" onClick={pickEntry}>
                        🔄 Restart
                    </button>
                </header>
                <button className="cq-restart aq-hard" onClick={toggleHardMode}>
                    {hardMode ? "💀 Hard Mode" : "🤡 Easy Mode"}
                </button>
                <div className="cq-preview">
                    <img
                        src={entry.image_url}
                        alt={entry.abilityName}
                        className="aq-img"
                        style={{
                            filter: hardMode ? "saturate(0)" : undefined,
                            transform: hardMode
                                ? `rotate(${rotation}deg)`
                                : undefined,
                        }}
                    />
                </div>
                <div className="cq-body">
                    <div className="cq-wordle">
                        <Wordle
                            solution={entry.champion}
                            onGuess={handleGuess}
                            wordList={championList}
                        />
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
                                <li key={i} className="cq-hint-item">
                                    {h}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <video className="kesha-video" src={getKesha2()} autoPlay loop />
        </div>
    );
}
