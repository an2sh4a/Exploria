import { useState } from "react";
import background from "../assets/images/cyber/background.png";
import { Monitor, Laptop, Server } from "lucide-react";
import GameWindow from "../components/puzzles/shared/GameWindow";
import MonitorPuzzle from "../components/puzzles/cyber/monitor/MonitorPuzzle";
import Hotspot from "../components/puzzles/shared/Hotspot";
import InventoryBar from "../components/puzzles/shared/InventoryBar";
import LaptopPuzzle from "../components/puzzles/cyber/laptop/LaptopPuzzle";
import PuzzleBriefing from "../components/puzzles/shared/PuzzleBriefing";

const DEBUG_HOTSPOTS = true;

type PuzzleId =
  | "monitor"
  | "keyboard"
  | "laptop"
  | "drawer"
  | "server"
  | "whiteboard"
  | "door";

const HOTSPOT_ORDER: PuzzleId[] = [
  "monitor",
  "laptop",
  "keyboard",
  "drawer",
  "server",
  "whiteboard",
  "door",
];

const BRIEFINGS: Record<
  PuzzleId,
  {
    title: string;
    subtitle: string;
    concept: string;
    description: string;
  }
> = {
  monitor: {
    title: "Command Buffer",
    subtitle: "AUTH-SERVER-01",
    concept: "Stack • LIFO",
    description:
      "The recovered command buffer follows a Last-In, First-Out structure. The most recently placed command sits at the TOP. Recover the commands by interacting with the stack.",
  },
  laptop: {
    title: "Packet Queue",
    subtitle: "FORENSICS-02",
    concept: "Queue • FIFO",
    description:
      "Incoming network packets are waiting to be processed. This structure follows First-In, First-Out. Watch the FRONT and REAR as packets enter and leave the queue.",
  },
  keyboard: {
    title: "Linked Access",
    subtitle: "INPUT-NODE-03",
    concept: "Linked List",
    description:
      "A chain of connected data nodes has been detected. Each node points toward another node. Analyse the structure to continue the investigation.",
  },
  drawer: {
    title: "Evidence Search",
    subtitle: "ARCHIVE-04",
    concept: "Searching",
    description:
      "The evidence archive contains hidden information. Analyse the available records and determine how the target can be located.",
  },
  server: {
    title: "System Hierarchy",
    subtitle: "NODE-05",
    concept: "Trees",
    description:
      "The server contains a hierarchy of connected nodes. Analyse the parent and child relationships within the structure.",
  },
  whiteboard: {
    title: "Algorithm Board",
    subtitle: "LAB-06",
    concept: "Sorting",
    description:
      "A collection of data has been left in the wrong order. Analyse the sequence and determine how it should be reorganized.",
  },
  door: {
    title: "Exit Route",
    subtitle: "SECURITY-GATE-07",
    concept: "Graphs • Pathfinding",
    description:
      "The final security gate contains a network of connected locations. A valid route must be identified before the lock can be released.",
  },
};

export default function CyberRoom() {
  const [activePuzzle, setActivePuzzle] =
    useState<PuzzleId | null>(null);

  const [briefingPuzzle, setBriefingPuzzle] =
    useState<PuzzleId | null>(null);

  const [unlockedIndex, setUnlockedIndex] =
    useState(0);

  function openPuzzle(id: PuzzleId) {
    setBriefingPuzzle(id);
  }

  function enterPuzzle() {
    if (briefingPuzzle === null) {
      return;
    }

    setActivePuzzle(briefingPuzzle);
    setBriefingPuzzle(null);
  }

  function completePuzzle(id: PuzzleId) {
    const currentIndex =
      HOTSPOT_ORDER.indexOf(id);

    const nextIndex = currentIndex + 1;

    if (
      currentIndex === unlockedIndex &&
      nextIndex < HOTSPOT_ORDER.length
    ) {
      setUnlockedIndex(nextIndex);
    }

    setActivePuzzle(null);
  }

  const hotspots = [
    {
      id: "Monitor" as const,
      puzzleId: "monitor" as const,
      top: "26%",
      left: "42.5%",
      width: "14%",
      height: "14%",
      action: () => openPuzzle("monitor"),
    },
    {
      id: "Keyboard" as const,
      puzzleId: "keyboard" as const,
      top: "63.2%",
      left: "43%",
      width: "13.5%",
      height: "4.4%",
      action: () => openPuzzle("keyboard"),
    },
    {
      id: "Laptop" as const,
      puzzleId: "laptop" as const,
      top: "53.3%",
      left: "30.5%",
      width: "7%",
      height: "9%",
      action: () => openPuzzle("laptop"),
    },
    {
      id: "Drawer" as const,
      puzzleId: "drawer" as const,
      top: "76%",
      left: "24%",
      width: "10.4%",
      height: "15.4%",
      action: () =>
        alert("Drawer puzzle coming soon."),
    },
    {
      id: "Server" as const,
      puzzleId: "server" as const,
      top: "8%",
      left: "6.4%",
      width: "7%",
      height: "63%",
      action: () => openPuzzle("server"),
    },
    {
      id: "Whiteboard" as const,
      puzzleId: "whiteboard" as const,
      top: "14%",
      left: "76.5%",
      width: "10.7%",
      height: "25.3%",
      action: () =>
        alert("Whiteboard puzzle coming soon."),
    },
    {
      id: "Door" as const,
      puzzleId: "door" as const,
      top: "10%",
      left: "91.5%",
      width: "9%",
      height: "67%",
      action: () =>
        alert("Door locked."),
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <img
        src={background}
        alt="Cyber Room"
        className="w-full h-screen object-cover"
      />

      {hotspots.map((spot) => {
        const spotIndex =
          HOTSPOT_ORDER.indexOf(spot.puzzleId);

        if (spotIndex !== unlockedIndex) {
          return null;
        }

        return (
          <Hotspot
            key={spot.id}
            id={spot.id}
            top={spot.top}
            left={spot.left}
            width={spot.width}
            height={spot.height}
            visible={DEBUG_HOTSPOTS}
            onClick={spot.action}
          />
        );
      })}

      <InventoryBar />

      <PuzzleBriefing
        open={briefingPuzzle !== null}
        title={
          briefingPuzzle !== null
            ? BRIEFINGS[briefingPuzzle].title
            : ""
        }
        subtitle={
          briefingPuzzle !== null
            ? BRIEFINGS[briefingPuzzle].subtitle
            : ""
        }
        concept={
          briefingPuzzle !== null
            ? BRIEFINGS[briefingPuzzle].concept
            : ""
        }
        description={
          briefingPuzzle !== null
            ? BRIEFINGS[briefingPuzzle].description
            : ""
        }
        onEnter={enterPuzzle}
      />

      <GameWindow
        open={activePuzzle !== null}
        icon={
          activePuzzle === "monitor"
            ? Monitor
            : activePuzzle === "laptop"
            ? Laptop
            : Server
        }
        title={
          activePuzzle === "monitor"
            ? "University Security Terminal"
            : activePuzzle === "laptop"
            ? "File Recovery Workstation"
            : "Network Control Panel"
        }
        subtitle={
          activePuzzle === "monitor"
            ? "AUTH-SERVER-01"
            : activePuzzle === "laptop"
            ? "FORENSICS-02"
            : "NODE-03"
        }
        onClose={() => setActivePuzzle(null)}
      >
        {activePuzzle === "monitor" && (
          <MonitorPuzzle
            onComplete={() =>
              completePuzzle("monitor")
            }
          />
        )}

        {activePuzzle === "laptop" && (
          <LaptopPuzzle
            onComplete={() =>
              completePuzzle("laptop")
            }
          />
        )}

        {activePuzzle === "keyboard" && (
          <div className="text-zinc-300">
            Keyboard puzzle coming soon...
          </div>
        )}

        {activePuzzle === "server" && (
          <div className="text-zinc-300">
            Server puzzle coming soon...
          </div>
        )}

        {activePuzzle === "drawer" && (
          <div className="text-zinc-300">
            Drawer puzzle coming soon...
          </div>
        )}

        {activePuzzle === "whiteboard" && (
          <div className="text-zinc-300">
            Whiteboard puzzle coming soon...
          </div>
        )}

        {activePuzzle === "door" && (
          <div className="text-zinc-300">
            Door puzzle coming soon...
          </div>
        )}
      </GameWindow>
    </div>
  );
}