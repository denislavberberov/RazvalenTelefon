import { useEffect, useRef } from 'react';
import twerk from "../../assets/among-us-twerk.gif"

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function randomGif() {
    const gif = document.createElement("IMG");
    gif.src = twerk;
    gif.style.width = "50px";
    gif.style.height = "50px";
    gif.style.position = "fixed";
    gif.style.top = `${getRandomArbitrary(0, 1080)}px`;
    gif.style.left = `${getRandomArbitrary(0, 1920)}px`;

    document.querySelector("#miku-beam").appendChild(gif);
}

const MikuMikuBeam = ({onCancel}) => {
    const mikuMikuBeamMP3 = useRef(new Audio("miku-miku-beam.mp3"));
    const beamMP3 = useRef(new Audio("beam.mp3"));
    
    useEffect(() => {
        // Store the interval ID
        let intervalId;
        
        setTimeout(() => {
            // Correctly assign the interval ID
            intervalId = setInterval(() => randomGif(), 10)
        }, 10000)
        
        mikuMikuBeamMP3.current.load();
        mikuMikuBeamMP3.current.addEventListener('ended', () => {
            beamMP3.current.loop = true;
            beamMP3.current.play().catch(e => console.log("error while trying to play beam: ", e));
        });
        
        mikuMikuBeamMP3.current.play().catch(e => console.log("error while trying to play miku beam: ", e));

        // Clean up the interval and remove event listeners when the component unmounts
        return () => {
            // Use the intervalId to clear the interval
            if (intervalId) {
                clearInterval(intervalId);
            }
            mikuMikuBeamMP3.current.removeEventListener('ended', () => {});
            mikuMikuBeamMP3.current.pause();
            beamMP3.current.pause();
        };
    }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

    return (
        <div id="miku-beam">
        </div>
    );
}

export default MikuMikuBeam;