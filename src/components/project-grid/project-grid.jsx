"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const ProjectGrid = ({ project, router }) => {
  const [videoHover, setVideoHover] = useState(null);

  return (
    <motion.div
      className="h-[100px] cursor-pointer"
      onMouseEnter={() => setVideoHover(true)}
      onMouseLeave={() => setVideoHover(false)}
      onClick={() => {
        router.push("/projects/" + project.id);
      }}
    >
      <ul className="flex flex-col items-start justify-start mix-blend-exclusion ">
        <li className="normal-txt">{project.index}</li>
        <li className="normal-txt">{project.title}</li>
        <li className="normal-txt">{project.author}</li>
        <li className="normal-txt">{project.category}</li>
        <li className="normal-txt">{project.camera}</li>
      </ul>

      {videoHover && (
        <div className="absolute w-screen h-screen inset-0 pointer-events-none z-[-1]">
          <video
            src={project.video}
            width={1000}
            height={1000}
            className="size-full object-cover brightness-75"
            autoPlay
            muted
            loop
          />
        </div>
      )}
    </motion.div>
  );
};
export default ProjectGrid;
