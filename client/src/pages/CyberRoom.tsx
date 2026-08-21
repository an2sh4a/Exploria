import { useState } from "react";

import background from "../assets/images/cyber/background.png";
import {
  Monitor,
  Laptop,
  Server,
} from "lucide-react";
import GameWindow from "../components/puzzles/shared/GameWindow";
import MonitorPuzzle from "../components/puzzles/cyber/monitor/MonitorPuzzle";
import Hotspot from "../components/puzzles/shared/Hotspot";
import InventoryBar from "../components/puzzles/shared/InventoryBar";

const DEBUG_HOTSPOTS = true;

export default function CyberRoom() {
  const [activePuzzle, setActivePuzzle] = useState<
  "monitor" | "laptop" | "server" | null
>(null);

const hotspots = [
  {
    id: "Monitor",
    top: "26%",
    left: "42.5%",
    width: "14%",
    height: "14%",
    action: () => setActivePuzzle("monitor"),
  },

  {
    id: "Keyboard",
    top: "63.2%",
    left: "43%",
    width: "13.5%",
    height: "4.4%",
    action: () => setActivePuzzle("laptop"),
  },

  {
    id: "Laptop",
    top: "53.3%",
    left: "30.5%",
    width: "7%",
    height: "9%",
    action: () => setActivePuzzle("laptop"),
  },

  {
    id: "Drawer",
    top: "76%",
    left: "24%",
    width: "10.4%",
    height: "15.4%",
    action: () => alert("Drawer puzzle coming soon."),
  },

  {
    id: "Server",
    top: "8%",
    left: "6.4%",
    width: "7%",
    height: "63%",
    action: () => setActivePuzzle("server"),
  },

  {
    id: "Whiteboard",
    top: "14%",
    left: "76.5%",
    width: "10.7%",
    height: "25.3%",
    action: () => alert("Whiteboard puzzle coming soon."),
  },

  {
    id: "Door",
    top: "10%",
    left: "91.5%",
    width: "9%",
    height: "67%",
    action: () => alert("Door locked."),
  },
];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background */}

      <img
        src={background}
        alt="Cyber Room"
        className="w-full h-screen object-cover"
      />

      {/* Hotspots */}

      {hotspots.map((spot) => (
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
      ))}

      {/* Mission

      <div
        className="
          absolute
          top-6
          left-6
          w-[200px]
          rounded-2xl
          bg-black/60
          backdrop-blur-md
          border
          border-cyan-500
          p-4
        "
      >
        <h1 className="text-xl font-bold leading-tight text-cyan-400">
          Cyber Investigation
        </h1>

        <p className="mt-3 text-[11px] leading-5 text-zinc-200">
          The university database has been hacked.
          Find the attacker before the evidence is erased.
        </p>
      </div> */}

      {/* Security AI */}

      {/* <div
        className="
          absolute
          bottom-20
          right-6
          w-[200px]
          rounded-2xl
          bg-cyan-500/10
          backdrop-blur-md
          border
          border-cyan-400
          p-4
        "
      >
        <h2 className="text-lg font-bold text-cyan-300">
          🤖 Security AI
        </h2>

        <p className="mt-3 text-[11px] leading-5 text-zinc-200">
          Unauthorized access detected.
          Investigate the room and locate clues.
        </p>
      </div> */}

      {/* Inventory */}

      <InventoryBar />

      {/* Popup */}

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
            onComplete={() => setActivePuzzle(null)}
          />
        )}

        {activePuzzle === "laptop" && (
          <div className="text-zinc-300">
            Laptop puzzle coming soon...
          </div>
        )}

        {activePuzzle === "server" && (
          <div className="text-zinc-300">
            Server puzzle coming soon...
          </div>
        )}
      </GameWindow>
    </div>
  );
}