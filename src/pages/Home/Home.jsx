import './Home.scss';
import Textanim from '../../components/Textanim/Textanim';
import Next from '../../components/Next/Next';
import { useEffect } from 'react';
import Volume from '../../components/Volume/Volume';
import test2 from '../../data/final.json';
import useAnimation from '../../Hooks/useAnimation';
import useAudio from '../../Hooks/useAudio';
import cat from '../../assets/images/cat.png';
import song1 from '../../assets/music/song1.mp3';
import song2 from '../../assets/music/song2.mp3';
import song3 from '../../assets/music/song3.mp3';
import song4 from '../../assets/music/song4.mp3';
import song5 from '../../assets/music/song5.mp3';
import song6 from '../../assets/music/song6.mp3';
import song7 from '../../assets/music/song7.mp3';

function Home() {
  const { isAnimating, currentIndex, currentPage, setIsAnimating, nextPage, start, stop } = useAnimation(test2);
  const { audioRef, fullVolume, currentSong, setFullVolume, playMusic, stopMusic, changeMusic } = useAudio();
  const songs = ['/music/song1.mp3', '/music/song2.mp3', '/music/song3.mp3', '/music/song4.mp3', '/music/song5.mp3', '/music/song6.mp3', '/music/song7.mp3'];

  const transformText = textContent => {
    return textContent
      .split(' ')
      .map(word => {
        if (word.length > 3) {
          const splitWord = word.match(/.{1,3}/g);
          return splitWord.map((chunk, index) => {
            if (index === splitWord.length - 1) {
              return chunk + ' ';
            }
            return chunk;
          });
        } else {
          return word + ' ';
        }
      })
      .flat();
  };
  // useEffect(() => {
  //     nextPage()
  // }, [stop]);

  // useEffect(()=>{
  //     console.log(currentIndex)
  // },[])

  const paragraphsWithIds = test2[currentPage].map((p, i) => ({
    ...p,
    id: i,
  }));

  useEffect(() => {
    const paragraphs = document.querySelectorAll("[id^='paragraph']");
    paragraphs.forEach(p => (p.innerHTML = ''));
  }, [currentPage]);

  return (
    <>
      <div className="bodyMain">
        <div className="menu">
          <p>menu</p>
          <audio ref={audioRef} id="audio" src={songs[currentSong]}></audio>
          <Volume fullVolume={fullVolume} setFullVolume={setFullVolume} />
          {/* <p>{Math.round(intVolume)}</p>
                <p>{isAnimating ? "true": "false"}</p> */}
        </div>
        <div className="textBody">
          <Next onCheck={nextPage} />
          {paragraphsWithIds.map(paragraph => (
            <Textanim
              key={paragraph.id}
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
          ))}
        </div>
        <div className="logoSpace">
          <div className="logo">
            <img src={cat} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
