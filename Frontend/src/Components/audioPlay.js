import React, { useRef, useEffect, useState } from "react";
import { useVoiceStore } from "../Store/getVoice";

export default function AudioPlay({ play ,setPlay}) {
  const { audioUrl } = useVoiceStore();
  const audioRef = useRef(null);

  const [progress, setProgress] = useState(0); // % played
  const [duration, setDuration] = useState(0); // total seconds

  // Auto-play when audioUrl changes
  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.load();
      audioRef.current.play().catch((err) => {
        console.log("Autoplay blocked, waiting for user action:", err);
      });
    }
  }, [audioUrl]);

  // Play/pause when `play` prop changes
  useEffect(() => {
    if (!audioRef.current) return;
    if (play) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [play]);

  // Smooth progress updater
  useEffect(() => {
    let frameId;

    const updateProgress = () => {
      if (audioRef.current && audioRef.current.duration) {
        const current = audioRef.current.currentTime;
        const total = audioRef.current.duration;
        setDuration(total);
        setProgress((current / total) * 100);
        if(current >= total) {
            // Audio ended
            setProgress(0);
            audioRef.current.currentTime = 0;
            setPlay(false);
        }
      }
      frameId = requestAnimationFrame(updateProgress);
    };

    frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, []);

    

  if (!audioUrl) {
    return <p className="text-gray-500">No audio selected</p>;
  }

  return (
    <div className="w-full mt-2">
      {/* Hidden audio element */}
      <audio ref={audioRef} className="hidden">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Thin progress bar */}
      <div className="w-full h-[1px] bg-gray-300 rounded">
        <div
          className="h-full bg-black rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
