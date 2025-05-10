"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const ProjectList = ({ project, router }) => {
  const [hoverVideo, setHoverVideo] = useState(false);

  const opacityAnimation = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <div
      className="relative w-full px-4"
      onMouseEnter={() => setHoverVideo(true)}
      onMouseLeave={() => setHoverVideo(false)}
      onClick={() => {
        router.push("/projects/" + project.id);
      }}
    >
      <ul className="relative grid grid-cols-5 group">
        <div className="flex items-center">
          <a className="relative normal-txt !text-black group-hover:opacity-50 transition-all">
            {project.index}
          </a>
          <AnimatePresence>
            {hoverVideo && project.video && (
              <motion.div
                className="absolute w-full px-12 mix-blend-unset pointer-events-none"
                variants={opacityAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <video
                  src={project.video}
                  className="absolute -top-5 w-[300px] h-[200px]"
                  autoPlay
                  loop
                  muted
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <a className="normal-txt !text-black group-hover:opacity-50 transition-all">
          {project.title}
        </a>
        <a className="normal-txt !text-black group-hover:opacity-50 transition-all">
          {project.author}
        </a>
        <a className="normal-txt !text-black group-hover:opacity-50 transition-all">
          {project.category}
        </a>
        <a className="normal-txt !text-black group-hover:opacity-50 transition-all">
          {project.camera}
        </a>
      </ul>
    </div>
  );
};
export default ProjectList;
