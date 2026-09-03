import { motion } from "framer-motion";
import { CheckCircle2, Link2, RotateCcw } from "lucide-react";
import { useState } from "react";
import SecurityAI from "../../shared/SecurityAI";
import { useAudio } from "../../../../contexts/AudioContext";
import { useInventory } from "../../../../contexts/InventoryContext";

interface Props {
  onComplete: () => void;
}

type ListType = "singly" | "doubly" | "circular";

interface NodeData {
  id: string;
  value: string;
  next: string | null;
  prev?: string | null;
}

const SINGLY_NODES: NodeData[] = [
  { id: "S1", value: "HEAD", next: "S2" },
  { id: "S2", value: "192.168", next: "S3" },
  { id: "S3", value: "10.44", next: "S4" },
  { id: "S4", value: "EVIDENCE", next: null },
];

const DOUBLY_NODES: NodeData[] = [
  { id: "D1", value: "HEAD", prev: null, next: "D2" },
  { id: "D2", value: "AUTH", prev: "D1", next: "D3" },
  { id: "D3", value: "SESSION", prev: "D2", next: "D4" },
  { id: "D4", value: "EVIDENCE", prev: "D3", next: null },
];

const CIRCULAR_NODES: NodeData[] = [
  { id: "C1", value: "HEAD", next: "C2" },
  { id: "C2", value: "TRACE", next: "C3" },
  { id: "C3", value: "IP:192.168", next: "C4" },
  { id: "C4", value: "EVIDENCE", next: "C1" },
];

const LISTS: Record<ListType, NodeData[]> = {
  singly: SINGLY_NODES,
  doubly: DOUBLY_NODES,
  circular: CIRCULAR_NODES,
};

const TYPE_LABELS: Record<ListType, string> = {
  singly: "Singly Linked List",
  doubly: "Doubly Linked List",
  circular: "Circular Linked List",
};

const TYPE_DESCRIPTIONS: Record<ListType, string> = {
  singly: "Each node points only to the next node.",
  doubly: "Each node keeps both previous and next links.",
  circular: "The final node links back to the head.",
};

export default function KeyboardPuzzle({ onComplete }: Props) {
  const { playSound } = useAudio();
  const { addItem } = useInventory();

  const [listType, setListType] = useState<ListType>("singly");
  const [currentId, setCurrentId] = useState("S1");
  const [visited, setVisited] = useState<string[]>(["S1"]);
  const [completedTypes, setCompletedTypes] = useState<ListType[]>([]);
  const [message, setMessage] = useState(
    "Start at HEAD and follow the NEXT pointer."
  );
  const [complete, setComplete] = useState(false);

  const nodes = LISTS[listType];
  const currentNode =
    nodes.find((node) => node.id === currentId) ?? nodes[0];

  const nextNode = currentNode.next
    ? nodes.find((node) => node.id === currentNode.next) ?? null
    : null;

  function selectType(type: ListType) {
    if (completedTypes.includes(type) || type === listType) {
      return;
    }

    playSound("click", 0.45);
    setListType(type);

    const firstNode = LISTS[type][0];
    setCurrentId(firstNode.id);
    setVisited([firstNode.id]);

    if (type === "singly") {
      setMessage("Start at HEAD and follow the NEXT pointer.");
    } else if (type === "doubly") {
      setMessage(
        "This list has PREV and NEXT links. Traverse the nodes through both directions."
      );
    } else {
      setMessage(
        "This list is circular. Follow NEXT until the final node points back to HEAD."
      );
    }
  }

  function traverse(node: NodeData) {
    if (complete || !nextNode) {
      return;
    }

    if (node.id !== nextNode.id) {
      playSound("click", 0.35);
      setMessage(
        `Follow the NEXT link from ${currentNode.id}.`
      );
      return;
    }

    playSound("click", 0.65);

    const nextVisited = [...visited, node.id];
    setVisited(nextVisited);

    if (listType === "circular") {
      if (node.id === "C4" && node.next === "C1") {
        const updatedTypes = completedTypes.includes(listType)
          ? completedTypes
          : [...completedTypes, listType];

        setCompletedTypes(updatedTypes);
        setMessage(
          "Circular traversal complete. The final node points back to HEAD."
        );
        playSound("success", 0.7);

        if (updatedTypes.length === 3) {
          setComplete(true);
          addItem({
            id: "linked-list-evidence",
            title: "Linked List Evidence",
            description:
              "Evidence recovered by traversing singly, doubly, and circular linked lists.",
          });

          window.setTimeout(() => {
            playSound("pickup", 0.75);
            onComplete();
          }, 1000);
        }

        return;
      }
    }

    if (node.next === null) {
      const updatedTypes = completedTypes.includes(listType)
        ? completedTypes
        : [...completedTypes, listType];

      setCompletedTypes(updatedTypes);

      setMessage(
        `${TYPE_LABELS[listType]} traversal complete.`
      );

      playSound("success", 0.7);

      if (updatedTypes.length === 3) {
        setComplete(true);

        addItem({
          id: "linked-list-evidence",
          title: "Linked List Evidence",
          description:
            "Evidence recovered by traversing singly, doubly, and circular linked lists.",
        });

        window.setTimeout(() => {
          playSound("pickup", 0.75);
          onComplete();
        }, 1000);
      } else {
        const nextType =
          (["singly", "doubly", "circular"] as ListType[]).find(
            (type) => !updatedTypes.includes(type)
          );

        if (nextType) {
          window.setTimeout(() => {
            selectType(nextType);
          }, 700);
        }
      }

      return;
    }

    setCurrentId(node.id);

    if (listType === "doubly") {
      setMessage(
        `Node ${node.id} has PREV → ${node.prev ?? "NULL"} and NEXT → ${node.next ?? "NULL"}.`
      );
    } else {
      setMessage(
        `Node ${node.id} points to ${node.next}. Follow the NEXT link.`
      );
    }
  }

  function resetPuzzle() {
    playSound("click", 0.4);

    setListType("singly");
    setCurrentId("S1");
    setVisited(["S1"]);
    setCompletedTypes([]);
    setComplete(false);
    setMessage(
      "Start at HEAD and follow the NEXT pointer."
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#05060c] text-white">
      <div className="flex shrink-0 items-center justify-between border-b border-purple-400/10 px-7 py-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-pink-300">
            KEYBOARD ACCESS NODE
          </p>
          <h2 className="mt-1 text-xl font-black">
            Linked List Investigation
          </h2>
        </div>
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-purple-300">
          <Link2 size={14} />
          {TYPE_LABELS[listType].toUpperCase()}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-5 p-6 lg:flex-row">
        <div className="flex w-full flex-col rounded-2xl border border-purple-400/15 bg-purple-500/[0.04] p-5 lg:w-[240px]">
          <div className="flex items-center justify-center">
            <SecurityAI size="medium" />
          </div>

          <p className="mt-4 text-[9px] tracking-[0.25em] text-pink-300">
            AI STATUS
          </p>

          <p className="mt-2 text-xs leading-6 text-zinc-300">
            {message}
          </p>

          <div className="mt-6">
            <p className="text-[9px] tracking-[0.2em] text-zinc-600">
              LIST TYPES
            </p>

            <div className="mt-3 space-y-2">
              {(["singly", "doubly", "circular"] as ListType[]).map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => selectType(type)}
                    disabled={completedTypes.includes(type)}
                    className={`w-full rounded-xl border px-3 py-3 text-left text-xs transition ${
                      completedTypes.includes(type)
                        ? "border-emerald-400/25 bg-emerald-500/5 text-emerald-300"
                        : listType === type
                        ? "border-pink-300/50 bg-pink-500/10 text-white"
                        : "border-white/10 bg-black/20 text-zinc-400 hover:border-purple-400/30 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{TYPE_LABELS[type]}</span>
                      {completedTypes.includes(type) && (
                        <CheckCircle2 size={14} />
                      )}
                    </div>
                    <p className="mt-1 text-[9px] text-zinc-600">
                      {TYPE_DESCRIPTIONS[type]}
                    </p>
                  </button>
                )
              )}
            </div>
          </div>

          <div className="mt-auto pt-6">
            <div className="text-[9px] tracking-[0.2em] text-zinc-600">
              PROGRESS
            </div>

            <div className="mt-2 text-sm text-zinc-300">
              {completedTypes.length} / 3 list types
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col rounded-2xl border border-purple-400/10 bg-black/20 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[9px] tracking-[0.25em] text-zinc-500">
                {TYPE_LABELS[listType].toUpperCase()}
              </p>

              <p className="mt-1 text-sm text-zinc-300">
                {TYPE_DESCRIPTIONS[listType]}
              </p>
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
              {nodes.map((node, index) => {
                const isVisited = visited.includes(node.id);
                const isCurrent = currentId === node.id;
                const canSelect =
                  nextNode?.id === node.id && !complete;

                return (
                  <div
                    key={node.id}
                    className="flex items-center gap-3"
                  >
                    <motion.button
                      whileHover={
                        canSelect
                          ? { scale: 1.04 }
                          : undefined
                      }
                      whileTap={
                        canSelect
                          ? { scale: 0.97 }
                          : undefined
                      }
                      onClick={() => traverse(node)}
                      disabled={!canSelect}
                      className={`relative w-[155px] rounded-2xl border p-4 text-left transition ${
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
                        {node.id === nodes[0].id
                          ? "HEAD"
                          : `NODE ${index}`}
                      </p>

                      <p className="mt-2 text-xl font-black text-white">
                        {node.id}
                      </p>

                      <p className="mt-1 text-xs text-purple-200">
                        {node.value}
                      </p>

                      {listType === "doubly" && (
                        <div className="mt-3 space-y-1 border-t border-white/10 pt-2 text-[9px] text-zinc-500">
                          <p>
                            PREV → {node.prev ?? "NULL"}
                          </p>
                          <p>
                            NEXT → {node.next ?? "NULL"}
                          </p>
                        </div>
                      )}

                      {listType !== "doubly" && (
                        <div className="mt-3 border-t border-white/10 pt-2 text-[9px] text-zinc-500">
                          NEXT → {node.next ?? "NULL"}
                        </div>
                      )}

                      {isVisited && (
                        <CheckCircle2
                          size={15}
                          className="absolute right-3 top-3 text-emerald-300"
                        />
                      )}
                    </motion.button>

                    {node.next !== null && (
                      <div className="text-xl text-purple-300/50">
                        →
                      </div>
                    )}
                  </div>
                );
              })}

              {listType === "singly" && (
                <div className="rounded-full border border-zinc-400/20 bg-zinc-500/5 px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-zinc-400">
                  NULL
                </div>
              )}

              {listType === "doubly" && (
                <div className="rounded-full border border-zinc-400/20 bg-zinc-500/5 px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-zinc-400">
                  NULL
                </div>
              )}

              {listType === "circular" && (
                <div className="rounded-full border border-pink-400/30 bg-pink-500/10 px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-pink-300">
                  ↻ HEAD
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
            <div className="text-[10px] tracking-[0.2em] text-zinc-500">
              CURRENT: {currentNode.id}
            </div>

            {complete && (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <CheckCircle2 size={15} />
                ALL LIST TYPES RECOVERED
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}