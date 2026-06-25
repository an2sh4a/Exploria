import background from "../assets/images/home/hero-background.avif";

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* Background */}

      <img
        src={background}
        alt="Exploria"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/55" />

      {/* Blue Glow */}

      <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/60 via-transparent to-transparent" />

      {/* Hero Content */}

      <div className="relative z-10 flex h-full items-center">

        <div className="max-w-xl ml-24">

          <p className="text-cyan-300 uppercase tracking-[0.4em] text-sm mb-4">
            Interactive Academic Escape Room
          </p>

          <h1 className="text-7xl font-black text-white leading-none">
            EXPLORIA
          </h1>

          <p className="mt-6 text-xl text-zinc-300 leading-8">
            Escape. Learn. Conquer.
          </p>

          <p className="mt-4 text-zinc-400 leading-7">
            Every room hides knowledge.
            Every clue unlocks understanding.
            Every puzzle takes you one step closer to escaping.
          </p>

          <button
            className="
              mt-10
              px-8
              py-4
              rounded-xl
              border
              border-cyan-400
              bg-cyan-500/10
              text-cyan-300
              font-semibold
              backdrop-blur-md
              hover:bg-cyan-400
              hover:text-black
              transition-all
              duration-300
              hover:shadow-[0_0_30px_#22d3ee]
            "
          >
            INITIALIZE MISSION →
          </button>

        </div>

      </div>

    </div>
  );
}