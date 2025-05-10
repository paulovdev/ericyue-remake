"use client";
import {
  AnimatePresence,
  motion,
  useMotionValue,
} from "framer-motion";
import { useEffect } from "react";
import { useCursorStore, usePlayingVideoStore } from "@/store/zustand";
import { useMedia } from "react-use";

export const Cursor = () => {
  const { cursorVariant } = useCursorStore();
  const { isPlaying } = usePlayingVideoStore();
  const isTablet = useMedia("(max-width: 992px)");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const manageMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, []);

  return (
    <>
      {!isTablet && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[200]"
          style={{ x: mouseX, y: mouseY }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              className="size-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.1 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              key={cursorVariant}
            >
              {cursorVariant === "default" && <div className="hidden"></div>}
              {cursorVariant === "projectHero" && (
                <p className="normal-txt uppercase">view</p>
              )}
              {cursorVariant === "playVideo" && (
                <p className="normal-txt uppercase">
                  {isPlaying ? "PLAY" : "PAUSE"}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
};
