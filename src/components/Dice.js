
import React from "react";

function Dice(props){
    return (
        <div onClick={props.onClick} id={props.id} className={props.isHeld ? "dice dark" : "dice"}>
            <h3>{props.value}</h3>
        </div>
    )
}

export default Dice;