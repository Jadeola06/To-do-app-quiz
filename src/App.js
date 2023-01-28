import React from 'react';
import './App.css';
import Chorecard from "./Chorecard";
import QuizCard from "./QuizCard";


function App() {
  const [itemArr, setNewItemArr] = React.useState([])
  const [item, setItem] = React.useState()
  const [quiz, setQuiz] = React.useState({
    quizData: [],
    quizPage: false,
    startPage: true,
    correctCount: 0
  })
  const [gameEnd, setGameEnd] = React.useState(false)
  const [editMode, setEditMode] = React.useState({
    isOn: false,
    editData: ""
  })
  let results = quiz.quizData
  
  // To-DO App functions
  function addNewItem(){
    if (editMode.isOn){
      const target = editMode.editData
      setNewItemArr(oldArr => oldArr.filter(number => number !== target)) ;
      const update = {
        isOn: false,
        editData: ""
      }
      setEditMode(update)
    }
    if (item){
      setNewItemArr(oldArr => [...oldArr, item])
      setItem(oldItem => "")
    }
  
    
  }

  function handleChange(event) {
    setItem(prevItem => event.target.value )
  }

  function resetAll(){
    setNewItemArr(prevArr => [])
  }
  function removeChore(id){
    const target = id
    setNewItemArr(oldArr => oldArr.filter(number => number !== target)) ;
  }
  function editChore(chore){
    setItem(chore)
    const update = {
      isOn: true,
      editData: chore
    }
    setEditMode(update)
  }
  

  let realList = itemArr.map(x => {
    return(
      <Chorecard 
      key = {x}
      chore = {x}
      id = {x}
      removeChore = {removeChore}
      editChore = {() => editChore(x)}/>
      )})

  //Quiz Functions
  function playQuiz(){
    setQuiz(oldQuiz => {
      return{
        ...oldQuiz, quizPage: true }})
  }

  function startGame(){
    setQuiz(oldQuiz => {
      return{
        ...oldQuiz, startPage: false }})
    const equip = results.map(prompt => {
      let a,b,c,d
      if (prompt.incorrect_answers[0]){
        a = prompt.incorrect_answers[0]
      }
      b = prompt.incorrect_answers[1]
      c = prompt.incorrect_answers[2]
      d = prompt.correct_answer
      let optArr = [a,b,c,d]
      for (var i = optArr.length - 1; i > 0; i--) {
        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));
                    
        var temp = optArr[i];
        optArr[i] = optArr[j];
        optArr[j] = temp;
    }
      return{
        question: prompt.question,
        ansOptions: [{value: optArr[0], isClicked: false, id: Math.ceil(Math.random() * 1000)},
          {value: optArr[1], isClicked: false, id: Math.ceil(Math.random() * 1000)},
          {value: optArr[2], isClicked: false, id: Math.ceil(Math.random() * 1000)},
          {value: optArr[3], isClicked: false, id: Math.ceil(Math.random() * 1000)}],
        correct_answer: d,
        id: Math.ceil(Math.random() * 1000)
      }
      })
    setQuiz(oldData => {
      return{
        ...oldData, quizData: equip
      }
    })

  }
  function checkAnswers(){
    setGameEnd(oldGame => !oldGame)
  }

  function playAgain(){
    setGameEnd(oldGame => !oldGame)
    setQuiz(oldQuiz => {
      return{
        ...oldQuiz, startPage: true }})
    generateNewData()
    const equip = results.map(prompt => {
      let a,b,c,d
      a = prompt.incorrect_answers[0]
      b = prompt.incorrect_answers[1]
      c = prompt.incorrect_answers[2]
      d = prompt.correct_answer
      let optArr = [a,b,c,d]
      for (var i = optArr.length - 1; i > 0; i--) {
        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));
                    
        var temp = optArr[i];
        optArr[i] = optArr[j];
        optArr[j] = temp;
    }
      return{
        question: prompt.question,
        ansOptions: [{value: optArr[0], isClicked: false, id: Math.ceil(Math.random() * 1000)},
          {value: optArr[1], isClicked: false, id: Math.ceil(Math.random() * 1000)},
          {value: optArr[2], isClicked: false, id: Math.ceil(Math.random() * 1000)},
          {value: optArr[3], isClicked: false, id: Math.ceil(Math.random() * 1000)}],
        correct_answer: d,
        id: Math.ceil(Math.random() * 1000)
      }
      })
    setQuiz(oldData => {
      return{
        ...oldData, quizData: equip
      }
    })
    

  }
  
  function generateNewData(){
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      // .then(data => JSON.parse(data))
      .then(data => setQuiz(oldQuiz => {
        return{
          ...oldQuiz, quizData: data.results 
        }})) 
        
  }
  
  
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      // .then(data => JSON.parse(data))
      .then(data => setQuiz(oldQuiz => {
        return{
          ...oldQuiz, quizData: data.results 
        }})) 
        
  }, [])
 

  

  
  return (
    <div>
      {quiz.quizPage ? 
      <div className="quizPage">
        {quiz.startPage ?
          <div className = "hero">
            <h1 className="logo">Quizzical</h1>
            <h5 className='desc'>Some description if needed</h5>
            <button className="start-btn" onClick={startGame}>Start Quiz</button>
          </div>
          :
          <div className='quiz'>
            {results.map(x => {
              return (
                <QuizCard 
                  question = {x.question}
                  key = {x.id}
                  ansOptions = {x.ansOptions}
                  answer = {x.correct_answer}
                  id = {x.id}
                  correct_answer = {x.correct_answer}
                  click = {[]}
                  gameEnd = {gameEnd}
                />
            )})}
            {gameEnd ?
            <div>
              <button onClick ={playAgain} className="checkbtn2">Play again</button>
            </div>
            :
            <div>
              <button onClick ={checkAnswers} className="checkbtn">Check answers</button>
            </div>
}
          </div>
        }
         

      </div>
      : 
      <div className="App">
        <div className='switch'>
          <button className = "switch-btn" onClick={playQuiz}>Play Quiz</button>
        </div>
        <div className="App-header">
          <h1>"To-Do" List</h1>
          <input  className = "input-box" onChange = {handleChange} value = {item}  type = "text" name = "chore" placeholder="Enter To-Do Item..."></input>
          <div className = "buttons">
            <button  onClick = {addNewItem} className = "addbtn">Add</button>
            <button  onClick = {resetAll} className = "resetbtn">Reset</button>
          </div>
          <div>{realList}</div>
        </div>
      </div>}
    </div>
  );
}

export default App;
