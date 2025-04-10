import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { motion } from 'framer-motion';
import './Azbuka.css';

const alphabet = [
  'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й',
  'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У',
  'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ь', 'Ю', 'Я'
];

function Azbuka({ isModalOpen, setIsModalOpen }) {
  const [index, setIndex] = useState(-1);

  const getImage = (index) => {
    return require(`../../assets/azbuka/images/image${[index]}.png`);
  };

  const getSound = (index) => {
    return require(`../../assets/azbuka/sounds/sound${index}.mp3`);
  };

  const handleLetterClick = (letterIndex) => {
    setIndex(letterIndex);

    const sound = new Audio(getSound(letterIndex));
    sound.play();
  };

  return (
    <div className="container">
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Azbuka Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="alphabet-buttons">
          {alphabet.map((letter, index) => (
            <button key={index} onClick={() => handleLetterClick(index)}>
              {letter}
            </button>
          ))}
        </div>
        {index > -1 &&
          <motion.img
            key={index}
            src={getImage(index)}
            alt={`Displayed ${alphabet[index]}`}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="image"
          />
        }
      </ReactModal>
    </div>
  );
}

export default Azbuka;
