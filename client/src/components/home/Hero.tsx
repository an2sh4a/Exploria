import { motion } from "framer-motion";
import background from "../../assets/images/home/hero-background.avif";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background */}

    <motion.img
        src={background}
        alt="Exploria"
        initial={{ scale: 1 }}
        animate={{ scale: 1.12 }}
        transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
        }}
        className="absolute inset-0 w-full h-full object-cover"
    />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/55" />

      {/* Left Glow */}

      <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/70 via-black/20 to-transparent" />

      {/* Hero Content */}

      <div className="relative z-10 flex h-full items-center">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="ml-24 max-w-xl"
        >

          <p className="uppercase tracking-[0.35em] text-cyan-300 text-sm">
            Interactive Academic Escape Room
          </p>

          <h1 className="mt-4 text-8xl font-black text-white leading-none">
            EXPLORIA
          </h1>

          <p className="mt-6 text-2xl text-cyan-200">
            Escape. Learn. Conquer.
          </p>

          <p className="mt-5 text-zinc-300 leading-8 text-lg">
            Every clue uncovers knowledge.
            Every room transforms learning into an adventure.
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
              mt-12
              px-8
              py-4
              rounded-xl
              border
              border-cyan-400
              bg-cyan-500/10
              backdrop-blur-md
              text-cyan-200
              font-semibold
              text-lg
              hover:bg-cyan-400
              hover:text-black
              transition-all
              duration-300
              hover:shadow-[0_0_35px_#22d3ee]
            "
          >
            INITIALIZE MISSION →
          </motion.button>

        </motion.div>

      </div>

    </section>
  );
}