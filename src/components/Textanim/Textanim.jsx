import { useState, useEffect, useRef } from "react"
import './Textanim.scss'

function Textanim({
    id, 
    text, 
    isAnimating, 
    setisAnimating, 
    isCurrent, 
    speed,
    musicStart,    
    musicEnd,
    musicNext,
    startVolume,
    endVolume,
    playMusic,
    stopMusic,
    changeMusic,
    stop,
    nextPage,
    start,
    chapter
}){
    const timing = speed
    const textArray = text
    const limit = textArray.length
    const [index, setIndex] = useState(0)
    const interval = useRef('')
    const initialized = useRef(false)
    //end the animation, pass to the next text
    
    //When animation is started by clicking, this start
    function showFullText() {
    const blocText = document.getElementById(`paragraph${id}`);
    if (blocText) {
        blocText.innerHTML = textArray.join(""); // convert array to full string
    }
    stop(); // optionally call stop() to move forward if needed
}


    useEffect(() => {      
        if (!isCurrent) return;   
        const blocText = document.getElementById(`paragraph${id}`)  
        if(isAnimating && !interval.current){
            console.log("start", isCurrent, index, textArray)
            // console.log("textArray", textArray)
            // console.log("limit", limit)
            if(isCurrent){
            //look for the music state
                if(musicStart){
                    playMusic(startVolume)
                }
                if(musicNext){
                    changeMusic(endVolume, startVolume)
                }
                if(musicEnd){
                    stopMusic(endVolume)
                }
                //start an interval loop with modular speed
                // if(chapter){
                //     setTimeout(showFullText, 300)
                //     const el = document.getElementById(`paragraph${id}`);
                //     setTimeout(() => {
                //         el.classList.add("animated");
                //     }, 400);
                // }
                // else{}
                    if(!initialized.current){
                    initialized.current = true
                    // console.log(index)
                    interval.current = setInterval(() => {
                        setIndex((prevIndex) => {
                            if(!isAnimating){
                                clearInterval(interval.current);
                                interval.current = null;
                                initialized.current = false;
                                return prevIndex;                            
                            }
                            const nextIndex = prevIndex + 1;
                            blocText.innerHTML += textArray[prevIndex]
                            if (nextIndex >= limit) {
                                console.log("finished")
                                clearInterval(interval.current);
                                interval.current = null;                            
                                initialized.current = false;
                                setIndex(0)       
                                if(chapter){
                                    const el = document.getElementById(`paragraph${id}`);
                                    setTimeout(() => {
                                        el.classList.add("animated");
                                    }, 400);
                                    setTimeout(stop,400)
                                }                      
                                else{
                                    stop()
                                }                              
                                return prevIndex;                                
                            }
                            return nextIndex;
                        });
                    }, 30);
                    }
                
            }
        }
        return () => {
            if (interval.current){ 
                console.log("clearing interval")
                initialized.current = false;
                clearInterval(interval.current);
                interval.current = null;
                setisAnimating(false);
            }
        };
    }, [isAnimating]);

    return (
        <>
        <div className={chapter ? "center" : "text"}>
            <p id={`paragraph${id}`} className={chapter ? "chapter" : "paragraph"}></p>            
        </div>
        </>
    );   
}
export default Textanim