import React, { useRef, useEffect } from "react";

type propType = {
  isPlaying: boolean;
  sound: any;
};

const PlayerTimeline = ({ isPlaying, sound }: propType) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const playheadTrailRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const setPlayerheadPosition = (pos: number) => {
    if (isNaN(pos)) pos = 0;

    if (playheadRef.current && playheadTrailRef.current) {
      playheadRef.current.style.left = `${pos}%`;
      playheadTrailRef.current.style.width = `${pos}%`;
    }
  };

  const handleTimelineClick = (e: any) => {
    const timelineWidth = timelineRef.current?.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const duration = sound?.duration();

    if (timelineWidth && duration) {
      const completePercentage = (offset / timelineWidth) * 100;
      sound?.seek((completePercentage / 100) * duration);
      setPlayerheadPosition(completePercentage);
      // setSongCurrTime(getFormattedTime((completePercentage / 100) * duration));
    }
  };

  const handlePlayheadPositionOnPlaying = () => {
    const currTime = sound?.seek();
    const duration = sound?.duration();

    if (currTime && duration) {
      const completePercentage = (currTime / duration) * 100;
      setPlayerheadPosition(completePercentage);

      // if (currTime) setSongCurrTime(getFormattedTime(currTime));
    }

    animationRef.current = requestAnimationFrame(
      handlePlayheadPositionOnPlaying
    );
  };

  useEffect(() => {
    if (isPlaying) {
      if (!animationRef.current)
        animationRef.current = requestAnimationFrame(
          handlePlayheadPositionOnPlaying
        );
      else {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(
          handlePlayheadPositionOnPlaying
        );
      }
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  }, [isPlaying]);

  return (
    <div
      className="w-full bg-white h-0.5 absolute top-0 -translate-y-full rounded-full cursor-pointer"
      ref={timelineRef}
      onClick={handleTimelineClick}
    >
      <div className="h-full w-0 bg-[#22c55e]" ref={playheadTrailRef} />
      <div
        className="h-2 w-2 rounded-full absolute bg-white -translate-y-1/2 top-1/2"
        ref={playheadRef}
      />
    </div>
  );
};

export default PlayerTimeline;
