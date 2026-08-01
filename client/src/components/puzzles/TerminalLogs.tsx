import { useState } from "react";

interface Props {
  onSolved: () => void;
}

export default function TerminalLogs({
  onSolved,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [verified, setVerified] = useState(false);

  const evidence = [
    {
      id: 1,
      title: "Student Login",
      details:
        "Campus Network\nUser: John Smith\nStatus: Successful",
      correct: false,
    },
    {
      id: 2,
      title: "Administrator Login",
      details:
        "User: admin\nUnknown Linux Device\nIP: 192.168.10.44\nFailed Attempts: 7",
      correct: true,
    },
    {
      id: 3,
      title: "Database Backup",
      details:
        "Nightly Backup\nBackup Server\nCompleted Successfully",
      correct: false,
    },
  ];

  function choose(id: number) {
    setSelected(id);

    const item = evidence.find((e) => e.id === id);

    if (item?.correct) {
      setVerified(true);
    }
  }

  return (
    <div className="space-y-6">

      <div>

        <h3 className="text-lg font-bold text-cyan-300">
          Investigation Report
        </h3>

        <p className="mt-2 text-sm text-zinc-400">
          Select the evidence that confirms the attacker.
        </p>

      </div>

      <div className="space-y-4">

        {evidence.map((item) => (

          <button
            key={item.id}
            onClick={() => choose(item.id)}
            className={`
              w-full
              rounded-xl
              border
              p-4
              text-left
              transition

              ${
                selected === item.id
                  ? item.correct
                    ? "border-green-500 bg-green-500/10"
                    : "border-red-500 bg-red-500/10"
                  : "border-zinc-700 bg-[#05070b] hover:border-cyan-500"
              }
            `}
          >

            <h4 className="font-semibold text-cyan-300">
              {item.title}
            </h4>

            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-zinc-300">
              {item.details}
            </p>

            {selected === item.id && !item.correct && (
              <p className="mt-4 text-sm text-red-400">
                This activity appears normal.
              </p>
            )}

            {selected === item.id && item.correct && (
              <p className="mt-4 text-sm text-green-400">
                Evidence Verified ✓
              </p>
            )}

          </button>

        ))}

      </div>

      <div
        className="
          rounded-xl
          border
          border-cyan-500/30
          bg-cyan-500/5
          p-4
        "
      >

        <h4 className="font-semibold text-cyan-300">
          Investigation Note
        </h4>

        <p className="mt-3 text-sm leading-7 text-zinc-300">
          University systems organize large amounts of information
          efficiently using <b>Data Structures</b>.
          A data structure is a method of organizing and storing
          data so operations can be performed efficiently.
        </p>

      </div>

      {verified && (

        <button
          onClick={onSolved}
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

      )}

    </div>
  );
}