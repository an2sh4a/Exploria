import { useState } from "react";

import { useInventory } from "../../contexts/InventoryContext";

interface Props {
  onComplete: () => void;
}

export default function TerminalPuzzle({
  onComplete,
}: Props) {

  const { addItem, hasItem } = useInventory();

  const [step, setStep] = useState(0);

  function next() {
    setStep((prev) => prev + 1);
  }

  function collectEvidence() {

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

    <div
      className="
        font-mono
        text-sm
        text-green-400
      "
    >

      {step === 0 && (

        <div className="space-y-3">

          <p>{"> Booting Secure Terminal..."}</p>

          <p>{"> Connecting..."}</p>

          <p>{"> Authentication Successful."}</p>

          <button
            onClick={next}
            className="
              mt-5

              rounded-lg

              bg-cyan-500

              px-5

              py-2

              font-semibold

              text-black
            "
          >
            Continue
          </button>

        </div>

      )}

      {step === 1 && (

        <div className="space-y-3">

          <p>{"> Reading Server Logs..."}</p>

          <p>{"> 7 Failed Login Attempts Detected."}</p>

          <p>{"> Searching For Network Activity..."}</p>

          <button
            onClick={next}
            className="
              mt-5

              rounded-lg

              bg-cyan-500

              px-5

              py-2

              font-semibold

              text-black
            "
          >
            Analyze Logs
          </button>

        </div>

      )}

      {step === 2 && (

        <div className="space-y-3">

          <p className="text-yellow-300">
            ALERT
          </p>

          <p>{"> Suspicious Address Found"}</p>

          <p className="text-cyan-300 text-lg font-bold">
            192.168.10.44
          </p>

          <p>
            The attacker left traces inside the authentication server.
          </p>

          <button
            onClick={collectEvidence}
            className="
              mt-6

              w-full

              rounded-xl

              bg-cyan-500

              py-3

              font-bold

              text-black
            "
          >
            Collect Evidence
          </button>

        </div>

      )}

    </div>

  );

}