import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import SecurityAI from "./SecurityAI";
import { useAudio } from "../../../contexts/AudioContext";

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
  const { playSound } = useAudio();
  const [step, setStep] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    if (!open) {
      setStep(0);
      setDisplayedText("");
      return;
    }
    setStep(0);
    setDisplayedText("");
    playSound("interface", 0.45);
    const timer = window.setTimeout(() => {
      setStep(1);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [open, playSound]);
  useEffect(() => {
    if (!open || step === 0) return;
    const texts = [
      `I've detected an active ${concept} structure inside this system.`,
      description,
      "Your task is simple: understand the structure, then use it to recover the evidence."
    ];
    const text = texts[step - 1] ?? texts[texts.length - 1];
    setDisplayedText("");
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setDisplayedText(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(interval);
        if (step < 3) {
          window.setTimeout(() => {
            setStep((current) => current + 1);
          }, 900);
        }
      }
    }, 22);
    return () => window.clearInterval(interval);
  }, [open, step, concept, description]);
  useEffect(() => {
    if (!open || step === 0) return;
    const soundTimer = window.setInterval(() => {
      playSound("click", 0.12);
    }, 900);
    return () => window.clearInterval(soundTimer);
  }, [open, step, playSound]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] overflow-hidden bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(168,85,247,0.20),transparent_34%)]"
          />
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="absolute left-8 top-8 text-[9px] tracking-[0.35em] text-purple-300/70">
              CYBER INVESTIGATION // SECURE CHANNEL
            </div>
            <div className="absolute right-8 top-8 text-[9px] tracking-[0.3em] text-pink-300/70">
              {subtitle}
            </div>
            <div className="flex w-full max-w-[1150px] flex-col items-center gap-8 px-8 md:flex-row md:gap-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.75, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative flex w-full items-center justify-center md:w-[40%]"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.15, 0.4, 0.15],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"
                />
                <motion.div
                  animate={{
                    y: [-3, 3, -3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <SecurityAI size="large" />
                </motion.div>
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                  }}
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.3em] text-pink-300"
                >
                  AI TRANSMISSION
                </motion.div>
              </motion.div>
              <div className="w-full max-w-[650px] md:w-[60%]">
                <motion.div
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.45 }}
                  className="mb-5"
                >
                  <p className="text-[10px] font-semibold tracking-[0.4em] text-pink-300">
                    SECURITY AI
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-white md:text-4xl">
                    {title}
                  </h2>
                </motion.div>
                <div className="relative min-h-[190px]">
                  <AnimatePresence mode="wait">
                    {step === 0 ? (
                      <motion.div
                        key="connecting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 text-sm text-purple-200"
                      >
                        <motion.span
                          animate={{
                            opacity: [0.2, 1, 0.2],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                          }}
                          className="h-2 w-2 rounded-full bg-pink-300 shadow-[0_0_12px_#f472b6]"
                        />
                        Establishing secure neural link...
                      </motion.div>
                    ) : (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <span className="text-[10px] font-semibold tracking-[0.25em] text-pink-300">
                            AI
                          </span>
                          <div className="flex gap-1">
                            <motion.span
                              animate={{ height: [4, 12, 4] }}
                              transition={{
                                duration: 0.7,
                                repeat: Infinity,
                              }}
                              className="w-1 rounded-full bg-purple-300"
                            />
                            <motion.span
                              animate={{ height: [8, 16, 8] }}
                              transition={{
                                duration: 0.7,
                                delay: 0.15,
                                repeat: Infinity,
                              }}
                              className="w-1 rounded-full bg-pink-300"
                            />
                            <motion.span
                              animate={{ height: [5, 13, 5] }}
                              transition={{
                                duration: 0.7,
                                delay: 0.3,
                                repeat: Infinity,
                              }}
                              className="w-1 rounded-full bg-amber-300"
                            />
                          </div>
                          <span className="text-[9px] tracking-[0.2em] text-zinc-600">
                            TRANSMITTING
                          </span>
                        </div>
                        <p className="text-lg leading-8 text-zinc-200 md:text-xl">
                          {displayedText}
                          <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                            }}
                            className="ml-1 text-pink-300"
                          >
                            ▌
                          </motion.span>
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-6"
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <div className="h-px flex-1 bg-purple-400/15" />
                      <span className="text-[9px] tracking-[0.3em] text-purple-300">
                        {concept.toUpperCase()}
                      </span>
                      <div className="h-px flex-1 bg-purple-400/15" />
                    </div>
                    <motion.button
                      onClick={() => {
                        playSound("click", 0.65);
                        onEnter();
                      }}
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="w-full rounded-xl border border-pink-300/40 bg-pink-500/10 py-3.5 text-sm font-bold tracking-[0.22em] text-white shadow-[0_0_25px_rgba(244,114,182,0.12)] transition hover:border-pink-300/70 hover:bg-pink-500/20"
                    >
                      ENTER PUZZLE
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}