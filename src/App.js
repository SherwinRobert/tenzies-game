import React from 'react';
import { nanoid } from 'nanoid';
import ReactConfetti from 'react-confetti';
import './App.css';
import Dice from './components/Dice.js';

function App() {

  const [numState, changeNumState] = React.useState(()=>diceRandom())
  const [gameOver,changeGameState] = React.useState(false)

  function diceRandom(){
    let array=[]
    for(let i=0;i<10;i++){
      let newDice = {
        value : Math.floor(Math.random()*6) + 1,
        isHeld : false,
        id: nanoid()
      }
      array.push(newDice)
    }

    return array
  }

  function randomChange(){

    if(gameOver){
      changeNumState(diceRandom())
      changeGameState()

    }else{

      changeNumState(preval =>{
        return preval.map(dice =>{
          return dice.isHeld ? dice : {...dice,value : Math.floor(Math.random()*6) + 1}
        })
      })

    }
 
  }

  function holder(e){
    changeNumState(preval =>{
      let updatedVal = preval.map(dice =>{
        let updatedDice = e.target.closest(".dice").id === dice.id ? {...dice,isHeld: !dice.isHeld} : dice
        return updatedDice
      })

      let referenceVal = updatedVal[0].value
      let switcher = updatedVal.every(dice =>{
        return dice.isHeld && referenceVal === dice.value
      })

      if(switcher){
        changeGameState(switcher)
        return updatedVal
      }
      else {
        return updatedVal
      }
    })
  }

  
  
  let diceComps = numState.map((dice)=>{
    return(
      <Dice onClick={holder} value={dice.value} id={dice.id} key={dice.id} isHeld={dice.isHeld}/>
    )
  })


  return(
    <main className='gameWrapper'>
      {gameOver && <ReactConfetti />}
      <div className='header'>
        <h2 className='heading'>Tenzies</h2>
        <p>Roll untill all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='gameBlock'>
        <div className='gameInner'>
          <div className='diceHolder'>
            {diceComps}
          </div>
        </div>
      </div>
      <div>
        <button onClick={randomChange} className='button'>{gameOver ?"ROLL AGAIN" :"ROLL IT"}</button>
      </div>
    </main>
  )
}

export default App;
