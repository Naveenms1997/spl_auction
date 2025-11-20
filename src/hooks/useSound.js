import { useRef } from "react";

export default function useSound(src, volume = 1) {
  const audioRef = useRef(new Audio(src));

  const play = () => {
    audioRef.current.volume = volume;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return play;
}
