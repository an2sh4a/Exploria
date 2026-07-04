import MissionNode from "../components/mission/MissionNode";

import background from "../assets/images/mission/cybermap.png";


const missions = [

  {
    number: 1,
    status: "completed",
    x: "45%",
  },

  {
    number: 2,
    status: "current",
    x: "58%",
  },

  {
    number: 3,
    status: "locked",
    x: "42%",
  },

  {
    number: 4,
    status: "locked",
    x: "60%",
  },

  {
    number: 5,
    status: "locked",
    x: "43%",
  },

  {
    number: 6,
    status: "locked",
    x: "57%",
  },

  {
    number: 7,
    status: "locked",
    x: "45%",
  },

  {
    number: 8,
    status: "locked",
    x: "55%",
  },

] as const;



export default function MissionPath() {


  return (

    <div className="relative h-screen overflow-hidden bg-black">


      {/* Background */}


      <img

        src={background}

        alt="Cyber Map"

        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "

      />


      {/* Dark Overlay */}


      <div className="absolute inset-0 bg-black/40" />



      {/* Header */}


      <div className="absolute top-8 left-10 z-10">

        <h1 className="
          text-5xl
          font-black
          text-exploria-gradient
        ">
          Cyber Academy
        </h1>


        <p className="text-zinc-300 mt-3">

          Database Systems

        </p>

      </div>




      {/* Mission Nodes */}


      <div className="
        relative
        z-10
        h-full
        flex
        flex-col-reverse
        justify-center
        gap-8
      ">


        {missions.map((mission) => (

          <div

            key={mission.number}

            className="relative flex"

            style={{
              marginLeft: mission.x,
            }}

          >

            <MissionNode

              number={mission.number}

              status={mission.status}

            />

          </div>

        ))}


      </div>


    </div>

  );

}