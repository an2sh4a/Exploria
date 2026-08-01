import { motion } from "framer-motion";

interface HotspotProps {
  id: string;

  top: string;
  left: string;

  width: string;
  height: string;

  visible?: boolean;

  onClick: () => void;
}

export default function Hotspot({
  id,
  top,
  left,
  width,
  height,
  visible = false,
  onClick,
}: HotspotProps) {
  return (
    <motion.button
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.2,
      }}
      onClick={onClick}
      className="
        absolute
        z-20
        cursor-pointer
        rounded-lg
      "
      style={{
        top,
        left,
        width,
        height,
      }}
    >
      {visible && (
        <>
          {/* Glow */}

          <div
            className="
              absolute
              inset-0

              rounded-lg

              border-2
              border-cyan-300

              bg-cyan-400/10

              shadow-[0_0_18px_rgba(34,211,238,0.7)]
            "
          />

          {/* Label */}

          <div
            className="
              absolute

              -top-7
              left-1/2

              -translate-x-1/2

              whitespace-nowrap

              rounded-md

              bg-black/80

              px-2
              py-1

              text-[10px]

              tracking-widest

              text-cyan-300
            "
          >
            {id.toUpperCase()}
          </div>
        </>
      )}
    </motion.button>
  );
}