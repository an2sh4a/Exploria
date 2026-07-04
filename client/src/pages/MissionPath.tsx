import MissionNode from "../components/mission/MissionNode";
import background from "../assets/images/mission/cybermap.png";
import "./MissionPath.css";


const missions = [
  {
    id: 1,
    x: 30,
    y: 82,
    unlocked: true,
  },
  {
    id: 2,
    x: 58,
    y: 70,
    unlocked: false,
  },
  {
    id: 3,
    x: 38,
    y: 55,
    unlocked: false,
  },
  {
    id: 4,
    x: 65,
    y: 40,
    unlocked: false,
  },
  {
    id: 5,
    x: 45,
    y: 25,
    unlocked: false,
  },
];


export default function MissionPath(){

return (

<div
className="mission-map"
style={{
backgroundImage:`url(${background})`
}}
>


<div className="map-overlay"></div>


<svg
className="mission-route"
viewBox="0 0 100 100"
preserveAspectRatio="none"
>

<path
d="
M30 82
C45 78 50 72 58 70
C70 66 55 56 38 55
C25 52 45 42 65 40
C80 37 60 28 45 25
"
/>

</svg>



{missions.map((mission)=>(

<MissionNode

key={mission.id}

number={mission.id}

x={mission.x}

y={mission.y}

unlocked={mission.unlocked}

/>

))}


</div>


)

}