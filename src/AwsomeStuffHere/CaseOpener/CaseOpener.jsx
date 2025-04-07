import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import defaultCaseImage from "../../assets/shocked-face-shocked-meme.gif";
import sigmaBoySong from "../../assets/sigma-boy-song.mp3";
import "./CaseOpener.css";

const placeholderImages = [
  "https://via.placeholder.com/150?text=Item1",
  "https://via.placeholder.com/150?text=Item2",
  "https://via.placeholder.com/150?text=Item3",
  "https://via.placeholder.com/150?text=Item4",
  "https://via.placeholder.com/150?text=Item5",
];

const TOTAL_SPIN_DURATION = 10000;
const IMAGE_WIDTH = 150;
const EXTRA_CYCLES = 3;

const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);

const CaseOpener = () => {
  const [opened, setOpened] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [memeImages, setMemeImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const audioRef = useRef(new Audio(sigmaBoySong));
  const rouletteWindowRef = useRef(null);

  useEffect(() => {
    if (selectedImage !== null) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [selectedImage]);

  const fetchMemes = async () => {
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      const memes = data.data.memes;
      const shuffled = memes.sort(() => 0.5 - Math.random());
      const urls = shuffled.slice(0, 10).map((meme) => meme.url);
      setMemeImages(urls);
    } catch (error) {
      console.error("Error fetching memes:", error);
      setMemeImages(placeholderImages);
    }
  };

  const handleOpen = async () => {
    setOpened(true);
    audioRef.current.play();
    await fetchMemes();
    setTimeout(() => {
      spinRoulette();
    }, 1000);
  };

  const spinRoulette = () => {
    setSpinning(true);
    const startTime = performance.now();
    const imagesToUse = memeImages.length > 0 ? memeImages : placeholderImages;
    const winIndex = Math.floor(Math.random() * imagesToUse.length);
    const markerOffset = 225 - IMAGE_WIDTH / 2; 
    const targetPos = winIndex * IMAGE_WIDTH;
    const extraDistance = EXTRA_CYCLES * imagesToUse.length * IMAGE_WIDTH;
    const totalDistance = extraDistance + targetPos - markerOffset;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      if (elapsed < TOTAL_SPIN_DURATION) {
        const t = easeOutQuad(elapsed / TOTAL_SPIN_DURATION);
        const newScrollLeft = t * totalDistance;
        if (rouletteWindowRef.current) {
          rouletteWindowRef.current.scrollLeft = newScrollLeft;
        }
        requestAnimationFrame(animate);
      } else {
        if (rouletteWindowRef.current) {
          rouletteWindowRef.current.scrollLeft = totalDistance;
        }
        setSpinning(false);
        setResult(winIndex);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleImageClick = (img) => {
    if (!spinning) {
      setSelectedImage(img);
    }
  };

  const resetRoulette = () => {
    setOpened(false);
    setSpinning(false);
    setResult(null);
    setSelectedImage(null);
    setMemeImages([]);
    if (rouletteWindowRef.current) {
      rouletteWindowRef.current.scrollLeft = 0;
    }
  };

  const imagesToRender = memeImages.length > 0 ? memeImages : placeholderImages;

  return (
    <div className="case-opener-container">
      <h1 className="roulette-title">What MEME are you today?</h1>
      {!opened ? (
        <div className="case-container">
          <img src={defaultCaseImage} alt="Case" className="case-image" />
          <button onClick={handleOpen} className="open-button">
            Open MEME
          </button>
        </div>
      ) : (
        <div>
          <div className="roulette-container">
            <div className="marker">▼</div>
            <div ref={rouletteWindowRef} className="roulette-window">
              <div className="roulette-track">
                {[...imagesToRender, ...imagesToRender, ...imagesToRender].map(
                  (img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Item ${index}`}
                      className="roulette-image"
                      onClick={() => handleImageClick(img)}
                    />
                  )
                )}
              </div>
            </div>
          </div>
          {!spinning && (
            <div className="controls">
              <button onClick={resetRoulette} className="open-button">
                Spin Again
              </button>
            </div>
          )}
          {selectedImage && (
            <div className="result-section">
              <div className="winning-container">
                <img
                  src={selectedImage}
                  alt="Selected Meme"
                  className="winning-image"
                />
              </div>
              <div className="result-message">
                You selected: {selectedImage}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CaseOpener;
