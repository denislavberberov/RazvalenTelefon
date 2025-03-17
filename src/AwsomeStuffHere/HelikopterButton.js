import React, { useRef, useEffect } from 'react';

const HelikopterButton = ({children, ...props}) => {
    const myAudio = useRef(new Audio("helicopter-helicopter-parakofer-parakofer.mp3"));

    const handleMouseEnter = () => {
        if(myAudio.current.paused){
          console.log('play');
          myAudio.current.load();
          myAudio.current.play().catch(e => console.log("error while trying to play: ", e));
        }
    };

    const handleMouseLeave = () => {
        myAudio.current.pause();
        myAudio.current.currentTime = 0;
    };

    useEffect(()=> {
      myAudio.current.load();
    },[])

    useEffect(()=> {
      myAudio.current.load();
    },[])

    return (
        <>
        <button
            className={`fancy-button`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
        </button>
        </>
    );
};

export default HelikopterButton;
