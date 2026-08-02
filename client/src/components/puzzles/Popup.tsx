import { AnimatePresence, motion } from "framer-motion";
import { X, Monitor, ShieldCheck, Circle } from "lucide-react";
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/75
            backdrop-blur-md
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              flex
              h-[82vh]
              w-[92vw]
              max-w-[1250px]
              flex-col
              overflow-hidden
              rounded-2xl
              border
              border-cyan-500/30
              bg-[#05070B]
              shadow-[0_0_50px_rgba(0,255,255,0.15)]
            "
          >
            {/* Window Header */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-cyan-500/20
                bg-[#0A0F17]
                px-6
                py-4
              "
            >
              <div className="flex items-center gap-4">

                <Monitor
                  size={28}
                  className="text-cyan-400"
                />

                <div>

                  <h2 className="text-lg font-bold tracking-wide text-cyan-300">
                    {title}
                  </h2>

                  <p className="text-xs text-zinc-400">
                    Interactive Investigation Module
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-6">

                <div className="hidden items-center gap-4 lg:flex">

                  <div className="flex items-center gap-2 text-xs text-green-400">
                    <Circle size={8} fill="currentColor" />
                    Connected
                  </div>

                  <div className="flex items-center gap-2 text-xs text-cyan-400">
                    <ShieldCheck size={14} />
                    Secure
                  </div>

                  <div className="text-xs text-zinc-500">
                    Read Only
                  </div>

                </div>

                <button
                  onClick={onClose}
                  className="
                    rounded-lg
                    p-2
                    transition
                    hover:bg-red-500/20
                    hover:text-red-400
                  "
                >
                  <X size={18} />
                </button>

              </div>
            </div>

            {/* Content */}

            <div
              className="
                flex-1
                overflow-y-auto
                bg-[#05070B]
                p-8
              "
            >
              {children}
            </div>

            {/* Footer */}

            <div
              className="
                flex
                items-center
                justify-between
                border-t
                border-cyan-500/20
                bg-[#0A0F17]
                px-6
                py-3
                text-xs
                text-zinc-500
              "
            >
              <span>
                Exploria Interactive Learning Environment
              </span>

              <span>
                Escape Room Module
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}