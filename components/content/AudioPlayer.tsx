import PauseIcon from '../icons/Pause';
import { Button } from '../ui/button';

import * as Progress from '@radix-ui/react-progress';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// ----------------------------------------------------------------

interface IAudioPlayerProps {
  audioSrc: string;
  coverImage: string | null;
  title?: string;
  audioTitle?: string;
}

const AudioPlayer: React.FC<IAudioPlayerProps> = ({
  audioSrc,
  coverImage,
  title,
  audioTitle,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(audioSrc ? 0 : 1);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateDuration = () => setDuration(audio.duration);
      const updateTime = () => setCurrentTime(audio.currentTime);

      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('timeupdate', updateTime);

      return () => {
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('timeupdate', updateTime);
      };
    }
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="bg-white-200 dark:bg-black-800 flex flex-row items-start gap-6 rounded-lg p-4 shadow-md sm:py-10 md:items-center md:gap-12">
      <div className="xs:ml-5 relative flex w-2/5 justify-start space-x-4 md:ml-0">
        <div
          className={`xs:size-16 relative top-2 z-10 size-12 rounded-lg sm:size-20 md:top-0 md:size-28 lg:size-36 ${isPlaying && audioSrc && 'animate-bounce'}`}
        >
          <Image
            src={coverImage || '/assets/icons/image-preview.svg'}
            alt="avatar"
            width={150}
            height={150}
            className="rounded-lg"
          />
        </div>
        <div className="xs:size-16 absolute top-3/4 size-12 sm:left-[30px] sm:size-20 md:left-[100px] md:top-1/2 md:size-24 md:-translate-x-1/2 md:-translate-y-1/2 lg:left-[150px] lg:size-32">
          <Image
            src="/assets/images/disk.svg"
            alt="avatar"
            width={130}
            height={130}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col">
          <h2 className="p4-regular !overflow-wrap overflow-hidden !text-wrap !break-words !text-[10px] font-semibold md:!text-[12px]">
            {title}
          </h2>
          <p className="p1-bold !overflow-wrap overflow-hidden !text-wrap !break-words !text-[14px]">
            {audioTitle}
          </p>
          <div className="mt-4 flex w-full items-center justify-between gap-1 md:gap-2">
            <Progress.Root
              value={progress}
              max={100}
              className="bg-white-300/40 dark:bg-black-700 relative h-2 w-2/3 rounded-lg md:w-4/5"
            >
              <Progress.Indicator
                className={`h-full ${isPlaying && audioSrc ? 'bg-primary-500' : 'dark:bg-black-700'} rounded-lg`}
                style={{ width: `${progress}%` }}
              />
            </Progress.Root>
            <audio
              ref={audioRef}
              src={audioSrc}
              className="absolute inset-0 opacity-0"
            ></audio>
            <span className="!text-[10px] text-gray-600 md:text-sm dark:text-gray-400">
              {formatTime(currentTime)}
            </span>
            <span className="text-white-400">|</span>
            <span className="!text-[10px] text-gray-600 md:text-sm dark:text-gray-400">
              {formatTime(duration)}
            </span>
          </div>
          <Button
            type="button"
            onClick={togglePlay}
            className="bg-primary-500 !text-white-100 mt-4 flex w-full rounded-lg px-4 py-2 text-sm text-white duration-300 hover:bg-purple-600 md:!w-28"
          >
            {isPlaying ? (
              <PauseIcon />
            ) : (
              <Image
                src="/assets/icons/play.svg"
                alt="play"
                width={14}
                height={14}
              />
            )}
            <p className="text-nowrap">{isPlaying ? 'Pause' : 'Play now'}</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
