import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

interface Props {
  onSolved: () => void;
}

type Command = {
  id: string;
  label: string;
  icon: string;
  color: string;
};

const INITIAL_COMMANDS: Command[] = [
  {
    id: "auth",
    label: "ADMIN AUTH",
    icon: "🔐",
    color: "violet",
  },
  {
    id: "access",
    label: "ACCESS DATABASE",
    icon: "🗄️",
    color: "cyan",
  },
  {
    id: "export",
    label: "EXPORT DATABASE",
    icon: "📦",
    color: "amber",
  },
  {
    id: "delete",
    label: "DELETE LOGS",
    icon: "🗑️",
    color: "rose",
  },
];

const CORRECT_SEQUENCE = [
  "auth",
  "access",
  "export",
  "delete",
];

function colorClasses(color: string) {
  const colors: Record<
    string,
    {
      border: string;
      glow: string;
      bg: string;
      text: string;
    }
  > = {
    violet: {
      border: "border-violet-400/60",
      glow: "shadow-[0_0_24px_rgba(167,139,250,0.35)]",
      bg: "bg-violet-500/10",
      text: "text-violet-200",
    },
    cyan: {
      border: "border-cyan-400/60",
      glow: "shadow-[0_0_24px_rgba(34,211,238,0.35)]",
      bg: "bg-cyan-500/10",
      text: "text-cyan-200",
    },
    amber: {
      border: "border-amber-400/60",
      glow: "shadow-[0_0_24px_rgba(251,191,36,0.35)]",
      bg: "bg-amber-500/10",
      text: "text-amber-200",
    },
    rose: {
      border: "border-rose-400/60",
      glow: "shadow-[0_0_24px_rgba(251,113,133,0.35)]",
      bg: "bg-rose-500/10",
      text: "text-rose-200",
    },
  };

  return colors[color] ?? colors.cyan;
}

export default function TerminalLogs({
  onSolved,
}: Props) {
  const [commands, setCommands] = useState<Command[]>(
    INITIAL_COMMANDS
  );

  const [recovered, setRecovered] = useState<Command[]>(
    []
  );

  const [timeline, setTimeline] = useState<Command[]>(
    []
  );

  const [phase, setPhase] = useState<
    "stack" | "timeline" | "complete"
  >("stack");

  const [message, setMessage] = useState(
    "The command buffer is corrupted. Recover the commands from the top."
  );

  const [wrongAttempt, setWrongAttempt] =
    useState(false);

  const [aiMood, setAiMood] = useState<
    "idle" | "thinking" | "happy" | "warning"
  >("idle");

  const topCommand = commands[commands.length - 1];

  const remainingCount = commands.length;

  const progress = useMemo(() => {
    if (phase === "complete") return 100;

    if (phase === "timeline") return 75;

    return Math.round(
      (recovered.length / INITIAL_COMMANDS.length) *
        50
    );
  }, [recovered.length, phase]);

  function extractCommand() {
    if (!topCommand) return;

    setAiMood("thinking");
    setMessage(
      `Extracting ${topCommand.label} from the command buffer...`
    );

    setTimeout(() => {
      setCommands((prev) =>
        prev.filter((command) => command.id !== topCommand.id)
      );

      setRecovered((prev) => [
        ...prev,
        topCommand,
      ]);

      setAiMood("idle");

      if (remainingCount === 1) {
        setTimeout(() => {
          setPhase("timeline");

          setMessage(
            "All fragments recovered. Reconstruct the original attack sequence."
          );
        }, 500);
      } else {
        setMessage(
          "Command recovered. The next available command is now at the top."
        );
      }
    }, 500);
  }

  function addToTimeline(command: Command) {
    if (timeline.some((item) => item.id === command.id)) {
      return;
    }

    const newTimeline = [
      ...timeline,
      command,
    ];

    setTimeline(newTimeline);
    setWrongAttempt(false);

    if (newTimeline.length === CORRECT_SEQUENCE.length) {
      const solved = newTimeline.every(
        (command, index) =>
          command.id === CORRECT_SEQUENCE[index]
      );

      if (solved) {
        setAiMood("happy");
        setMessage(
          "Attack sequence reconstructed. Evidence recovered."
        );

        setTimeout(() => {
          setPhase("complete");
        }, 900);
      } else {
        setAiMood("warning");
        setWrongAttempt(true);

        setMessage(
          "Sequence mismatch. The evidence does not fit this order."
        );

        setTimeout(() => {
          setTimeline([]);
          setAiMood("idle");
          setMessage(
            "Try again. Think about what must have happened first."
          );
        }, 1200);
      }
    }
  }

  function resetTimeline() {
    setTimeline([]);
    setWrongAttempt(false);
    setAiMood("idle");
    setMessage(
      "Reconstruct the attack sequence from the recovered commands."
    );
  }

  function finishMission() {
    onSolved();
  }

  return (
    <div className="relative flex h-full min-h-[560px] flex-col overflow-hidden rounded-2xl border border-cyan-400/30 bg-[#03070c] text-white">

      {/* Background atmosphere */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            opacity: [0.12, 0.22, 0.12],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="
            absolute
            -left-20
            top-20
            h-72
            w-72
            rounded-full
            bg-cyan-500/20
            blur-3xl
          "
        />

        <motion.div
          animate={{
            opacity: [0.08, 0.18, 0.08],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="
            absolute
            right-0
            top-0
            h-80
            w-80
            rounded-full
            bg-violet-500/15
            blur-3xl
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.04]
            [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)]
            [background-size:32px_32px]
          "
        />

      </div>

      {/* Header */}

      <div className="relative z-10 flex h-16 shrink-0 items-center justify-between border-b border-cyan-400/20 bg-black/40 px-6 backdrop-blur-md">

        <div className="flex items-center gap-3">

          <motion.div
            animate={{
              boxShadow: [
                "0 0 8px rgba(34,211,238,0.2)",
                "0 0 20px rgba(34,211,238,0.6)",
                "0 0 8px rgba(34,211,238,0.2)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-cyan-400/60
              bg-cyan-400/10
              text-lg
            "
          >
            ◈
          </motion.div>

          <div>
            <p className="text-sm font-bold tracking-[0.18em] text-cyan-200">
              SECURITY CORE
            </p>

            <p className="text-[10px] tracking-wider text-zinc-500">
              AUTH-SERVER-01
            </p>
          </div>

        </div>

        <div className="flex items-center gap-4">

          <div className="hidden text-right sm:block">
            <p className="text-[9px] uppercase tracking-widest text-zinc-600">
              System
            </p>

            <p className="text-xs text-emerald-400">
              INVESTIGATION MODE
            </p>
          </div>

          <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

        </div>

      </div>

      {/* Mission progress */}

      <div className="relative z-10 h-1 bg-zinc-900">

        <motion.div
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            h-full
            bg-gradient-to-r
            from-cyan-500
            via-violet-400
            to-emerald-400
            shadow-[0_0_12px_rgba(34,211,238,0.8)]
          "
        />

      </div>

      {/* Main content */}

      <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 lg:flex-row">

        {/* Security AI */}

        <div className="w-full shrink-0 lg:w-[220px]">

          <div className="relative h-full min-h-[190px] overflow-hidden rounded-2xl border border-violet-400/30 bg-violet-500/[0.04] p-5">

            {/* AI glow */}

            <motion.div
              animate={{
                scale: aiMood === "thinking"
                  ? [1, 1.15, 1]
                  : [1, 1.05, 1],
                opacity: aiMood === "warning"
                  ? [0.25, 0.6, 0.25]
                  : [0.18, 0.3, 0.18],
              }}
              transition={{
                duration:
                  aiMood === "thinking" ? 0.8 : 2,
                repeat: Infinity,
              }}
              className="
                absolute
                left-1/2
                top-10
                h-28
                w-28
                -translate-x-1/2
                rounded-full
                bg-violet-500/30
                blur-2xl
              "
            />

            {/* AI character */}

            <div className="relative flex flex-col items-center">

              <motion.div
                animate={{
                  y:
                    aiMood === "thinking"
                      ? [-3, 3, -3]
                      : [-2, 2, -2],
                  rotate:
                    aiMood === "warning"
                      ? [-2, 2, -2]
                      : 0,
                }}
                transition={{
                  duration:
                    aiMood === "thinking" ? 0.6 : 2.5,
                  repeat: Infinity,
                }}
                className="
                  relative
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-[30%]
                  border
                  border-violet-300/60
                  bg-gradient-to-b
                  from-violet-400/20
                  to-cyan-400/10
                  shadow-[0_0_30px_rgba(167,139,250,0.3)]
                "
              >

                <div className="absolute inset-3 rounded-[25%] border border-violet-300/20" />

                <div className="flex gap-4">

                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]"
                  />

                  <motion.div
                    animate={{
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]"
                  />

                </div>

              </motion.div>

              <p className="mt-4 text-xs font-bold tracking-[0.2em] text-violet-200">
                SECURITY AI
              </p>

              <p className="mt-3 text-center text-xs leading-5 text-zinc-400">
                {message}
              </p>

            </div>

          </div>

        </div>

        {/* Puzzle area */}

        <div className="min-w-0 flex-1">

          {phase === "stack" && (

            <div className="relative min-h-[520px] rounded-2xl border border-cyan-400/20 bg-black/30 p-5">

              <div className="mb-5 flex items-center justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-400/70">
                    Recovery Protocol
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-white">
                    COMMAND BUFFER
                  </h2>

                </div>

                <div className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-300">
                  {remainingCount} fragments
                </div>

              </div>

              <div className="flex min-h-[260px] flex-col items-center justify-center">

                {/* Stack */}

                <div className="relative flex w-full max-w-[420px] flex-col-reverse items-center gap-2">

                  {commands.map(
                    (command, index) => {

                      const colors =
                        colorClasses(
                          command.color
                        );

                      const isTop =
                        index ===
                        commands.length - 1;

                      return (
                        <motion.div
                          layout
                          key={command.id}
                          initial={{
                            opacity: 0,
                            y: -30,
                            scale: 0.9,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: isTop
                              ? 1.03
                              : 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: -80,
                            scale: 1.15,
                            rotate: -3,
                          }}
                          transition={{
                            duration: 0.35,
                          }}
                          className={`
                            relative
                            flex
                            h-16
                            w-full
                            items-center
                            rounded-xl
                            border
                            ${colors.border}
                            ${colors.bg}
                            ${isTop ? colors.glow : ""}
                            backdrop-blur-md
                          `}
                        >

                          <div className="flex w-16 items-center justify-center text-xl">
                            {command.icon}
                          </div>

                          <div className="flex-1">

                            <p className={`text-sm font-bold tracking-wider ${colors.text}`}>
                              {command.label}
                            </p>

                            <p className="text-[9px] uppercase tracking-widest text-zinc-600">
                              command fragment
                            </p>

                          </div>

                          {isTop && (
                            <motion.div
                              animate={{
                                opacity: [
                                  0.4,
                                  1,
                                  0.4,
                                ],
                              }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                              }}
                              className="
                                mr-4
                                rounded-full
                                border
                                border-emerald-400/40
                                bg-emerald-400/10
                                px-2
                                py-1
                                text-[8px]
                                font-bold
                                tracking-widest
                                text-emerald-300
                              "
                            >
                              TOP
                            </motion.div>
                          )}

                        </motion.div>
                      );
                    }
                  )}

                </div>

                {commands.length > 0 && (

                  <motion.button
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    onClick={extractCommand}
                    className="
                      absolute
                      bottom-5
                      left-1/2
                      -translate-x-1/2
                      rounded-xl
                      border
                      border-cyan-300/60
                      bg-cyan-400/10
                      px-8
                      py-3
                      text-xs
                      font-bold
                      tracking-[0.2em]
                      text-cyan-200
                      shadow-[0_0_20px_rgba(34,211,238,0.15)]
                      transition
                      hover:bg-cyan-400/20
                    "
                  >
                    EXTRACT TOP COMMAND
                  </motion.button>

                )}

              </div>

            </div>

          )}

          {phase === "timeline" && (

            <div className="h-full rounded-2xl border border-violet-400/20 bg-black/30 p-5">

              <div className="mb-5">

                <p className="text-[10px] uppercase tracking-[0.25em] text-violet-400/70">
                  Evidence Reconstruction
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  REBUILD THE ATTACK
                </h2>

                <p className="mt-2 max-w-xl text-xs leading-5 text-zinc-500">
                  The commands were recovered from the
                  buffer. Place them in the order the
                  attacker actually performed them.
                </p>

              </div>

              {/* Recovered commands */}

              <div className="mb-6 flex flex-wrap gap-3">

                {recovered.map((command) => {

                  const used =
                    timeline.some(
                      (item) =>
                        item.id === command.id
                    );

                  const colors =
                    colorClasses(
                      command.color
                    );

                  return (
                    <motion.button
                      key={command.id}
                      whileHover={
                        used
                          ? undefined
                          : {
                              y: -4,
                              scale: 1.03,
                            }
                      }
                      whileTap={
                        used
                          ? undefined
                          : {
                              scale: 0.96,
                            }
                      }
                      disabled={used}
                      onClick={() =>
                        addToTimeline(
                          command
                        )
                      }
                      className={`
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        px-4
                        py-3
                        text-xs
                        font-bold
                        tracking-wide
                        transition
                        ${colors.border}
                        ${colors.bg}
                        ${used ? "opacity-25" : ""}
                        ${colors.text}
                      `}
                    >
                      <span>
                        {command.icon}
                      </span>

                      {command.label}

                    </motion.button>
                  );
                })}

              </div>

              {/* Timeline */}

              <div
                className={`
                  relative
                  min-h-[220px]
                  rounded-2xl
                  border
                  ${
                    wrongAttempt
                      ? "border-rose-400/60 bg-rose-500/5"
                      : "border-cyan-400/20 bg-cyan-400/[0.02]"
                  }
                  p-5
                `}
              >

                <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-cyan-400/60 via-violet-400/40 to-transparent" />

                <div className="relative space-y-4">

                  {timeline.length === 0 && (

                    <div className="flex min-h-[160px] items-center justify-center pl-8 text-xs text-zinc-600">
                      Place the first action here...
                    </div>

                  )}

                  {timeline.map(
                    (command, index) => {

                      const colors =
                        colorClasses(
                          command.color
                        );

                      return (
                        <motion.div
                          key={command.id}
                          initial={{
                            opacity: 0,
                            x: -20,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          className="flex items-center gap-4 pl-1"
                        >

                          <div
                            className={`
                              z-10
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              ${colors.border}
                              ${colors.bg}
                              text-sm
                            `}
                          >
                            {index + 1}
                          </div>

                          <div
                            className={`
                              flex
                              flex-1
                              items-center
                              gap-3
                              rounded-xl
                              border
                              ${colors.border}
                              ${colors.bg}
                              px-4
                              py-3
                            `}
                          >

                            <span>
                              {command.icon}
                            </span>

                            <span
                              className={`text-xs font-bold tracking-wider ${colors.text}`}
                            >
                              {command.label}
                            </span>

                          </div>

                        </motion.div>
                      );
                    }
                  )}

                </div>

              </div>

              <div className="mt-4 flex justify-between">

                <button
                  onClick={resetTimeline}
                  className="
                    rounded-lg
                    px-4
                    py-2
                    text-xs
                    text-zinc-500
                    transition
                    hover:bg-white/5
                    hover:text-white
                  "
                >
                  RESET
                </button>

                <p className="self-center text-[10px] uppercase tracking-widest text-zinc-600">
                  {timeline.length}/4 actions placed
                </p>

              </div>

            </div>

          )}

          {phase === "complete" && (

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                flex
                h-full
                min-h-[420px]
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-emerald-400/40
                bg-emerald-400/[0.04]
                p-8
                text-center
              "
            >

              <motion.div
                initial={{
                  scale: 0,
                  rotate: -20,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                }}
                className="
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-emerald-400/60
                  bg-emerald-400/10
                  text-4xl
                  shadow-[0_0_40px_rgba(52,211,153,0.3)]
                "
              >
                ✓
              </motion.div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">
                Investigation Complete
              </p>

              <h2 className="mt-3 text-3xl font-black text-white">
                ATTACK SEQUENCE RESTORED
              </h2>

              <div className="mt-6 grid w-full max-w-md grid-cols-2 gap-3">

                <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                  <p className="text-[9px] uppercase tracking-widest text-zinc-600">
                    Device
                  </p>

                  <p className="mt-2 text-sm font-bold text-cyan-200">
                    LAB-WKS-07
                  </p>
                </div>

                <div className="rounded-xl border border-violet-400/20 bg-violet-400/5 p-4">
                  <p className="text-[9px] uppercase tracking-widest text-zinc-600">
                    Suspicious IP
                  </p>

                  <p className="mt-2 text-sm font-bold text-violet-200">
                    192.168.10.44
                  </p>
                </div>

              </div>

              <p className="mt-5 max-w-md text-xs leading-5 text-zinc-500">
                The command buffer followed a
                last-in-first-out recovery pattern.
                The recovered sequence identifies the
                workstation used during the breach.
              </p>

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={finishMission}
                className="
                  mt-7
                  rounded-xl
                  border
                  border-emerald-400/60
                  bg-emerald-400/10
                  px-8
                  py-3
                  text-xs
                  font-bold
                  tracking-[0.2em]
                  text-emerald-300
                  shadow-[0_0_20px_rgba(52,211,153,0.15)]
                  transition
                  hover:bg-emerald-400/20
                "
              >
                STORE EVIDENCE →
              </motion.button>

            </motion.div>

          )}

        </div>

      </div>

      {/* Footer status */}

      <div className="relative z-10 flex min-h-10 shrink-0 items-center justify-between border-t border-cyan-400/10 bg-black/40 px-5 text-[9px] uppercase tracking-[0.18em] text-zinc-600">

        <span>
          SECURITY CORE // RECOVERY PROTOCOL
        </span>

        <span>
          {phase === "stack"
            ? "BUFFER ACTIVE"
            : phase === "timeline"
            ? "RECONSTRUCTION ACTIVE"
            : "EVIDENCE SECURED"}
        </span>

      </div>

    </div>
  );
}