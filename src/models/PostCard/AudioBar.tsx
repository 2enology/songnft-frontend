"use client";
/* eslint-disable @next/next/no-img-element */
import {
  MiniPlayIcon,
  PauseSongIcon,
  PlayAudioIcon,
} from "../../components/Svglist";
import { GetPageContext } from "../../contexts/PageContext";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

export const AudioBar = (props: {
  songTitle: string;
  songImg: string;
  playCount: number;
  songArtist: string;
  songUrl: string;
}) => {
  const { setMusicFunc } = useContext(GetPageContext);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  const [othersStopState, setOthersStopState] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const stopAllSound = () => {
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audio) => {
      audio.pause();
    });
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setIsPlaying(false);
        stopAllSound();
        setMusicFunc(
          props.songImg,
          props.songTitle,
          props.songArtist,
          props.songUrl
        );

        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
    setCurrentlyPlaying(props.songTitle);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(Math.floor(audioRef.current.currentTime));
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Reset the state when the audio ends
  useEffect(() => {
    if (audioRef.current) {
      setDuration(Math.floor(audioRef.current.duration));
      const handleEnded = () => {
        setCurrentTime(0);
        setIsPlaying(false);
      };
      audioRef.current.addEventListener("ended", handleEnded);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [audioRef, audioRef.current]);

  return (
    <div className="w-full flex items-start justify-start p-3 bg-[#08090B] rounded-xl gap-4">
      <div className="w-[60px] h-[50px] md:w-[120px] md:h-[110px] relative">
        <Image
          src={props.songImg}
          fill
          alt="Music Avatar"
          className="object-cover rounded-xl"
        />
      </div>
      <div className="flex items-start justify-start flex-col gap-1 w-full relative">
        <div className="w-full flex items-center justify-between">
          <p className="text-white text-lg font-bold">{props.songTitle}</p>
          <p className="flex items-center justify-center gap-1 cursor-pointer">
            <MiniPlayIcon />
            <span className="text-sm text-[#939393]">{props.playCount}</span>
          </p>
        </div>
        <p className="text-sm text-[#939393]">{props.songArtist}</p>
        <div className="w-full flex md:flex-row flex-col items-center justify-start gap-3 mt-6">
          <div className="flex items-center justify-start gap-2 w-full">
            <span className="text-white text-sm">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              className="w-full duration-300 transition-all"
              min={0}
              max={duration.toString()}
              value={currentTime}
              onChange={handleSeek}
              onInput={handleTimeUpdate}
            />
            <audio
              ref={audioRef}
              src={props.songUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={(e) => {
                if (e.currentTarget.src) {
                  setDuration(Math.floor(e.currentTarget.duration));
                }
              }}
            />
            <div
              className="rounded-full p-2 bg-[#272727] cursor-pointer"
              onClick={togglePlay}
            >
              {isPlaying ? <PauseSongIcon /> : <PlayAudioIcon />}
            </div>
          </div>
          <button
            className="rounded-full px-4 py-2 border-[1px] border-[#0cdee4] hover:bg-[#242424] transition-all duration-300 w-full md:w-auto
      text-sm font-bold text-white"
          >
            {"Collect"}
          </button>
        </div>
      </div>
    </div>
  );
};
