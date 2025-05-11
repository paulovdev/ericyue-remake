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

const Details = ({ setDetailsVisible }) => {
  return (
    <>
      <div className="fixed bottom-0 left-0 px-5 pb-12 z-[100]">
        <ul>
          <li className="normal-txt">Writer & Director: Jane Schoenbrun </li>
          <li className="normal-txt">2024 | 100 min</li>
          <li className="normal-txt">Distributed by A24</li>
          <li className="normal-txt">Official Selection:</li>
          <li className="normal-txt">2024 Sundance Film Festival – Midnight</li>
          <li className="normal-txt">
            2024 Berlin International Film Festival
          </li>
          <li className="normal-txt">2024 SXSW Film Festival</li>
        </ul>
      </div>
      <div
        className="fixed inset-0 w-screen h-screen bg-[#16161683] backdrop-blur-lg z-40"
        onClick={() => setDetailsVisible(false)}
      />
    </>
  );
};

const ProjectsDetail = () => {
  const { slug } = useParams();
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
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

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [setIsPlaying]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!project) {
    return <div>Nothing to show at the moment.</div>;
  }

  return (
    <>
      <div>
        <header className="fixed top-0 right-0 w-full px-5 py-2 mix-blend-exclusion z-10 bg-black">
          <ul className="relative grid grid-cols-5 max-lg:grid-cols-2">
            <div className="flex items-center max-lg:gap-4">
              <a className="relative normal-txt max-lg:hidden">{videoTime}</a>
              <a className="normal-txt hidden max-lg:block">{project.index}</a>
              <a className="normal-txt hidden max-lg:block">{project.title}</a>
            </div>
            <a className="normal-txt max-lg:hidden">{project.title}</a>
            <a className="normal-txt">{project.author}</a>
            <a className="normal-txt max-lg:hidden">{project.category}</a>
            <a className="normal-txt max-lg:hidden">{project.camera}</a>
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

        <div className="fixed top-[35px] left-0 w-full h-[1px] bg-white-20 z-10 max-lg:bg-[#00000031]">
          <div
            className="h-full bg-white transition-all duration-200 ease-linear max-lg:bg-black"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <section
          className="fixed top-0 flex justify-center items-center w-full h-full cursor-none max-lg:cursor-default"
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
            muted={isMuted}
            className="w-full h-auto"
          />
        </section>

        <footer className="fixed bottom-0 right-0 w-full px-5 py-3 mix-blend-exclusion z-50 bg-black">
          <ul className="relative flex justify-between">
            <div className="flex items-center max-lg:gap-4">
              <button
                className="normal-txt"
                onClick={() => setDetailsVisible(true)}
              >
                DETAILS
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="normal-txt" onClick={toggleFullscreen}>
                Fullscreen
              </button>
              <button className="normal-txt" onClick={toggleMute}>
                {isMuted ? "Unmute" : "Mute"}
              </button>
            </div>
          </ul>
        </footer>
      </div>
      {detailsVisible && <Details setDetailsVisible={setDetailsVisible} />}
    </>
  );
};

export default ProjectsDetail;
