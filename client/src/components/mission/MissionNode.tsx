import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface MissionNodeProps {
  number: number;
  x: number;
  y: number;
  unlocked: boolean;
}

export default function MissionNode({
  number,
  x,
  y,
  unlocked,
}: MissionNodeProps) {

  return (

    <div
      className="absolute z-20"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >

      <motion.div

        whileHover={{
          scale:1.12,
        }}

        className="
        relative
        w-[72px]
        h-[72px]
        flex
        items-center
        justify-center
        "

      >


        {/* rotating ring */}

        {unlocked && (

          <motion.div

            animate={{
              rotate:360,
            }}

            transition={{
              duration:8,
              repeat:Infinity,
              ease:"linear",
            }}

            className="
            absolute
            inset-0
            rounded-full
            border-2
            border-dashed
            border-cyan-300/80
            "

          />

        )}



        {/* glow */}

        <div
          className={`
          absolute
          inset-1
          rounded-full
          blur-xl

          ${
            unlocked
            ?
            "bg-cyan-400/50"
            :
            "bg-cyan-900/20"
          }

          `}
        />



        {/* body */}

        <div
          className={`
          relative

          w-[58px]
          h-[58px]

          rounded-full

          flex
          items-center
          justify-center

          border-2

          backdrop-blur-xl

          ${
            unlocked
            ?
            `
            bg-cyan-400/25
            border-cyan-200
            shadow-[0_0_25px_#22d3ee]
            `
            :
            `
            bg-black/70
            border-cyan-700/60
            shadow-[0_0_15px_rgba(34,211,238,0.3)]
            `
          }

          `}
        >


          {/* inner ring */}

          <div
            className="
            absolute
            inset-2
            rounded-full
            border
            border-cyan-300/40
            "
          />


          {
            unlocked
            ?
            (
              <span
                className="
                text-xl
                font-black
                text-white
                drop-shadow-[0_0_8px_#22d3ee]
                "
              >
                {number.toString().padStart(2,"0")}
              </span>
            )
            :
            (
              <Lock
                size={22}
                className="
                text-cyan-300
                drop-shadow-[0_0_8px_#22d3ee]
                "
              />
            )
          }


        </div>


      </motion.div>

    </div>

  );
}