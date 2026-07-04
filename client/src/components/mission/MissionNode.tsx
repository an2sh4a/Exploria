import "./MissionNode.css";


interface Props{

number:number;

x:number;

y:number;

unlocked:boolean;

}



export default function MissionNode({
number,
x,
y,
unlocked
}:Props){


return(

<div

className={`mission-node ${
unlocked
?
"unlocked"
:
"locked"
}`}


style={{

left:`${x}%`,

top:`${y}%`

}}

>

{
unlocked
?
number
:
"🔒"
}


</div>


)

}