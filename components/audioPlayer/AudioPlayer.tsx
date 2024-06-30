import * as Progress from '@radix-ui/react-progress';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';

type AudioPlayerProps = {
  audioSrc: string;
  coverImage?: string;
  title?: string;
  audioTitle?: string;
};

const AudioPlayer = ({
  audioSrc,
  coverImage,
  title,
  audioTitle,
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(audioSrc ? 0 : 1);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
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

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (
          audioRef.current &&
          audioRef.current.currentTime < audioRef.current.duration
        ) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="flex flex-row sm:py-10 gap-6 md:gap-12 items-start md:items-center p-4 bg-white-200 dark:bg-black-800 rounded-lg shadow-md">
      <div className="flex justify-start xs:ml-5 md:ml-0 relative space-x-4 w-2/5">
        <div
          className={`z-10 rounded-lg relative top-2 md:top-0 size-12 xs:size-16 sm:size-20 md:size-28 lg:size-36 ${isPlaying && audioSrc && 'animate-bounce'}`}>
          <Image
            src={coverImage || '/assets/images/post-example.svg'}
            alt="avatar"
            width={150}
            height={150}
          />
        </div>
        <div className="absolute size-12 xs:size-16 sm:size-20 md:size-24 lg:size-32 top-3/4 md:top-1/2 sm:left-[30px] md:left-[100px] lg:left-[150px] transform md:-translate-x-1/2 md:-translate-y-1/2">
          <Image
            src="/assets/images/disk.png"
            alt="avatar"
            width={130}
            height={130}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold p4-regular !text-[10px] md:!tex-[12px] !text-wrap !break-words !overflow-wrap overflow-hidden">
            {title}
          </h2>
          <p className="p1-bold !text-[14px] !text-wrap !break-words !overflow-wrap overflow-hidden">
            {audioTitle}
          </p>
          <div className="w-full flex justify-between items-center gap-1 md:gap-2 mt-4">
            <Progress.Root
              value={progress}
              max={100}
              className="relative h-2 w-2/3 md:w-4/5 bg-white-300/40 dark:bg-black-700 rounded-lg">
              <Progress.Indicator
                className={`h-full ${isPlaying && audioSrc ? 'bg-primary-500' : 'dark:bg-black-700'} rounded-lg`}
                style={{ width: `${progress}%` }}
              />
            </Progress.Root>
            <audio
              ref={audioRef}
              src={audioSrc}
              className="absolute inset-0 opacity-0"></audio>
            <span className="md:text-[14px] !text-[10px] text-gray-600 dark:text-gray-400">
              {formatTime(currentTime)}
            </span>
            <span className="text-white-400">|</span>
            <span className="md:text-[14px] !text-[10px] text-gray-600 dark:text-gray-400">
              {formatTime(duration)}
            </span>
          </div>
          <Button
            type="button"
            onClick={togglePlay}
            className="flex !w-full mt-4 md:!w-28 bg-primary-500 !text-[14px] !text-white-100 hover:bg-purple-600 duration-300 text-white py-2 px-4 rounded-lg">
            {isPlaying ? (
              <Image
                src={'/assets/icons/pause.svg'}
                alt="pause"
                width={14}
                height={14}
                className="!transform !rotate-180 invert"
              />
            ) : (
              <Image
                src={'/assets/icons/play.svg'}
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
