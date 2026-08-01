import { useEffect, useState } from "react";
import { useInventory } from "../../contexts/InventoryContext";

interface Props {
  onComplete: () => void;
}

type Screen = "boot" | "logs" | "investigation";

interface Log {
  id: number;
  title: string;
  time: string;
  suspicious: boolean;
}

const logs: Log[] = [
  {
    id: 1,
    time: "08:11",
    title: "Student Login Successful",
    suspicious: false,
  },
  {
    id: 2,
    time: "08:18",
    title: "Database Backup Completed",
    suspicious: false,
  },
  {
    id: 3,
    time: "08:23",
    title: "Unknown Administrator Login",
    suspicious: true,
  },
  {
    id: 4,
    time: "08:29",
    title: "Library Portal Updated",
    suspicious: false,
  },
];

export default function TerminalPuzzle({
  onComplete,
}: Props) {
  const { addItem, hasItem } = useInventory();

  const [screen, setScreen] = useState<Screen>("boot");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (screen !== "boot") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setScreen("logs");
          }, 700);

          return 100;
        }

        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [screen]);

  function getStatus() {
    if (progress < 20) return "Initializing Security Terminal...";
    if (progress < 40) return "Loading Secure Kernel...";
    if (progress < 60) return "Authenticating Administrator...";
    if (progress < 80) return "Reading Server Logs...";
    if (progress < 100) return "Decrypting Security Records...";

    return "ACCESS GRANTED";
  }

  function collectEvidence() {
    if (!hasItem("ip-log")) {
      addItem({
        id: "ip-log",
        title: "Suspicious IP",
        description: "192.168.10.44",
      });
    }

    onComplete();
  }

  if (screen === "boot") {
    return (
      <div className="rounded-xl border border-cyan-500/40 bg-[#020406] p-6 font-mono">

        <h2 className="mb-6 text-xl font-bold text-cyan-300">
          UNIVERSITY SECURITY TERMINAL
        </h2>

        <div className="space-y-4 text-green-400">

          <p>{"> Boot Sequence Started..."}</p>

          <p>{"> " + getStatus()}</p>

          <div className="mt-6">

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

              <div
                className="h-full bg-cyan-400 transition-all duration-75"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <div className="mt-2 flex justify-between text-xs text-cyan-300">

              <span>Loading...</span>

              <span>{progress}%</span>

            </div>

          </div>

        </div>

      </div>
    );
  }

  if (screen === "logs") {
    return (
      <div className="rounded-xl border border-cyan-500/40 bg-[#020406] p-6 font-mono">

        <h2 className="mb-6 text-xl font-bold text-cyan-300">
          AUTHENTICATION LOGS
        </h2>

        <div className="space-y-3">

          {logs.map((log) => (

            <button
              key={log.id}
              onClick={() => {
                if (log.suspicious) {
                  setScreen("investigation");
                }
              }}
              className={`
                w-full
                rounded-lg
                border
                p-4
                text-left
                transition

                ${
                  log.suspicious
                    ? "border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20"
                    : "border-zinc-700 bg-black"
                }
              `}
            >

              <p
                className={
                  log.suspicious
                    ? "font-semibold text-yellow-300"
                    : "text-green-400"
                }
              >
                [{log.time}] {log.title}
              </p>

            </button>

          ))}

        </div>

      </div>
    );
  }

  return (
    <div className="rounded-xl border border-cyan-500/40 bg-[#020406] p-6 font-mono">

      <h2 className="mb-6 text-xl font-bold text-cyan-300">
        INVESTIGATION REPORT
      </h2>

      <div className="space-y-5">

        <div className="rounded-lg border border-yellow-500 bg-yellow-500/10 p-4">

          <h3 className="font-bold text-yellow-300">
            Unknown Administrator Login
          </h3>

          <div className="mt-4 space-y-2 text-green-400">

            <p>User : admin</p>

            <p>Device : Unknown Linux Machine</p>

            <p>IP Address : 192.168.10.44</p>

            <p>Failed Attempts : 7</p>

            <p>Status : HIGH RISK</p>

          </div>

        </div>

        <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4">

          <h3 className="font-semibold text-cyan-300">
            Investigation Note
          </h3>

          <p className="mt-3 text-sm leading-7 text-zinc-300">
            University systems organize millions of student
            records efficiently using <b>Data Structures</b>.
            A Data Structure is a way of organizing and storing
            data so operations can be performed efficiently.
          </p>

        </div>

        <button
          onClick={collectEvidence}
          className="
            w-full
            rounded-xl
            bg-cyan-500
            py-3
            font-semibold
            text-black
            transition
            hover:bg-cyan-400
          "
        >
          Extract Suspicious IP
        </button>

      </div>

    </div>
  );
}