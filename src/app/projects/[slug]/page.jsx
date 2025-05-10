"use client";

import { useParams } from "next/navigation";
import projectsData from "@/data/projectsData";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { useMedia } from "react-use";
import { useCursorStore, usePlayingVideoStore } from "@/store/zustand";


const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h, m, s].map((unit) => String(unit).padStart(2, "0")).join(":");
};

const ProjectsDetail = () => {
  const { slug } = useParams();
  const project = projectsData.find((item) => item.id === String(slug));
  const router = useRouter();
  const isTablet = useMedia("(max-width: 992px)");
  const videoRef = useRef(null);
  const [videoTime, setVideoTime] = useState("00:00:00");
  const [progressPercent, setProgressPercent] = useState(0);
  const { handleMouseEnter, handleMouseLeave, handleClick } = useCursorStore();
  const { isPlaying, setIsPlaying } = usePlayingVideoStore();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setVideoTime(formatTime(video.currentTime));
      setProgressPercent((video.currentTime / video.duration) * 100);
    };

    video.addEventListener("timeupdate", updateTime);
    return () => {
      video.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    isPlaying ? video.pause() : video.play();
    setIsPlaying(!isPlaying);
  }, [isPlaying, setIsPlaying]);

  if (!project) {
    return <div>Nothing to show at the moment.</div>;
  }

  return (
    <div>
      <header className="fixed top-0 right-0 w-full px-5 py-2 mix-blend-exclusion z-50 bg-black">
        <ul className="relative grid grid-cols-5">
          <div className="flex items-center">
            <a className="relative normal-txt">{videoTime}</a>
          </div>
          <a className="normal-txt">{project.title}</a>
          <a className="normal-txt">{project.author}</a>
          <a className="normal-txt">{project.category}</a>
          <a className="normal-txt">{project.camera}</a>
        </ul>

        <div className="fixed top-0 right-0 px-5 py-2 flex justify-end">
          <button
            className="normal-txt uppercase cursor-pointer select-none"
            onClick={() => {
              router.back();
              handleClick();
            }}
          >
            CLOSE
          </button>
        </div>
      </header>

      <div className="fixed top-[35px] left-0 w-full h-[1px] bg-white-20 z-40">
        <div
          className="h-full bg-white transition-all duration-200 ease-linear"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <section
        className="fixed top-0 flex justify-center items-center w-full h-full cursor-none"
        onMouseEnter={
          !isTablet ? () => handleMouseEnter("playVideo") : undefined
        }
        onMouseLeave={!isTablet ? handleMouseLeave : undefined}
        onClick={togglePlayPause}
      >
        <video
          ref={videoRef}
          src={project.video}
          autoPlay
          loop
          className="w-full h-auto"
        />
      </section>
    </div>
  );
};

export default ProjectsDetail;
