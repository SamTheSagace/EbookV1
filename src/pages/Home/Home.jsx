import "./Home.scss";
import Textanim from "../../components/Textanim/Textanim";
import Next from "../../components/Next/Next";
import { useEffect, useRef, useState } from "react";
import Volume from "../../components/Volume/Volume";
import test2 from "../../data/final.json";
import useAnimation from "../../Hooks/useAnimation";
import useAudio from "../../Hooks/useAudio";
import cat from "../../assets/images/cat.png";
import ReactPlayer from "react-player";

function Home() {
  const {
    isAnimating,
    currentIndex,
    currentPage,
    setIsAnimating,
    nextPage,
    start,
    stop,
  } = useAnimation(test2);
  const { fullVolume, setFullVolume, changeMusic } = useAudio();

  const transformText = (textContent) => {
    return textContent.split(" ").flatMap((word) => {
      if (word.length > 3) {
        const splitWord = word.match(/.{1,3}/g);
        return splitWord.map((chunk, index) => {
          if (index === splitWord.length - 1) {
            return chunk + " ";
          }
          return chunk;
        });
      } else {
        return word + " ";
      }
    });
  };
  const paragraphsWithIds = test2[currentPage].map((p, i) => ({
    ...p,
    id: i,
  }));

  useEffect(() => {
    const paragraphs = document.querySelectorAll("[id^='paragraph']");
    paragraphs.forEach((p) => (p.innerHTML = ""));
  }, [currentPage]);

  const playerRef = useRef(null);

  const play = () => {
    console.log("test");
    setPlaying((prev) => !prev);
    playerRef.current?.playVideo();
  };
  const pause = () => {
    playerRef.current?.pauseVideo();
  };
  const [playing, setPlaying] = useState(false);
  return (
    <div className="bodyMain">
      <div className="menu">
        <p>menu</p>

        <div style={{ opacity: 1 }}>
          <ReactPlayer
            className="test"
            src="https://youtu.be/_af2TbazL18?si=PWyyQwVo29CxRQdW"
            volume={fullVolume}
            width="0"
            height="0"
            style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
            playing={playing}
          />
        </div>

        <Volume fullVolume={fullVolume} setFullVolume={setFullVolume} />
        {/* <p>{Math.round(intVolume)}</p>
                <p>{isAnimating ? "true": "false"}</p> */}
      </div>
      <div className="textBody">
        <Next onCheck={nextPage} />
        {paragraphsWithIds.map((paragraph) => (
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
            playMusic={play}
            stopMusic={pause}
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
  );
}
export default Home;
