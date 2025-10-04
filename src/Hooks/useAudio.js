import { useEffect, useRef, useState } from "react";

export default function useAudio() {
    const [intVolume, setIntVolume] = useState(50);    
    const [fullVolume, setFullVolume] = useState(100);
    const [currentSong, setCurrentSong] = useState(1);
    const audioRef = useRef(new Audio(`src/assets/music/${currentSong}.mp3`));
    const interval = useRef(null);
    
    const startTransition = (startingVolume, targetVolume, time, setIntVolume) => {
        const steps = Math.floor(time / 10); // Number of steps
        const volumeStep = (targetVolume - startingVolume) / steps;
        let currentStep = 0;

        setIntVolume(startingVolume); // Set initial volume

        interval.current = setInterval(() => {
            currentStep++;
            setIntVolume((prevVolume) => Math.min(Math.max(prevVolume + volumeStep, 0), 100));

            if (currentStep >= steps) {
                clearInterval(interval.current);
            }
        }, 10);

        return () => clearInterval(interval.current); // Cleanup function
    };
    
    useEffect(() => {
        audioRef.current.volume = (intVolume / 100) * (fullVolume / 100);
    }, [intVolume, fullVolume]);

    const playMusic = (startVolume) => {
        console.log("start")
        if (audioRef.current) {
            let startingVolume = Number(startVolume[0])
            let targetVolume = Number(startVolume[1])
            let timeVolume = Number(startVolume[2])*1000
            console.log(timeVolume)
            startTransition(startingVolume, targetVolume, timeVolume, setIntVolume);
            setTimeout(() => audioRef.current.play(), 1);
        }
    };

    const stopMusic = (endVolume) => {
        console.log("stop")
        const stopChange = ()=>{
            setCurrentSong((c) => c+1);
            audioRef.current.pause()
        }
        if (audioRef.current) {
            let startingVolume = Number(intVolume)
            let targetVolume = Number(endVolume[0])
            let timeVolume = Number(endVolume[1])*1000
            console.log(startingVolume)
            console.log(timeVolume)
            startTransition(startingVolume, targetVolume, timeVolume, setIntVolume);
            setTimeout(() => stopChange(), timeVolume);
        }
    };

    const changeMusic = (endVolume, startVolume) =>{
        console.log("change")
        if(audioRef.current){
            console.log(endVolume[1])
            stopMusic(endVolume)
            setTimeout(() => 
                playMusic(startVolume), Number(endVolume[1])*1000);   
        }
    }

    

    return { audioRef, intVolume, fullVolume, currentSong, setFullVolume, setIntVolume, playMusic, stopMusic, changeMusic, setCurrentSong };
}
