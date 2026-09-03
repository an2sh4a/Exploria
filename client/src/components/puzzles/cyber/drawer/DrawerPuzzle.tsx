import { motion } from "framer-motion";
import { CheckCircle2, RotateCcw, Search } from "lucide-react";
import { useState } from "react";
import SecurityAI from "../../shared/SecurityAI";
import { useAudio } from "../../../../contexts/AudioContext";
import { useInventory } from "../../../../contexts/InventoryContext";

interface Props {
  onComplete: () => void;
}

interface RecordData {
  id: number;
  name: string;
  ip: string;
}

const RECORDS: RecordData[] = [
  { id: 12, name: "ACCESS LOG", ip: "192.168.10.12" },
  { id: 18, name: "AUTH REQUEST", ip: "192.168.10.18" },
  { id: 24, name: "DATABASE QUERY", ip: "192.168.10.24" },
  { id: 31, name: "FILE TRANSFER", ip: "192.168.10.31" },
  { id: 39, name: "SESSION LOG", ip: "192.168.10.39" },
  { id: 44, name: "NETWORK PING", ip: "192.168.10.44" },
  { id: 51, name: "ARCHIVE ACCESS", ip: "192.168.10.51" },
  { id: 58, name: "SYSTEM REQUEST", ip: "192.168.10.58" },
  { id: 66, name: "AUTH SESSION", ip: "192.168.10.66" },
  { id: 73, name: "SUSPICIOUS SESSION", ip: "192.168.10.73" },
  { id: 79, name: "FILE ACCESS", ip: "192.168.10.79" },
  { id: 84, name: "DATABASE SESSION", ip: "192.168.10.84" },
  { id: 91, name: "ADMIN CHECK", ip: "192.168.10.91" },
  { id: 97, name: "SYSTEM PING", ip: "192.168.10.97" },
  { id: 103, name: "LOG ARCHIVE", ip: "192.168.10.103" },
];

const TARGET = 73;

export default function DrawerPuzzle({ onComplete }: Props) {
  const { playSound } = useAudio();
  const { addItem } = useInventory();

  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(RECORDS.length - 1);
  const [checked, setChecked] = useState<number[]>([]);
  const [steps, setSteps] = useState(0);
  const [message, setMessage] = useState(
    "The records are sorted. Start by checking the middle record."
  );
  const [complete, setComplete] = useState(false);

  const middle =
    low <= high ? Math.floor((low + high) / 2) : -1;

  const activeRecord =
    middle >= 0 ? RECORDS[middle] : null;

  function inspectMiddle() {
    if (complete || middle < 0 || !activeRecord) {
      return;
    }

    playSound("click", 0.65);

    const nextChecked = checked.includes(middle)
      ? checked
      : [...checked, middle];

    setChecked(nextChecked);
    setSteps((current) => current + 1);

    if (activeRecord.id === TARGET) {
      setComplete(true);
      setMessage(
        `Target found. Suspicious IP: ${activeRecord.ip}.`
      );

      addItem({
        id: "search-evidence",
        title: "Suspicious IP",
        description:
          `Suspicious session recovered from ${activeRecord.ip}.`,
      });

      playSound("success", 0.8);

      window.setTimeout(() => {
        playSound("pickup", 0.75);
        onComplete();
      }, 1000);

      return;
    }

    if (activeRecord.id < TARGET) {
      setLow(middle + 1);
      setMessage(
        `Record ${activeRecord.id} is lower than the target. The left half can be discarded.`
      );
    } else {
      setHigh(middle - 1);
      setMessage(
        `Record ${activeRecord.id} is higher than the target. The right half can be discarded.`
      );
    }
  }

  function resetPuzzle() {
    playSound("click", 0.4);
    setLow(0);
    setHigh(RECORDS.length - 1);
    setChecked([]);
    setSteps(0);
    setComplete(false);
    setMessage(
      "The records are sorted. Start by checking the middle record."
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#05060c] text-white">
      <div className="flex shrink-0 items-center justify-between border-b border-purple-400/10 px-7 py-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] text-pink-300">
            ARCHIVE SEARCH NODE
          </p>
          <h2 className="mt-1 text-xl font-black">
            Suspicious IP Search
          </h2>
        </div>

        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-purple-300">
          <Search size={14} />
          BINARY SEARCH
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-5 p-6 lg:flex-row">
        <div className="flex w-full flex-col rounded-2xl border border-purple-400/15 bg-purple-500/[0.04] p-5 lg:w-[250px]">
          <div className="flex items-center justify-center">
            <SecurityAI size="medium" />
          </div>

          <p className="mt-4 text-[9px] tracking-[0.25em] text-pink-300">
            AI STATUS
          </p>

          <p className="mt-2 text-xs leading-6 text-zinc-300">
            {message}
          </p>

          <div className="mt-6 rounded-xl border border-purple-400/15 bg-purple-500/[0.05] p-4">
            <p className="text-[9px] tracking-[0.2em] text-zinc-600">
              SEARCH RANGE
            </p>

            <div className="mt-3 flex justify-between text-sm text-zinc-300">
              <span>
                LOW{" "}
                <strong className="text-white">
                  {low <= high ? RECORDS[low].id : "-"}
                </strong>
              </span>

              <span>
                HIGH{" "}
                <strong className="text-white">
                  {low <= high ? RECORDS[high].id : "-"}
                </strong>
              </span>
            </div>

            <div className="mt-4 border-t border-white/10 pt-3">
              <p className="text-[9px] tracking-[0.2em] text-zinc-600">
                CURRENT MIDDLE
              </p>

              <p className="mt-1 text-2xl font-black text-pink-300">
                {activeRecord?.id ?? "-"}
              </p>
            </div>
          </div>

          <div className="mt-auto pt-6">
            <p className="text-[9px] tracking-[0.2em] text-zinc-600">
              SEARCH STEPS
            </p>

            <p className="mt-2 text-2xl font-black text-white">
              {steps}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col rounded-2xl border border-purple-400/10 bg-black/20 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-[9px] tracking-[0.25em] text-zinc-500">
                SORTED EVIDENCE ARCHIVE
              </p>

              <p className="mt-1 text-sm text-zinc-300">
                Only the highlighted middle record can be inspected.
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

          <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-y-auto md:grid-cols-3 lg:grid-cols-5">
            {RECORDS.map((record, index) => {
              const inRange =
                index >= low && index <= high;
              const isMiddle = index === middle;
              const isChecked = checked.includes(index);
              const isTarget =
                complete && record.id === TARGET;

              return (
                <motion.button
                  key={record.id}
                  onClick={isMiddle ? inspectMiddle : undefined}
                  whileHover={
                    isMiddle && !complete
                      ? { scale: 1.03 }
                      : undefined
                  }
                  whileTap={
                    isMiddle && !complete
                      ? { scale: 0.97 }
                      : undefined
                  }
                  disabled={!isMiddle || complete}
                  className={`relative rounded-2xl border p-4 text-left transition ${
                    isTarget
                      ? "border-emerald-400/70 bg-emerald-500/10 shadow-[0_0_25px_rgba(52,211,153,0.16)]"
                      : isMiddle
                      ? "cursor-pointer border-pink-300/70 bg-pink-500/[0.10] shadow-[0_0_28px_rgba(244,114,182,0.15)]"
                      : inRange
                      ? "border-purple-300/20 bg-purple-500/[0.04]"
                      : "border-white/5 bg-black/30 opacity-25"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.2em] text-zinc-500">
                      RECORD
                    </span>

                    {isChecked && (
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

                  <p className="mt-3 text-[9px] text-zinc-600">
                    {record.ip}
                  </p>

                  <div className="mt-3 border-t border-white/10 pt-2 text-[9px] tracking-[0.15em]">
                    {isTarget
                      ? "TARGET FOUND"
                      : isMiddle
                      ? "INSPECT MIDDLE"
                      : inRange
                      ? "SEARCH RANGE"
                      : "DISCARDED"}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
            <div className="text-[10px] tracking-[0.2em] text-zinc-500">
              TARGET IP: UNKNOWN
            </div>

            {complete && (
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                <CheckCircle2 size={15} />
                SUSPICIOUS IP FOUND
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}