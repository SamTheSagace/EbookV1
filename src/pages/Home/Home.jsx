import './Home.scss'
import Textanim from '../../components/Textanim/Textanim'
import Next from '../../components/Next/Next';
import { useEffect, } from 'react';
import Volume from '../../components/Volume/Volume';
import test2 from '../../data/final.json';
import useAnimation from '../../Hooks/useAnimation';
import useAudio from '../../Hooks/useAudio';

function Home(){
    const { isAnimating, currentIndex, currentPage, setIsAnimating, nextPage, start, stop } = useAnimation(test2);
    const { audioRef, intVolume, fullVolume, currentSong, setFullVolume, setIntVolume, playMusic, stopMusic, changeMusic, setCurrentSong } = useAudio();

    const transformText = (textContent)=>{
        return textContent.split(" ").map((word) => {
            if (word.length > 3) {
            const splitWord = word.match(/.{1,3}/g);
            return splitWord.map((chunk, index) => {
                if (index === splitWord.length - 1) {
                return chunk + " ";
                }
                return chunk; 
            });
            } 
            else {
            return word + " ";
            }
        }).flat()
    }
    // useEffect(() => {
    //     nextPage()
    // }, [stop]);

    // useEffect(()=>{
    //     console.log(currentIndex)
    // },[])

    const paragraphsWithIds = test2[currentPage].map((p, i) => ({
    ...p,
    id: i
    }));

    useEffect(() => {
    const paragraphs = document.querySelectorAll("[id^='paragraph']");
    paragraphs.forEach((p) => (p.innerHTML = ""));
    }, [currentPage]);
    
   return(
        <>
        <div className='bodyMain'>
            <div className='menu'>
                <p>menu</p>
                <audio ref={audioRef} id="audio" src={`src/assets/music/${currentSong}.mp3`}></audio>
                <Volume fullVolume={fullVolume} setFullVolume={setFullVolume}/>
                <p>{Math.round(intVolume)}</p>
                <p>{isAnimating ? "true": "false"}</p>
            </div>
            <div className='textBody'> 
            <Next onCheck={nextPage}/>                   
                {paragraphsWithIds.map((paragraph)=>(
                            <Textanim key={paragraph.id} 
                            id={paragraph.id} 
                            text={transformText(paragraph.content)} 
                            isAnimating={isAnimating} 
                            setisAnimating={setIsAnimating} 
                            isCurrent={currentIndex === paragraph.id} 
                            speed={paragraph.speed} 
                            musicStart={paragraph.musicStart}                      
                            musicEnd={paragraph.musicEnd}  
                            musicNext={paragraph.musicNext}  
                            startVolume={paragraph.startVolume} 
                            endVolume={paragraph.endVolume}
                            playMusic={playMusic} 
                            stopMusic={stopMusic}
                            changeMusic={changeMusic} 
                            stop={stop}
                            nextPage={nextPage}
                            start={start}
                            chapter={paragraph.chapter}
                            />
                        )
                    )
                }
                
            </div>      
            <div className='logoSpace'>
                <div className='logo'>
                <img src="src/assets/images/cat-griff-kreedgriff-replying-weirdlilguys-going-space-811-pm-may-1-2022-twitter-web-app.png" alt="" /></div>
            </div>
        </div>
        </>       
    )
}
export default Home