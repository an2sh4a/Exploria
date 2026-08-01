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

  const [screen, setScreen] =
    useState<Screen>("boot");

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (screen !== "boot") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setScreen("logs");
          }, 600);

          return 100;
        }

        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [screen]);

  function finishPuzzle() {
    if (!hasItem("ip-log")) {
      addItem({
        id: "ip-log",
        title: "Suspicious IP",
        description: "192.168.10.44",
      });
    }

    onComplete();
  }

  return (
    <>
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
    </>
  );
}