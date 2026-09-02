import { motion } from "framer-motion";
import { CheckCircle2, RotateCcw, Search } from "lucide-react";
import { useState } from "react";
import SecurityAI from "../../shared/SecurityAI";
import { useAudio } from "../../../../contexts/AudioContext";
import { useInventory } from "../../../../contexts/InventoryContext";

interface Props {
  onComplete: () => void;
}

const RECORDS = [
  { id: 11, name: "ACCESS LOG", status: "CLEAR" },
  { id: 18, name: "AUTH REQUEST", status: "CLEAR" },
  { id: 24, name: "DATABASE QUERY", status: "CLEAR" },
  { id: 31, name: "FILE TRANSFER", status: "CLEAR" },
  { id: 44, name: "SUSPICIOUS SESSION", status: "TARGET" },
  { id: 57, name: "ARCHIVE ACCESS", status: "CLEAR" },
  { id: 63, name: "NETWORK PING", status: "CLEAR" },
  { id: 71, name: "ADMIN SESSION", status: "CLEAR" },
  { id: 86, name: "SYSTEM CHECK", status: "CLEAR" },
];

const TARGET = 44;

export default function DrawerPuzzle({ onComplete }: Props) {
  const { playSound } = useAudio();
  const { addItem } = useInventory();
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(RECORDS.length - 1);
  const [checked, setChecked] = useState<number[]>([]);
  const [message, setMessage] = useState(
    "The archive is sorted. Use the middle record to narrow the search."
  );
  const [complete, setComplete] = useState(false);

  const middle = Math.floor((low + high) / 2);
  const activeRecord = RECORDS[middle];

  function inspect(index: number) {
    if (complete || low > high) {
      return;
    }

    playSound("click", 0.6);

    const nextChecked = checked.includes(index)
      ? checked
      : [...checked, index];

    setChecked(nextChecked);

    const record = RECORDS[index];

    if (record.id === TARGET) {
      setComplete(true);
      setMessage(
        "Target located. The suspicious session is hidden at record 44."
      );
      addItem({
        id: "search-evidence",
        title: "Search Evidence",
        description:
          "Suspicious session record 44 recovered from the archive.",
      });
      playSound("success", 0.8);

      window.setTimeout(() => {
        playSound("pickup", 0.75);
        onComplete();
      }, 900);

      return;
    }

    if (record.id < TARGET) {
      setLow(index + 1);
      setMessage(
        `Record ${record.id} is too low. Search the records to the right.`
      );
    } else {
      setHigh(index - 1);
      setMessage(
        `Record ${record.id} is too high. Search the records to the left.`
      );
    }
  }

  function resetPuzzle() {
    playSound("click", 0.4);
    setLow(0);
    setHigh(RECORDS.length - 1);
    setChecked([]);
    setMessage(
      "The archive is sorted. Use the middle record to narrow the search."
    );
    setComplete(false);
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#05060c] text-white">
      <div className="flex shrink-0 items-center justify-between border-b border-purple-400/10 px-7 py-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-pink-300">
            ARCHIVE SEARCH NODE
          </p>
          <h2 className="mt-1 text-xl font-black">
            Evidence Search
          </h2>
        </div>
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-purple-300">
          <Search size={14} />
          BINARY SEARCH
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-5 p-6 lg:flex-row">
        <div className="flex w-full flex-col rounded-2xl border border-purple-400/15 bg-purple-500/[0.04] p-5 lg:w-[230px]">
          <div className="flex items-center justify-center">
            <SecurityAI size="medium" />
          </div>

          <p className="mt-4 text-[9px] tracking-[0.25em] text-pink-300">
            AI STATUS
          </p>

          <p className="mt-2 text-xs leading-6 text-zinc-300">
            {message}
          </p>

          <div className="mt-auto pt-6">
            <div className="text-[9px] tracking-[0.2em] text-zinc-600">
              SEARCH RANGE
            </div>

            <div className="mt-2 rounded-xl border border-purple-400/15 bg-purple-500/[0.05] p-3">
              <p className="text-sm text-zinc-300">
                LOW:{" "}
                <span className="font-bold text-white">
                  {low <= high ? RECORDS[low].id : "-"}
                </span>
              </p>

              <p className="mt-2 text-sm text-zinc-300">
                HIGH:{" "}
                <span className="font-bold text-white">
                  {low <= high ? RECORDS[high].id : "-"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col rounded-2xl border border-purple-400/10 bg-black/20 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[9px] tracking-[0.25em] text-zinc-500">
                SORTED EVIDENCE ARCHIVE
              </p>

              <p className="mt-1 text-sm text-zinc-300">
                Locate the suspicious session using the middle record.
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

          <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-y-auto md:grid-cols-3">
            {RECORDS.map((record, index) => {
              const active = low <= index && index <= high;
              const selected = checked.includes(index);
              const middleRecord = index === middle && !complete;

              return (
                <motion.button
                  key={record.id}
                  onClick={() => middleRecord && inspect(index)}
                  whileHover={
                    middleRecord
                      ? {
                          scale: 1.02,
                        }
                      : undefined
                  }
                  whileTap={
                    middleRecord
                      ? {
                          scale: 0.98,
                        }
                      : undefined
                  }
                  disabled={!middleRecord}
                  className={`relative rounded-2xl border p-4 text-left transition ${
                    complete && record.id === TARGET
                      ? "border-emerald-400/70 bg-emerald-500/10 shadow-[0_0_25px_rgba(52,211,153,0.15)]"
                      : middleRecord
                      ? "cursor-pointer border-pink-300/60 bg-pink-500/[0.08] shadow-[0_0_25px_rgba(244,114,182,0.12)]"
                      : active
                      ? "border-purple-300/20 bg-purple-500/[0.04]"
                      : "border-white/5 bg-black/30 opacity-35"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.2em] text-zinc-500">
                      RECORD
                    </span>

                    {selected && (
                      <CheckCircle2
                        size={15}
                        className="text-purple-300"
                      />
                    )}
                  </div>

                  <p className="mt-3 text-2xl font-black text-white">
                    {record.id}
                  </p>

                  <p className="mt-1 text-xs text-purple-200">
                    {record.name}
                  </p>

                  <div className="mt-4 border-t border-white/10 pt-2 text-[9px] tracking-[0.15em] text-zinc-500">
                    {active
                      ? middleRecord
                        ? "MIDDLE RECORD"
                        : record.status
                      : "OUTSIDE RANGE"}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
            <div className="text-[10px] tracking-[0.2em] text-zinc-500">
              TARGET: UNKNOWN
            </div>

            {complete && (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <CheckCircle2 size={15} />
                EVIDENCE FOUND
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}