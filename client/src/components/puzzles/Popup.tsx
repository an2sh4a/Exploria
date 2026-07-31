import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface PopupProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Popup({
  open,
  title,
  onClose,
  children,
}: PopupProps) {
  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          exit={{
            opacity: 0,
          }}

          className="
            fixed
            inset-0
            z-50

            flex
            items-center
            justify-center

            bg-black/70
            backdrop-blur-sm
          "
        >

          <motion.div

            initial={{
              scale: 0.9,
              opacity: 0,
            }}

            animate={{
              scale: 1,
              opacity: 1,
            }}

            exit={{
              scale: 0.9,
              opacity: 0,
            }}

            transition={{
              duration: 0.25,
            }}

            className="
              relative

              w-[720px]
              max-w-[90vw]

              rounded-2xl

              border
              border-cyan-500

              bg-[#05070b]

              shadow-[0_0_40px_rgba(34,211,238,0.3)]
            "
          >

            {/* Header */}

            <div
              className="
                flex
                items-center
                justify-between

                border-b
                border-cyan-500/40

                px-6
                py-4
              "
            >

              <h2
                className="
                  text-xl
                  font-bold
                  tracking-wide

                  text-cyan-300
                "
              >
                {title}
              </h2>

              <button

                onClick={onClose}

                className="
                  rounded-lg

                  p-2

                  text-zinc-400

                  transition

                  hover:bg-zinc-800

                  hover:text-white
                "
              >

                <X size={18} />

              </button>

            </div>

            {/* Body */}

            <div
              className="
                p-6
              "
            >

              {children}

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}