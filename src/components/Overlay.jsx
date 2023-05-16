import { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";

const Mesh = (props) => {
  const { children, ...restProps } = props;
  return (
    <mesh {...restProps} primitive="mesh">
      {children}
    </mesh>
  );
};

const SlowlyDisplayText = ({ text }) => {
  const [displayedIndex, setDisplayedIndex] = useState(0);

  useEffect(() => {
    if (displayedIndex < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedIndex(displayedIndex + 1);
      }, 60); // change the delay time here as needed
      return () => clearTimeout(timeoutId);
    }
  }, [displayedIndex, text]);

  return <>{text.substring(0, displayedIndex)}</>;
};

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();

  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""} ${
        hasScroll ? "overlay--scrolled" : ""
      }`}
    >
      <div className={`loader ${progress === 100 ? "loader--disappear" : ""}`} />
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <div className="spinner">
            <div className="spinner__image" />
            <h2 className="logo">
                ออกเดินทางสู่ปราสาทแห่งมนต์สะกด!
            </h2>
          </div>
          <p className="intro__scroll">
                Scroll to begin the journey
          </p>
          <button
            className="explore"
            onClick={() => {
              setPlay(true);
            }}
          >
            START
          </button>
        </div>
      )}

      <div className="npc-dialog">
        <p>
          <SlowlyDisplayText text="Hello, traveler! Welcome to my kingdom." />
        </p>
      </div>

      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <p className="outro__text">
          <SlowlyDisplayText text="Thank you for had a great flight with us..." />
          <div className="npc-dialog">
        <p>
          <SlowlyDisplayText text="By Springchill" />
        </p>
      </div>
          <br />
          <br />
          <br />
          <br />
        </p>
        <br />
        <h5>
          <SlowlyDisplayText text="Cr: wawasensei" />
        </h5>
      </div>
    </div>
  );
};
