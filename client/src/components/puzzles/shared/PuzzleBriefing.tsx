import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import SecurityAI from "./SecurityAI";
import { useAudio } from "../../../contexts/AudioContext";
import monitor1 from "../../../assets/audio/ai/monitor-1.mp3";
import monitor2 from "../../../assets/audio/ai/monitor-2.mp3";
import monitor3 from "../../../assets/audio/ai/monitor-3.mp3";
import laptop1 from "../../../assets/audio/ai/laptop-1.mp3";
import laptop2 from "../../../assets/audio/ai/laptop-2.mp3";
import laptop3 from "../../../assets/audio/ai/laptop-3.mp3";

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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);

  const isMonitor = title === "Command Buffer";
  const isLaptop = title === "Packet Queue";
  const useGeneratedVoice = isMonitor || isLaptop;

  const dialogue = useMemo(() => {
    if (isMonitor) {
      return [
        "Investigator, I've detected a Stack structure in this terminal.",
        "The last command placed is the first one you can retrieve.",
        "Work from the top, recover the commands, and secure the evidence.",
      ];
    }

    if (isLaptop) {
      return [
        "I've detected a Queue handling network packets.",
        "The first packet to enter is the first packet processed.",
        "Watch the front and rear, then recover the evidence.",
      ];
    }

    if (title === "Linked Access") {
      return [
        "This terminal contains a chain of connected data nodes.",
        "Each node points to the next, forming a Linked List.",
        "Follow the links from the head and recover the missing connection.",
      ];
    }

    return [
      "The archive contains a hidden piece of evidence.",
      "The records are sorted, so the search can be narrowed step by step.",
      "Use the middle record, eliminate half the search, and locate the target.",
    ];
  }, [isMonitor, isLaptop, title]);

  const voiceFiles = useMemo(() => {
    if (isMonitor) {
      return [monitor1, monitor2, monitor3];
    }

    if (isLaptop) {
      return [laptop1, laptop2, laptop3];
    }

    return [];
  }, [isMonitor, isLaptop]);

  useEffect(() => {
    if (!open) {
      setStep(0);
      setDisplayedText("");

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      speechRef.current = null;

      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      return;
    }

    setStep(0);
    setDisplayedText("");
    playSound("interface", 0.45);

    timerRef.current = window.setTimeout(() => {
      setStep(1);
    }, 700);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      speechRef.current = null;
    };
  }, [open, playSound]);

  useEffect(() => {
    if (!open || step === 0) {
      return;
    }

    const text = dialogue[step - 1];

    if (!text) {
      return;
    }

    setDisplayedText("");

    let characterIndex = 0;

    const typingInterval = window.setInterval(() => {
      characterIndex += 1;
      setDisplayedText(text.slice(0, characterIndex));

      if (characterIndex >= text.length) {
        window.clearInterval(typingInterval);
      }
    }, 22);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    speechRef.current = null;

    const moveToNextStep = () => {
      if (step < dialogue.length) {
        timerRef.current = window.setTimeout(() => {
          setStep((current) => current + 1);
        }, 450);
      }
    };

    if (useGeneratedVoice) {
      const voiceSource = voiceFiles[step - 1];

      if (!voiceSource) {
        return () => {
          window.clearInterval(typingInterval);
        };
      }

      const audio = new Audio(voiceSource);
      audio.preload = "auto";
      audio.volume = 1;
      audioRef.current = audio;

      const handleEnded = () => {
        moveToNextStep();
      };

      audio.addEventListener("ended", handleEnded);

      void audio.play().catch((error) => {
        console.error("AI voice playback failed:", error);
      });

      return () => {
        window.clearInterval(typingInterval);
        audio.removeEventListener("ended", handleEnded);

        if (audioRef.current === audio) {
          audio.pause();
          audio.currentTime = 0;
          audioRef.current = null;
        }
      };
    }

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 0.82;
      utterance.volume = 0.85;

      const voices = window.speechSynthesis.getVoices();

      const preferredVoice =
        voices.find((voice) =>
          /Microsoft|Google|Daniel|Alex|Samantha/i.test(
            voice.name
          )
        ) ??
        voices.find((voice) =>
          /^en(-|_)/i.test(voice.lang)
        );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = moveToNextStep;
      utterance.onerror = () => {
        if (step < dialogue.length) {
          timerRef.current = window.setTimeout(() => {
            setStep((current) => current + 1);
          }, Math.max(text.length * 25, 2200));
        }
      };

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      timerRef.current = window.setTimeout(
        moveToNextStep,
        Math.max(text.length * 25, 2200)
      );
    }

    return () => {
      window.clearInterval(typingInterval);

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      speechRef.current = null;
    };
  }, [open, step, dialogue, voiceFiles, useGeneratedVoice]);

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
                  animate={{ y: [-3, 3, -3] }}
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
                          animate={{ opacity: [0.2, 1, 0.2] }}
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
                          <div className="flex items-center gap-1">
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
                        if (audioRef.current) {
                          audioRef.current.pause();
                          audioRef.current.currentTime = 0;
                          audioRef.current = null;
                        }

                        if ("speechSynthesis" in window) {
                          window.speechSynthesis.cancel();
                        }

                        speechRef.current = null;
                        playSound("click", 0.65);
                        onEnter();
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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