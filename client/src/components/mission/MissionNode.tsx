import { motion } from "framer-motion";

interface MissionNodeProps {
  number: number;
  status: "completed" | "current" | "locked";
}

export default function MissionNode({
  number,
  status,
}: MissionNodeProps) {

  const styles = {
    completed:
      "bg-green-500 border-green-300 shadow-[0_0_30px_#22c55e]",

    current:
      "bg-gradient-to-br from-purple-500 to-pink-500 border-pink-300 shadow-[0_0_40px_#ec4899]",

    locked:
      "bg-black/70 border-zinc-600 text-zinc-500",
  };

  return (

    <motion.div
      whileHover={{
        scale: status !== "locked" ? 1.15 : 1,
      }}

      animate={
        status === "current"
          ? {
              scale: [1, 1.08, 1],
            }
          : {}
      }

      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}

      className={`
        relative
        w-20
        h-20
        rounded-full
        border-2
        flex
        items-center
        justify-center
        font-black
        text-2xl
        cursor-pointer
        backdrop-blur-md
        ${styles[status]}
      `}
    >

      {status === "locked" ? (
        <span>
          🔒
        </span>
      ) : (

        <span className="text-white">
          {number.toString().padStart(2, "0")}
        </span>

      )}

    </motion.div>

  );
}