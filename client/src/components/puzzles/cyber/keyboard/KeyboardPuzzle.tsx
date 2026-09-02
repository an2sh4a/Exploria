import { motion } from "framer-motion";
import { CheckCircle2, Link2, RotateCcw } from "lucide-react";
import { useState } from "react";
import SecurityAI from "../../shared/SecurityAI";
import { useAudio } from "../../../../contexts/AudioContext";
import { useInventory } from "../../../../contexts/InventoryContext";

interface Props {
  onComplete: () => void;
}

interface NodeData {
  id: string;
  value: string;
  next: string | null;
}

const NODES: NodeData[] = [
  { id: "A1", value: "HEAD", next: "B7" },
  { id: "B7", value: "192.168", next: "C3" },
  { id: "C3", value: "10.44", next: "D9" },
  { id: "D9", value: "FORENSICS", next: "E2" },
  { id: "E2", value: "EVIDENCE", next: null },
];

export default function KeyboardPuzzle({ onComplete }: Props) {
  const { playSound } = useAudio();
  const { addItem } = useInventory();
  const [currentId, setCurrentId] = useState("A1");
  const [visited, setVisited] = useState<string[]>(["A1"]);
  const [message, setMessage] = useState("Start at HEAD and follow the NEXT pointer.");
  const [complete, setComplete] = useState(false);
  const currentNode = NODES.find((node) => node.id === currentId) ?? NODES[0];
  const availableNode = currentNode.next
    ? NODES.find((node) => node.id === currentNode.next) ?? null
    : null;

  function traverse(node: NodeData) {
    if (complete || !availableNode) {
      return;
    }
    if (node.id !== availableNode.id) {
      playSound("click", 0.35);
      setMessage("That node is not connected from the current NEXT pointer.");
      return;
    }
    playSound("click", 0.65);
    const nextVisited = [...visited, node.id];
    setVisited(nextVisited);
    if (node.next === null) {
      setComplete(true);
      setMessage("Traversal complete. The linked chain reaches NULL.");
      addItem({
        id: "linked-chain",
        title: "Linked Chain",
        description: "A recovered linked-list path from HEAD to NULL.",
      });
      playSound("success", 0.8);
      window.setTimeout(() => {
        playSound("pickup", 0.75);
        onComplete();
      }, 900);
      return;
    }
    setCurrentId(node.id);
    setMessage(`Node ${node.id} points to ${node.next}. Follow the NEXT link.`);
  }

  function resetPuzzle() {
    playSound("click", 0.45);
    setCurrentId("A1");
    setVisited(["A1"]);
    setMessage("Start at HEAD and follow the NEXT pointer.");
    setComplete(false);
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#05060c] text-white">
      <div className="flex shrink-0 items-center justify-between border-b border-purple-400/10 px-7 py-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-pink-300">KEYBOARD ACCESS NODE</p>
          <h2 className="mt-1 text-xl font-black">Linked Chain Reconstruction</h2>
        </div>
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-purple-300">
          <Link2 size={14} />
          LINKED LIST
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-5 p-6 lg:flex-row">
        <div className="flex w-full flex-col rounded-2xl border border-purple-400/15 bg-purple-500/[0.04] p-5 lg:w-[230px]">
          <div className="flex items-center justify-center">
            <SecurityAI size="medium" />
          </div>
          <p className="mt-4 text-[9px] tracking-[0.25em] text-pink-300">AI STATUS</p>
          <p className="mt-2 text-xs leading-6 text-zinc-300">{message}</p>
          <div className="mt-auto pt-6">
            <div className="text-[9px] tracking-[0.2em] text-zinc-600">CURRENT NODE</div>
            <div className="mt-2 rounded-xl border border-pink-400/20 bg-pink-500/[0.05] p-3">
              <p className="text-lg font-black text-white">{currentNode.id}</p>
              <p className="mt-1 text-xs text-purple-200">{currentNode.value}</p>
              <p className="mt-2 text-[10px] text-zinc-500">NEXT → {currentNode.next ?? "NULL"}</p>
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col rounded-2xl border border-purple-400/10 bg-black/20 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[9px] tracking-[0.25em] text-zinc-500">TRAVERSAL PATH</p>
              <p className="mt-1 text-sm text-zinc-300">Follow the links from HEAD to NULL.</p>
            </div>
            <button
              onClick={resetPuzzle}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-400 transition hover:border-purple-400/30 hover:text-white"
            >
              <RotateCcw size={13} />
              RESET
            </button>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-x-auto">
            <div className="flex min-w-max items-center gap-3">
              {NODES.map((node, index) => {
                const isVisited = visited.includes(node.id);
                const isCurrent = currentId === node.id;
                const canSelect = availableNode?.id === node.id && !complete;
                return (
                  <div key={node.id} className="flex items-center gap-3">
                    <motion.button
                      whileHover={canSelect ? { scale: 1.04 } : undefined}
                      whileTap={canSelect ? { scale: 0.97 } : undefined}
                      onClick={() => traverse(node)}
                      disabled={!canSelect}
                      className={`relative w-[145px] rounded-2xl border p-4 text-left transition ${
                        isCurrent
                          ? "border-pink-300/70 bg-pink-500/10 shadow-[0_0_25px_rgba(244,114,182,0.16)]"
                          : isVisited
                          ? "border-purple-300/30 bg-purple-500/[0.07]"
                          : canSelect
                          ? "cursor-pointer border-purple-300/50 bg-purple-500/[0.08] hover:bg-purple-500/[0.14]"
                          : "border-white/10 bg-black/20 opacity-50"
                      }`}
                    >
                      <p className="text-[9px] tracking-[0.2em] text-zinc-500">
                        {index === 0 ? "HEAD" : `NODE ${index}`}
                      </p>
                      <p className="mt-2 text-xl font-black text-white">{node.id}</p>
                      <p className="mt-1 text-xs text-purple-200">{node.value}</p>
                      <div className="mt-3 border-t border-white/10 pt-2 text-[9px] text-zinc-500">
                        NEXT → {node.next ?? "NULL"}
                      </div>
                      {isVisited && (
                        <CheckCircle2
                          size={15}
                          className="absolute right-3 top-3 text-emerald-300"
                        />
                      )}
                    </motion.button>
                    {node.next !== null && (
                      <div className="text-xl text-purple-300/50">→</div>
                    )}
                  </div>
                );
              })}
              <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-emerald-300">
                NULL
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
            <div className="text-[10px] tracking-[0.2em] text-zinc-500">
              NODES VISITED: {visited.length}/{NODES.length}
            </div>
            {complete && (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <CheckCircle2 size={15} />
                CHAIN RECOVERED
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}