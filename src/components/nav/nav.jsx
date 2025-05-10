"use client";
import { useRouter } from "next/navigation";
import React from "react";


const Nav = () => {
  const router = useRouter();
  return (
    <nav className="fixed bottom-0 w-full py-3 px-5 flex items-center justify-between mix-blend-exclusion">
      <a
        className="normal-txt uppercase cursor-pointer select-none"
        onClick={() => {
          router.push("/");
        }}
      >
        ERIC K. YUE
      </a>
      <a
        className="normal-txt uppercase cursor-pointer select-none"
        onClick={() => {
          router.push("/info");
        }}
      >
        INFO
      </a>
    </nav>
  );
};

export default Nav;
