import { motion } from "framer-motion";

export default function MissionPathLine() {
  return (
    <svg
      className="
        absolute
        inset-0
        w-full
        h-full
        z-10
        pointer-events-none
      "
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >

      {/* Glow underneath */}

      <path
        d="
        M 35 85
        C 55 80, 65 75, 55 65
        C 45 55, 35 55, 45 45
        C 60 35, 70 35, 60 25
        C 50 15, 45 10, 55 5
        "
        fill="none"
        stroke="#22d3ee"
        strokeWidth="1.5"
        opacity="0.25"
        filter="blur(2px)"
      />


      {/* Main animated path */}

      <motion.path
        d="
        M 35 85
        C 55 80, 65 75, 55 65
        C 45 55, 35 55, 45 45
        C 60 35, 70 35, 60 25
        C 50 15, 45 10, 55 5
        "

        fill="none"

        stroke="#67e8f9"

        strokeWidth="0.6"

        strokeLinecap="round"

        strokeDasharray="3 3"

        animate={{
          strokeDashoffset: [20, 0],
        }}

        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />


    </svg>
  );
}