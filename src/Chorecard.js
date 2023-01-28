import React from "react";

export default function Chorecard(props){
    let editBtn =  "🖊️";
    return(
        <div className = "choreCard">
            <input type = "checkbox" className = "checkbox"/>
            <h3>{props.chore}</h3>
            <h5 onClick = {props.editChore} className = "editBtn">{editBtn}</h5>
            <h5 onClick = {() => props.removeChore(props.id)} className="x-btn">X</h5>
        </div>
    )
}