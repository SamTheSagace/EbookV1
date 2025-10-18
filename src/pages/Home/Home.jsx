import './Home.scss';
import Textanim from '../../components/Textanim/Textanim';
import Next from '../../components/Next/Next';
import { useEffect } from 'react';
import Volume from '../../components/Volume/Volume';
import test2 from '../../data/final.json';
import useAnimation from '../../Hooks/useAnimation';
import useAudio from '../../Hooks/useAudio';
import cat from '../../assets/images/cat.png';

function Home() {
  const { isAnimating, currentIndex, currentPage, setIsAnimating, nextPage, start, stop } = useAnimation(test2);
  const { audioRef, fullVolume, currentSong, setFullVolume, playMusic, stopMusic, changeMusic } = useAudio();
  const songsUrl = [
    'https://dl.dropboxusercontent.com/scl/fi/bxi4ytqf9z0732ndvjig5/1-I-Feel-Free-instru.mp4?rlkey=0ruawpkgu4oajlwrnan3wrdyd&st=sjvm6vah&dl=0',
    'https://dl.dropboxusercontent.com/scl/fi/mf97qjbrbbt389t02m3j1/2-INXS-new-sensation-instru.mp3?rlkey=7kdm2g8pfa7v0zoqw6u42oqen&st=dr2po6gx&dl=0',
    'https://dl.dropboxusercontent.com/scl/fi/u7pwopz3f1r06syl8trwq/3-INXS-devil-inside-instru.mp3?rlkey=gl8gb7t5tgmwpofp66otbyhol&st=7iut80pf&dl=0',
    'https://dl.dropboxusercontent.com/scl/fi/8h5ta8mrbkj9bj8c76kzg/4-Love-triangle-instru.mp3?rlkey=q19fc9zfmo4rtq016wj1wd33u&st=anlez57c&dl=0',
    'https://dl.dropboxusercontent.com/scl/fi/uvzkcifz8a3ln1hfvda39/5-MARS-pump-up-the-volume-instru.mp3?rlkey=rg712d6ba18xdldpzztwipimh&st=aqc3o94y&dl=0',
    'https://dl.dropboxusercontent.com/scl/fi/763tbmnfi4dcb4yymidrl/6-INXS-Need-you-tonight-voix.mp3?rlkey=e8fedbtoo1dz1voa5dtdgyd1r&st=ddmobgkx&dl=0',
    'https://dl.dropboxusercontent.com/scl/fi/ayqozqtca8x1v21xaw7fk/7-Eddie-Murphy-Party-all-the-time-voix.mp3?rlkey=1rzalazc4lhloghykva57nim5&st=2t3wm98e&dl=0',
  ];

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
          <audio ref={audioRef} id="audio" src={songsUrl[currentSong - 1]}></audio>
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
