import { useState, useEffect, useRef } from 'react';
import './Textanim.scss';

function Textanim({
  id,
  text,
  isAnimating,
  setisAnimating,
  isCurrent,
  musicStart,
  musicEnd,
  musicNext,
  startVolume,
  endVolume,
  playMusic,
  stopMusic,
  changeMusic,
  stop,
  chapter,
}) {
  const textArray = Array.from(text);
  const limit = textArray.length;
  const [index, setIndex] = useState(0);
  const interval = useRef('');
  const initialized = useRef(false);

  useEffect(() => {
    if (!isCurrent) return;
    setIndex(0);
    const blocText = document.getElementById(`paragraph${id}`);
    blocText.innerHTML = '';
    if (isAnimating && !interval.current) {
      console.log('start', isCurrent, index, textArray);
      // console.log("textArray", textArray)
      // console.log("limit", limit)
      if (isCurrent) {
        //look for the music state
        if (musicStart) {
          playMusic(startVolume);
        }
        if (musicNext) {
          changeMusic(endVolume, startVolume);
        }
        if (musicEnd) {
          stopMusic(endVolume);
        }
        if (!initialized.current) {
          initialized.current = true;
          // console.log(index)
          interval.current = setInterval(() => {
            setIndex(prevIndex => {
              if (!isAnimating) {
                clearInterval(interval.current);
                interval.current = null;
                initialized.current = false;
                return prevIndex;
              }
              const nextIndex = prevIndex + 1;
              if (blocText) {
                blocText.innerHTML += textArray[prevIndex];
              }
              if (nextIndex >= limit) {
                console.log('finished');
                setIndex(0);
                clearInterval(interval.current);
                interval.current = null;
                initialized.current = false;
                if (chapter) {
                  const el = document.getElementById(`paragraph${id}`);
                  setTimeout(() => {
                    el.classList.add('animated');
                  }, 400);
                  setTimeout(stop, 400);
                } else {
                  stop();
                }
                return prevIndex;
              }
              return nextIndex;
            });
          }, 15);
        }
      }
    }
    return () => {
      if (interval.current) {
        console.log('clearing interval');
        initialized.current = false;
        clearInterval(interval.current);
        interval.current = null;
        setisAnimating(false);
      }
    };
  }, [isAnimating]);

  return (
    <>
      <div className={chapter ? 'center' : 'text'}>
        <p id={`paragraph${id}`} className={chapter ? 'chapter' : 'paragraph'}></p>
      </div>
    </>
  );
}
export default Textanim;
