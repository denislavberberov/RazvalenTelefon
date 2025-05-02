import arena from '../../assets/epic-battle/arena.webp'
import fightAudio from "../../assets/epic-battle/fight-audio.mp3"
import trallaleloTrallala from "../../assets/epic-battle/trallalelo-tralala.png"
import bombardiroCrocodile from "../../assets/epic-battle/bombardiro-crocodilo.png"
import trallaleloTrallalaAudio from "../../assets/epic-battle/tralalero-tralala-audio.mp3"
import fightBackgroundMusic from "../../assets/epic-battle/fight-background-music.mp3"
import bombardiroCrocodileAudio from "../../assets/epic-battle/bombardiro-crocodilo-audio.mp3"
import explosion from "../../assets/epic-battle/explosion.gif"
import explosionSound from "../../assets/epic-battle/explosion.mp3"

import { useRef, useState } from 'react'

export default function EpicBattle() {
    const [isAnimating, setIsAnimating] = useState(false)
    const [showExplosion, setShowExplosion] = useState(false)
    const [attackCount, setAttackCount] = useState(0)
    const [showFightButton, setShowFightButton] = useState(true)
    const [hasExploded, setHasExploded] = useState(false)
    const audios = useRef([
        new Audio(trallaleloTrallalaAudio),
        new Audio(bombardiroCrocodileAudio),
        new Audio(fightAudio),
        new Audio(fightBackgroundMusic),
        new Audio(explosionSound)
    ])

    const resetArena = () => {
        setShowExplosion(false)
        setIsAnimating(false)
        setAttackCount(0)
        setShowFightButton(true)
        setHasExploded(false)
        // Reset all audio
        audios.current.forEach(audio => {
            audio.pause()
            audio.currentTime = 0
        })
    }

    const getAttackAnimation = (count) => {
        // Initial and final converging attack
        const convergingAttack = {
            trallalelo: 'translate(calc(50vw - 200px), calc(-50vh + 200px))',
            crocodile: 'translate(calc(-50vw + 175px), calc(50vh - 175px))'
        }

        // If it's the first or last attack, use the converging pattern
        if (count === 0 || count === 29) {
            return convergingAttack
        }

        const animations = [
            // Center Cross Attacks
            {
                trallalelo: 'translate(calc(50vw - 200px), calc(50vh - 200px))',
                crocodile: 'translate(calc(-50vw + 175px), calc(-50vh + 175px))'
            },
            {
                trallalelo: 'translate(calc(-50vw + 200px), calc(50vh - 200px))',
                crocodile: 'translate(calc(50vw - 175px), calc(-50vh + 175px))'
            },
            {
                trallalelo: 'translate(calc(-50vw + 200px), calc(-50vh + 200px))',
                crocodile: 'translate(calc(50vw - 175px), calc(50vh - 175px))'
            },
            // Diagonal Cross Patterns
            {
                trallalelo: 'translate(calc(35vw - 175px), calc(-35vh + 175px))',
                crocodile: 'translate(calc(-35vw + 150px), calc(35vh - 150px))'
            },
            {
                trallalelo: 'translate(calc(-35vw + 175px), calc(35vh - 175px))',
                crocodile: 'translate(calc(35vw - 150px), calc(-35vh + 150px))'
            },
            // Vertical Center Cross
            {
                trallalelo: 'translate(0, calc(-50vh + 200px))',
                crocodile: 'translate(0, calc(50vh - 175px))'
            },
            {
                trallalelo: 'translate(0, calc(50vh - 200px))',
                crocodile: 'translate(0, calc(-50vh + 175px))'
            },
            // Horizontal Center Cross
            {
                trallalelo: 'translate(calc(50vw - 200px), 0)',
                crocodile: 'translate(calc(-50vw + 175px), 0)'
            },
            {
                trallalelo: 'translate(calc(-50vw + 200px), 0)',
                crocodile: 'translate(calc(50vw - 175px), 0)'
            },
            // Circular Center Patterns
            {
                trallalelo: 'translate(calc(25vw - 125px), calc(-25vh + 125px))',
                crocodile: 'translate(calc(-25vw + 100px), calc(25vh - 100px))'
            },
            {
                trallalelo: 'translate(calc(-25vw + 125px), calc(25vh - 125px))',
                crocodile: 'translate(calc(25vw - 100px), calc(-25vh + 100px))'
            },
            // Quick Center Jabs
            {
                trallalelo: 'translate(calc(15vw - 75px), calc(-15vh + 75px))',
                crocodile: 'translate(calc(-15vw + 65px), calc(15vh - 65px))'
            },
            {
                trallalelo: 'translate(calc(-15vw + 75px), calc(15vh - 75px))',
                crocodile: 'translate(calc(15vw - 65px), calc(-15vh + 65px))'
            },
            // Spiral Center Patterns
            {
                trallalelo: 'translate(calc(20vw - 100px), calc(-20vh + 100px))',
                crocodile: 'translate(calc(-20vw + 85px), calc(20vh - 85px))'
            },
            {
                trallalelo: 'translate(calc(-20vw + 100px), calc(20vh - 100px))',
                crocodile: 'translate(calc(20vw - 85px), calc(-20vh + 85px))'
            },
            // X Pattern Center Cross
            {
                trallalelo: 'translate(calc(30vw - 150px), calc(-30vh + 150px))',
                crocodile: 'translate(calc(-30vw + 130px), calc(30vh - 130px))'
            },
            {
                trallalelo: 'translate(calc(-30vw + 150px), calc(30vh - 150px))',
                crocodile: 'translate(calc(30vw - 130px), calc(-30vh + 130px))'
            },
            // Quick Center Crosses
            {
                trallalelo: 'translate(calc(10vw - 50px), calc(-10vh + 50px))',
                crocodile: 'translate(calc(-10vw + 45px), calc(10vh - 45px))'
            },
            {
                trallalelo: 'translate(calc(-10vw + 50px), calc(10vh - 50px))',
                crocodile: 'translate(calc(10vw - 45px), calc(-10vh + 45px))'
            },
            // Final Center Cross
            {
                trallalelo: 'translate(calc(40vw - 200px), calc(-40vh + 200px))',
                crocodile: 'translate(calc(-40vw + 175px), calc(40vh - 175px))'
            },
            {
                trallalelo: 'translate(calc(-40vw + 200px), calc(40vh - 200px))',
                crocodile: 'translate(calc(40vw - 175px), calc(-40vh + 175px))'
            }
        ]
        return animations[count % animations.length]
    }

    const playAudioSequence = async () => {
        for (let i = 0; i < audios.current.length; i++) {
            try {
                if (i === 3) { // Background music
                    audios.current[i].play()
                    continue
                }
                await audios.current[i].play()
                await new Promise((resolve) => {
                    audios.current[i].onended = resolve
                })
                if (i === 2) {
                    setIsAnimating(true)
                    const interval = setInterval(() => {
                        setAttackCount(prev => {
                            if (prev >= 29) {
                                clearInterval(interval)
                                setTimeout(() => {
                                    if (!hasExploded) {
                                        setShowExplosion(true)
                                        setHasExploded(true)
                                        audios.current[4].play() // Play explosion sound
                                        // Stop background music after explosion sound
                                        audios.current[3].pause()
                                        audios.current[3].currentTime = 0
                                        // Wait for explosion sound to finish before resetting
                                        setTimeout(() => {
                                            resetArena()
                                        }, 2000) // Assuming explosion sound is about 2 seconds
                                    }
                                }, 400)
                                return prev
                            }
                            return prev + 1
                        })
                    }, 400)
                }
            } catch (error) {
                console.error(`Error playing audio ${i}:`, error)
            }
        }
    }

    const startAnimation = () => {
        resetArena()
        setShowFightButton(false)
        playAudioSequence()
    }
    
    const currentAnimation = getAttackAnimation(attackCount)
    
    return (
        <div style={{ position: 'absolute', zIndex: 1000, top:0, left:0, width: '100vw', height: '100vh', pointerEvents: 'all' }}>
            <img 
                src={arena} 
                alt="Battle Arena" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {(!showExplosion || !hasExploded) && (
                <>
                    <img 
                        src={trallaleloTrallala} 
                        alt="Trallalelo Trallala" 
                        style={{ 
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            width: '400px',
                            height: 'auto',
                            transform: isAnimating ? currentAnimation.trallalelo : 'none',
                            transition: 'transform 0.4s ease-in-out'
                        }}
                    />
                    <img 
                        src={bombardiroCrocodile} 
                        alt="Bombardiro Crocodile" 
                        style={{ 
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            width: '350px',
                            height: 'auto',
                            transform: isAnimating ? currentAnimation.crocodile : 'none',
                            transition: 'transform 0.4s ease-in-out'
                        }}
                    />
                </>
            )}
            {showExplosion && (
                <img 
                    src={explosion} 
                    alt="Explosion" 
                    style={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '500px',
                        height: 'auto'
                    }}
                />
            )}

            {showFightButton && (
                <button 
                    onClick={startAnimation}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '15px 30px',
                        fontSize: '24px',
                        backgroundColor: '#ff0000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        zIndex: 1001
                    }}
                >
                    FIGHT!
                </button>
            )}
        </div>
    )
}