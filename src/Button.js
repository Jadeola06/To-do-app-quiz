import React from "react";

export default function Button(props){
    
    let styles = {}
    if (props.gameEnd && props.isCorrectAnswer){
        styles = {
            backgroundColor: "#94D7A2"
        }

    }else if(props.gameEnd && !props.isCorrectAnswer && props.isClicked){
        styles = {
            backgroundColor: "#ee3737"
        }

    }else{
        styles = {
            backgroundColor: props.isClicked ? "#D6DBF5" : "white"
        }
    }
    
    return(
        <button onClick = {props.gameEnd === false ? props.onClick : null } style = {styles} className="options-btn">{props.value}</button>
    )
}