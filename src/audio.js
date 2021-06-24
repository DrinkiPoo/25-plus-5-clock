import React from "react";

const Audio = (props) => {
  return (
    <audio autoplay>
      <source
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        type="audio/ogg"
      />
    </audio>
  );
};

export default Audio;
