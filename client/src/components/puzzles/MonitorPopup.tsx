type Props = {
  onClose: () => void;
};

export default function MonitorPopup({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

      <div
        className="
        w-[520px]

        bg-black/80

        border
        border-cyan-500

        rounded-2xl

        p-6

        shadow-[0_0_25px_#06b6d4]
        "
      >

        <div className="flex justify-between items-center">

          <h2
            className="
            text-cyan-400
            text-xl
            font-bold
            "
          >
            ACCESS TERMINAL
          </h2>


          <button
            onClick={onClose}
            className="
            text-red-400
            text-lg
            "
          >
            ✕
          </button>


        </div>



        <div
          className="
          mt-6

          font-mono

          text-green-400

          text-sm

          space-y-3
          "
        >

          <p>{"> ACCESSING SERVER..."}</p>

          <p>{"> USER : admin"}</p>

          <p>{"> FAILED LOGIN ATTEMPTS : 7"}</p>

          <p>{"> Suspicious IP Found :"}</p>


          <p className="text-cyan-300">
            192.168.10.44
          </p>


          <p className="text-yellow-300 pt-3">
            CLUE :
          </p>


          <p>
            "The attacker left traces in the authentication server."
          </p>


          <p className="text-cyan-400">
            Evidence Added ✓
          </p>


        </div>


      </div>


    </div>
  );
}