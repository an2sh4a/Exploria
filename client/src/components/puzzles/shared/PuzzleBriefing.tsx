import { AnimatePresence, motion } from "framer-motion";
import SecurityAI from "./SecurityAI";

interface PuzzleBriefingProps {
  open: boolean;
  title: string;
  subtitle: string;
  concept: string;
  description: string;
  onEnter: () => void;
}

export default function PuzzleBriefing({
  open,
  title,
  subtitle,
  concept,
  description,
  onEnter,
}: PuzzleBriefingProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.3 }}
            className="relative flex min-h-[480px] w-[92vw] max-w-[1050px] overflow-hidden rounded-3xl border border-purple-400/20 bg-[#05060c] shadow-[0_0_80px_rgba(168,85,247,0.15)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(168,85,247,0.12),transparent_35%),radial-gradient(circle_at_80%_25%,rgba(244,114,182,0.08),transparent_30%)]" />
            <div className="relative flex w-full flex-col md:flex-row">
              <div className="flex w-full items-center justify-center border-b border-purple-400/10 p-8 md:w-[38%] md:border-b-0 md:border-r">
                <div className="flex flex-col items-center">
                  <p className="mb-6 text-[10px] font-semibold tracking-[0.35em] text-pink-300">
                    SECURITY AI
                  </p>
                  <SecurityAI size="large" />
                  <motion.p
                    animate={{ opacity: [0.35, 0.9, 0.35] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-6 text-[9px] tracking-[0.3em] text-purple-300"
                  >
                    ANALYSIS ACTIVE
                  </motion.p>
                </div>
              </div>
              <div className="relative flex flex-1 flex-col justify-center p-8 md:p-12">
                <p className="text-[10px] font-semibold tracking-[0.35em] text-pink-300">
                  PUZZLE BRIEFING
                </p>
                <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">
                  {title}
                </h2>
                <p className="mt-2 text-xs tracking-[0.2em] text-purple-300">
                  {subtitle}
                </p>
                <div className="mt-8 rounded-2xl border border-purple-400/15 bg-purple-500/[0.05] p-5">
                  <p className="text-[9px] font-semibold tracking-[0.3em] text-zinc-500">
                    CONCEPT DETECTED
                  </p>
                  <p className="mt-2 text-xl font-bold text-white">
                    {concept}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-zinc-300">
                    {description}
                  </p>
                </div>
                <motion.button
                  onClick={onEnter}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 w-full rounded-xl border border-pink-300/40 bg-pink-500/10 py-3.5 text-sm font-bold tracking-[0.2em] text-white shadow-[0_0_24px_rgba(244,114,182,0.1)] transition hover:border-pink-300/70 hover:bg-pink-500/20"
                >
                  ENTER PUZZLE
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}