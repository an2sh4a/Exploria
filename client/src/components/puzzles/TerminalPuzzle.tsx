import { useEffect, useState } from "react";
import { useInventory } from "../../contexts/InventoryContext";

interface Props {
  onComplete: () => void;
}

type Screen = "boot" | "logs";

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

  if (screen === "boot") {
    return (
      <div
        className="
          rounded-xl
          border
          border-cyan-500/40
          bg-[#020406]
          p-6
          font-mono
        "
      >
        <h2 className="mb-6 text-xl font-bold text-cyan-300">
          UNIVERSITY SECURITY TERMINAL
        </h2>

        <div className="space-y-4 text-green-400">

          <p>{"> Boot Sequence Started..."}</p>

          <p>{"> {getStatus()}"}</p>

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

          <div className="mt-8 rounded-lg border border-zinc-700 bg-black p-4 text-sm text-green-500">

            <p>{"> Establishing encrypted connection..."}</p>

            <p>{"> Verifying credentials..."}</p>

            <p>{"> Accessing university server..."}</p>

            <p>{"> Please wait..."}</p>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div
      className="
        rounded-xl
        border
        border-cyan-500/40
        bg-[#020406]
        p-6
        font-mono
      "
    >
      <h2 className="mb-6 text-xl font-bold text-cyan-300">
        AUTHENTICATION LOGS
      </h2>

      <div className="space-y-3">

        <div className="rounded-lg border border-zinc-700 bg-black p-4 text-green-400">
          <p>[08:11] Student Login Successful</p>
        </div>

        <div className="rounded-lg border border-zinc-700 bg-black p-4 text-green-400">
          <p>[08:18] Database Backup Completed</p>
        </div>

        <div
          className="
            cursor-pointer
            rounded-lg
            border
            border-yellow-500
            bg-yellow-500/10
            p-4
            transition
            hover:bg-yellow-500/20
          "
        >
          <p className="font-semibold text-yellow-300">
            [08:23] Unknown Administrator Login
          </p>

          <p className="mt-2 text-sm text-zinc-300">
            Click to investigate this suspicious activity...
          </p>
        </div>

        <div className="rounded-lg border border-zinc-700 bg-black p-4 text-green-400">
          <p>[08:29] Library Portal Updated</p>
        </div>

      </div>
    </div>
  );
}