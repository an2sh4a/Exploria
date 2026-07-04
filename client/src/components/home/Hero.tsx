import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import background from "../../assets/images/home/hero-background.avif";

import Particles from "./Particles";
import BootOverlay from "../transitions/BootOverlay";


export default function Hero() {

  const [boot, setBoot] = useState(false);

  const navigate = useNavigate();


  return (

    <>

      <motion.section

        animate={{
          opacity: boot ? 0 : 1,
          scale: boot ? 1.03 : 1,
        }}

        transition={{
          duration: 0.8,
        }}

        className="relative h-screen overflow-hidden"

      >


        {/* Background */}

        <motion.img

          src={background}

          alt="Exploria"

          initial={{
            scale: 1
          }}

          animate={{
            scale: boot ? 1.18 : 1.12,
          }}

          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}

          className="absolute inset-0 w-full h-full object-cover"

        />



        <div className="absolute inset-0 bg-black/55" />


        <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/70 via-black/20 to-transparent" />



        <Particles />



        <div className="relative z-10 flex h-full items-center">


          <motion.div

            initial={{
              opacity: 0,
              x: -60
            }}

            animate={{
              opacity: 1,
              x: 0
            }}

            transition={{
              duration: 1
            }}

            className="ml-24 max-w-xl"

          >



            <div className="flex items-center gap-3 mb-6">


              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />


              <p className="uppercase tracking-[0.3em] text-green-300 text-sm font-semibold">

                SYSTEM ONLINE

              </p>


            </div>




            <h1 className="text-8xl font-black text-white leading-none tracking-wide">

              EXPLORIA

            </h1>




            <p className="mt-6 text-2xl text-cyan-300 font-medium">

              Escape. Learn. Conquer.

            </p>





            <div className="mt-10 border-l-4 border-cyan-400 pl-6">


              <p className="uppercase tracking-[0.3em] text-cyan-300 text-sm mb-4">

                Mission Brief

              </p>



              <p className="text-zinc-300 leading-8 text-lg">

                Knowledge has been fragmented.
                Investigate immersive escape rooms,
                recover clues, and master every mission.

              </p>


            </div>





            <motion.button


              whileHover={{
                scale: 1.05
              }}


              whileTap={{
                scale: 0.95
              }}


              onClick={() => setBoot(true)}


              className="
                mt-12
                px-10
                py-4
                rounded-xl
                border
                border-cyan-400
                bg-cyan-500/10
                backdrop-blur-md
                text-cyan-200
                font-semibold
                text-lg
                hover:bg-cyan-400
                hover:text-black
                transition-all
                duration-300
                hover:shadow-[0_0_40px_#22d3ee]
              "

            >

              ▶ ENTER EXPLORIA

            </motion.button>



          </motion.div>


        </div>



      </motion.section>




      <BootOverlay

        show={boot}

        onFinish={() => {

          navigate("/missions");

        }}

      />



    </>

  );

}