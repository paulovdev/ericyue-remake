"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
const Template = ({ children }) => {
  const opacityAnimation = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.42, 1, 0.74, 1],
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.42, 1, 0.74, 1],
      },
    },
  };
  const pathname = usePathname();
  return (
    <AnimatePresence>
      <motion.div
        variants={opacityAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        key={pathname}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Template;
