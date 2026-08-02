import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { LucideIcon, X } from "lucide-react";

interface GameWindowProps {
  open: boolean;

  title: string;

  subtitle?: string;

  icon?: LucideIcon;

  onClose: () => void;

  children: ReactNode;
}

export default function GameWindow({
  open,
  title,
  subtitle,
  icon: Icon,
  onClose,
  children,
}: GameWindowProps) {
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

            bg-black/55
            backdrop-blur-sm
          "
        >
          <motion.div
            initial={{
              scale: 0.94,
              opacity: 0,
              y: 40,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.96,
              opacity: 0,
              y: 30,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              relative

              flex
              flex-col

              h-[88vh]
              w-[94vw]
              max-w-[1450px]

              overflow-hidden

              rounded-3xl

              border
              border-cyan-500/20

              bg-[#05070b]

              shadow-[0_0_60px_rgba(0,255,255,0.12)]
            "
          >
            {/* Window Header */}

            <div
              className="
                flex
                items-center
                justify-between

                border-b
                border-cyan-500/15

                bg-[#0a1018]

                px-8
                py-5
              "
            >
              <div className="flex items-center gap-5">

                {Icon && (
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center

                      rounded-2xl

                      bg-cyan-500/10

                      text-cyan-400
                    "
                  >
                    <Icon size={26} />
                  </div>
                )}

                <div>

                  <h1
                    className="
                      text-xl
                      font-bold
                      tracking-wide

                      text-cyan-300
                    "
                  >
                    {title}
                  </h1>

                  {subtitle && (
                    <p
                      className="
                        mt-1

                        text-xs

                        tracking-[0.2em]

                        uppercase

                        text-zinc-500
                      "
                    >
                      {subtitle}
                    </p>
                  )}

                </div>

              </div>

              <div className="flex items-center gap-6">

                <div
                  className="
                    hidden
                    lg:flex
                    items-center
                    gap-5
                  "
                >
                  <div className="flex items-center gap-2">

                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

                    <span className="text-xs text-zinc-500">
                      Connected
                    </span>

                  </div>

                  <div className="flex items-center gap-2">

                    <span className="h-2 w-2 rounded-full bg-cyan-400" />

                    <span className="text-xs text-zinc-500">
                      Secure
                    </span>

                  </div>

                </div>

                <button
                  onClick={onClose}
                  className="
                    rounded-xl

                    p-2

                    transition

                    hover:bg-red-500/15

                    hover:text-red-400
                  "
                >
                  <X size={18} />
                </button>

              </div>
            </div>

            {/* Application */}

            <div
              className="
                flex-1

                overflow-y-auto

                bg-[#05070b]

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
                border-cyan-500/15

                bg-[#0a1018]

                px-8
                py-3

                text-xs
                text-zinc-600
              "
            >
              <span>
                Exploria Escape Room
              </span>

              <span>
                Interaction Window
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}