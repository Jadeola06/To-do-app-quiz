import React from "react"
import Button from "./Button"

export default function QuizCard(props){
    const [click, setClick] = React.useState([
        {
            isClicked: false,
            id: Math.ceil(Math.random() * 500) 
        },
        {
            isClicked: false,
            id: Math.ceil(Math.random() * 500)
        },
        {
            isClicked: false,
            id: Math.ceil(Math.random() * 500)
        },
        {
            isClicked: false,
            id: Math.ceil(Math.random() * 500)
        }
    ])

    let question1 = props.question.replace(/(&quot;)/g,"\"")
    let question2 = question1.replace(/(&amp;)/g,"&")
    let question = question2.replace(/&#039;/g,"'")
    

    let result = []
    result = props.ansOptions
    
    function changeClick(id) {
        setClick(oldClick => oldClick.map(die => {
            return die.id === id ? 
                {...die, isClicked: !die.isClicked} :
                {...die, isClicked: false}
        }))
        

    }
    let options
    if (props.ansOptions){
        options = props.ansOptions.map(x => {
            let value0 = x.value.replace(/(&quot;)/g,"\"")
            let value1 = value0.replace(/(&amp;)/g,"&")
            let value = value1.replace(/&#039;/g,"'")
            let r = result.indexOf(x)
            return(
                <Button gameEnd = {props.gameEnd} isCorrect = {props.correct_answer === value && click[r].isClicked === true} key = {click[r].id} isCorrectAnswer = {props.correct_answer === value ? true : false} onClick = {() => changeClick(click[r].id)} value = {value} id = {click[r].id} isClicked = {click[r].isClicked}/>
            )
        })
    }else{
        options = "Loading...Press Check answers/Play again"
    }
    


    return(
        <div>
            <h1 className = "prompt">{question}</h1>
            <div className ="options">
                {options}
            </div>
        </div>
    )
}