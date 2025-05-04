import React, { useState, useEffect } from "react";
import "./Wordle.css";

const MAX_GUESSES = 6;

export default function Wordle({ solution: propSolution, onGuess, wordList }) {
    const [solution, setSolution] = useState(propSolution || "");
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState("");
    const [message, setMessage] = useState("");
    const [isGameOver, setIsGameOver] = useState(false);

    // When propSolution changes, reset the game state
    useEffect(() => {
        if (propSolution) {
            setSolution(propSolution);
            setGuesses([]);
            setCurrentGuess("");
            setMessage("");
            setIsGameOver(false);
        }
    }, [propSolution]);

    const WORD_LENGTH = solution.length;

    const onChange = (e) => {
        const val = e.target.value.toUpperCase();
        if (val.length <= WORD_LENGTH && /^[A-Z]*$/.test(val)) {
            setCurrentGuess(val);
        }
    };

    const onSubmit = () => {
        if (isGameOver) return;
        const guess = currentGuess.toUpperCase();
        if (guess.length !== WORD_LENGTH) {
            setMessage(`Guess must be ${WORD_LENGTH} letters.`);
            return;
        }
        if (guesses.includes(guess)) {
            setMessage("You already guessed that.");
            return;
        }
        if (wordList && !wordList.includes(guess)) {
            setMessage("Nice try diddy");
            return;
        }
        const newGuesses = [...guesses, guess];
        setGuesses(newGuesses);
        setCurrentGuess("");
        setMessage("");

        if (guess === solution) {
            setMessage("✅ You win, SIGMA!");
            setIsGameOver(true);
        } else if (newGuesses.length >= MAX_GUESSES) {
            setMessage(`❌ Game over ♿ - Solution was ${solution}`);
            setIsGameOver(true);
        }

        if (onGuess) onGuess();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") onSubmit();
    };

    const getCellClass = (guess, idx) => {
        const letter = guess[idx] || "";
        if (!solution) return "";
        if (letter === solution[idx]) return "cell correct";
        if (solution.includes(letter)) return "cell present";
        return "cell absent";
    };

    return (
        <div className="wordle-container">
            <div className="grid">
                {Array.from({ length: MAX_GUESSES }).map((_, row) => (
                    <div
                        key={row}
                        className="row"
                        style={{
                            gridTemplateColumns: `repeat(${WORD_LENGTH}, 1fr)`,
                        }}
                    >
                        {Array.from({ length: WORD_LENGTH }).map((_, col) => {
                            const guess = guesses[row] || "";
                            return (
                                <div
                                    key={col}
                                    className={getCellClass(guess, col)}
                                >
                                    {guess[col] || ""}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="controls">
                <div className="wordle-input-container">
                    <input
                        className="wordle-input"
                        type="text"
                        value={currentGuess}
                        onChange={onChange}
                        onKeyDown={handleKeyDown}
                        maxLength={WORD_LENGTH}
                        placeholder=""
                    />
                </div>
                <button onClick={onSubmit}>Guess</button>
            </div>

            {message && <p className="message">{message}</p>}
        </div>
    );
}
