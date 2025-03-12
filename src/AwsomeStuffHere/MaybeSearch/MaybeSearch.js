import React, {useState, useEffect} from 'react';
import "./SearchingForMyCSS.css";

export default function MaybeSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showGame, setShowGame] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      setShowResults(true);
      setShowMessage(false);

      setTimeout(() => {
        setIsLoading(false);
        setShowMessage(true);
      }, 5000);
    }
  };

  const closeResults = () => {
    setShowResults(false);
    setIsLoading(false);
    setShowMessage(false);
  };

  return (
    <>
      {/* Search Component */}
      <div style={{display: 'flex', marginTop: '20px', marginBottom: '20px'}}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className={"search-input"}
        />
        <button
          onClick={handleSearch}
          className={"search-button"}
        >
          🔍
        </button>
      </div>

      {showResults && (
        <dialog open className={"modal"}>
          <button
            onClick={closeResults}
            className={"modal-close"}
          >
            ✕
          </button>
          <div className="results-container">
            {isLoading ? (
              <div className="spinner fire">
                <div></div>
                <div></div>
              </div>
            ) : showMessage ? (
              <div className="message-container">
                {showGame ?
                  <iframe className={"game-container"} src={"https://www.onlinegames.io/games/2024/construct/292/poop-clicker/index.html"}></iframe>
                  : (<>
                      <h2>Sorry, Try harder :)</h2>
                      <a
                        target={"_blank"}
                        className={"try-harder fire"}
                        onClick={() => {
                          setShowGame(true);
                        }}
                      >
                        TRY HARDER!!!!
                      </a>
                    </>
                  )
                }

              </div>
            ) : null}
          </div>
        </dialog>
      )}
    </>
  );
}