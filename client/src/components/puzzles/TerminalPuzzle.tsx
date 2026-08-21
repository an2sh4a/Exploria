import { useEffect, useState } from "react";

import { useInventory } from "../../contexts/InventoryContext";
import TerminalBoot from "./TerminalBoot";
import TerminalLogs from "./TerminalLogs";

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
    if (screen !== "boot") {
      return;
    }

    setProgress(0);

    const interval = setInterval(() => {
      setProgress((previous) => {
        if (previous >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setScreen("logs");
          }, 700);

          return 100;
        }

        return previous + 2;
      });
    }, 45);

    return () => {
      clearInterval(interval);
    };
  }, [screen]);

  function finishPuzzle() {
    /*
      Evidence obtained from the Monitor puzzle.

      This item will later be used by the
      Cyber Room progression system.
    */

    if (!hasItem("ip-log")) {
      addItem({
        id: "ip-log",
        title: "Suspicious IP",
        description:
          "192.168.10.44 — recovered from the authentication server.",
      });
    }

    onComplete();
  }

  return (
    <div className="h-full w-full">
      {screen === "boot" && (
        <TerminalBoot
          progress={progress}
        />
      )}

      {screen === "logs" && (
        <TerminalLogs
          onSolved={finishPuzzle}
        />
      )}
    </div>
  );
}