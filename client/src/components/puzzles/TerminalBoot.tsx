import { useEffect, useState } from "react";

interface Props {
  progress: number;
}

const bootStages = [
  {
    threshold: 0,
    title: "Initializing security core",
    detail: "Waking AUTH-SERVER-01...",
  },
  {
    threshold: 25,
    title: "Loading investigation module",
    detail: "Recovering authentication records...",
  },
  {
    threshold: 50,
    title: "Establishing secure channel",
    detail: "Encrypted connection established.",
  },
  {
    threshold: 75,
    title: "Searching recent activity",
    detail: "Suspicious access pattern detected.",
  },
  {
    threshold: 100,
    title: "Investigation system ready",
    detail: "Evidence archive unlocked.",
  },
];

export default function TerminalBoot({
  progress,
}: Props) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((previous) => !previous);
    }, 900);

    return () => clearInterval(interval);
  }, []);

  const currentStage =
    [...bootStages]
      .reverse()
      .find((stage) => progress >= stage.threshold) ??
    bootStages[0];

  const completedStages = bootStages.filter(
    (stage) => progress >= stage.threshold
  ).length;

  return (
    <div className="flex h-full min-h-[520px] flex-col overflow-hidden rounded-xl border border-cyan-400/30 bg-[#071018]">

      {/* TOP STATUS BAR */}

      <div className="flex items-center justify-between border-b border-cyan-400/20 bg-[#0a1720] px-6 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">

            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-cyan-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="13"
                rx="2"
              />

              <path d="M8 21h8" />
              <path d="M12 17v4" />
              <path d="M7 9h3" />
              <path d="M7 12h6" />
            </svg>

          </div>

          <div>

            <h2 className="text-base font-semibold tracking-wide text-cyan-200">
              UNIVERSITY SECURITY CORE
            </h2>

            <p className="text-[10px] tracking-[0.25em] text-zinc-500">
              AUTH-SERVER-01 / INVESTIGATION MODE
            </p>

          </div>

        </div>

        <div className="flex items-center gap-5 text-[11px]">

          <div className="flex items-center gap-2 text-zinc-400">

            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

            SYSTEM ONLINE

          </div>

          <div className="flex items-center gap-2 text-zinc-400">

            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

            SECURE

          </div>

        </div>

      </div>


      {/* MAIN AREA */}

      <div className="grid flex-1 grid-cols-[230px_1fr] gap-5 p-5">

        {/* AI ASSISTANT */}

        <div className="flex flex-col rounded-xl border border-cyan-400/20 bg-[#0b1821] p-4">

          <div className="mb-4 flex items-center justify-between">

            <span className="text-[10px] font-semibold tracking-[0.2em] text-cyan-300">
              SECURITY AI
            </span>

            <span className="text-[9px] text-emerald-400">
              ACTIVE
            </span>

          </div>


          {/* AI AVATAR */}

          <div className="relative mx-auto mb-5 flex h-28 w-28 items-center justify-center">

            <div
              className={`
                absolute
                inset-0
                rounded-full
                border
                border-cyan-400/30
                transition-all
                duration-700
                ${
                  pulse
                    ? "scale-105 opacity-80"
                    : "scale-95 opacity-40"
                }
              `}
            />

            <div className="absolute inset-3 rounded-full border border-cyan-400/20 bg-cyan-400/5" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-300/40 bg-[#102632] shadow-[0_0_25px_rgba(34,211,238,0.18)]">

              <svg
                viewBox="0 0 100 100"
                className="h-14 w-14 text-cyan-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >

                <rect
                  x="18"
                  y="25"
                  width="64"
                  height="48"
                  rx="12"
                />

                <path d="M50 15v10" />

                <circle
                  cx="50"
                  cy="10"
                  r="3"
                  fill="currentColor"
                />

                <circle
                  cx="37"
                  cy="45"
                  r="5"
                  fill="currentColor"
                  className={pulse ? "opacity-100" : "opacity-40"}
                />

                <circle
                  cx="63"
                  cy="45"
                  r="5"
                  fill="currentColor"
                  className={pulse ? "opacity-100" : "opacity-40"}
                />

                <path d="M35 60c8 6 22 6 30 0" />

              </svg>

            </div>

          </div>


          <div className="rounded-lg border border-cyan-400/10 bg-black/20 p-3">

            <p className="text-[10px] uppercase tracking-wider text-zinc-500">
              Current status
            </p>

            <p className="mt-2 text-sm font-medium text-cyan-200">
              {currentStage.title}
            </p>

            <p className="mt-2 text-[11px] leading-5 text-zinc-400">
              {currentStage.detail}
            </p>

          </div>


          <div className="mt-auto rounded-lg border border-emerald-400/10 bg-emerald-400/5 p-3">

            <p className="text-[10px] uppercase tracking-wider text-zinc-500">
              AI Assistant
            </p>

            <p className="mt-2 text-[11px] leading-5 text-emerald-300">
              {progress < 75
                ? "I'm bringing the security archive back online. Stay connected."
                : "I found something unusual. The investigation archive is almost ready."}
            </p>

          </div>

        </div>


        {/* SECURITY CORE */}

        <div className="flex flex-col rounded-xl border border-cyan-400/20 bg-[#09131b] p-5">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-[10px] font-semibold tracking-[0.25em] text-cyan-400">
                RECOVERY SEQUENCE
              </p>

              <h1 className="mt-2 text-2xl font-bold text-white">
                Reconnecting to the evidence archive
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
                The university security system was interrupted during
                the attack. Restore the investigation terminal to recover
                the last known authentication events.
              </p>

            </div>


            <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-4 py-3 text-right">

              <p className="text-[9px] uppercase tracking-widest text-zinc-500">
                Progress
              </p>

              <p className="mt-1 text-2xl font-bold text-cyan-300">
                {progress}%
              </p>

            </div>

          </div>


          {/* PROGRESS */}

          <div className="mt-8">

            <div className="mb-2 flex justify-between text-[10px]">

              <span className="text-zinc-500">
                SYSTEM RECOVERY
              </span>

              <span className="text-cyan-300">
                {progress < 100
                  ? "PROCESSING"
                  : "COMPLETE"}
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full border border-cyan-400/20 bg-black/60">

              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-cyan-300 to-emerald-400 shadow-[0_0_16px_rgba(34,211,238,0.55)] transition-all duration-200"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>


          {/* RECOVERY MODULES */}

          <div className="mt-8 grid grid-cols-2 gap-3">

            {[
              {
                label: "SECURITY CORE",
                threshold: 0,
              },
              {
                label: "AUTHENTICATION",
                threshold: 25,
              },
              {
                label: "EVENT ARCHIVE",
                threshold: 50,
              },
              {
                label: "EVIDENCE INDEX",
                threshold: 75,
              },
            ].map((module) => {

              const complete =
                progress >= module.threshold;

              return (
                <div
                  key={module.label}
                  className={`
                    rounded-lg
                    border
                    px-4
                    py-4
                    transition-all
                    duration-500

                    ${
                      complete
                        ? "border-cyan-400/30 bg-cyan-400/5"
                        : "border-zinc-800 bg-black/20"
                    }
                  `}
                >

                  <div className="flex items-center justify-between">

                    <span
                      className={`
                        text-[10px]
                        font-semibold
                        tracking-wider

                        ${
                          complete
                            ? "text-cyan-300"
                            : "text-zinc-600"
                        }
                      `}
                    >
                      {module.label}
                    </span>

                    <span
                      className={
                        complete
                          ? "text-emerald-400"
                          : "text-zinc-600"
                      }
                    >
                      {complete ? "✓" : "○"}
                    </span>

                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black">

                    <div
                      className={`
                        h-full
                        rounded-full
                        transition-all
                        duration-500

                        ${
                          complete
                            ? "w-full bg-cyan-400"
                            : "w-0"
                        }
                      `}
                    />

                  </div>

                </div>
              );
            })}

          </div>


          {/* TERMINAL FEED */}

          <div className="mt-auto rounded-xl border border-cyan-400/15 bg-[#050a0e] p-4">

            <div className="mb-3 flex items-center justify-between">

              <span className="text-[10px] font-semibold tracking-[0.2em] text-cyan-300">
                LIVE SYSTEM FEED
              </span>

              <span className="text-[9px] text-zinc-600">
                AUTH-SERVER-01
              </span>

            </div>

            <div className="space-y-2 font-mono text-[11px]">

              <p className="text-emerald-400">
                <span className="text-zinc-600">
                  01
                </span>{" "}
                Security core responding...
              </p>

              <p className="text-emerald-400">
                <span className="text-zinc-600">
                  02
                </span>{" "}
                Authentication archive detected...
              </p>

              <p
                className={
                  progress >= 50
                    ? "text-emerald-400"
                    : "text-zinc-600"
                }
              >
                <span className="text-zinc-600">
                  03
                </span>{" "}
                Encrypted event records{" "}
                {progress >= 50
                  ? "recovered."
                  : "waiting..."}
              </p>

              <p
                className={
                  progress >= 75
                    ? "text-emerald-400"
                    : "text-zinc-600"
                }
              >
                <span className="text-zinc-600">
                  04
                </span>{" "}
                Suspicious activity scan{" "}
                {progress >= 75
                  ? "ready."
                  : "pending..."}
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* FOOTER */}

      <div className="flex items-center justify-between border-t border-cyan-400/15 bg-[#08131b] px-6 py-3">

        <div className="flex items-center gap-3 text-[10px] text-zinc-500">

          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

          INVESTIGATION TERMINAL

        </div>

        <div className="text-[10px] tracking-wider text-zinc-600">
          RECOVERY SEQUENCE {completedStages}/5
        </div>

      </div>

    </div>
  );
}