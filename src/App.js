import { useState, useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shuffle cards
  const shuffleCards = () => {

    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
     
  }

  // Handle a choice
  const handleChoice = async (card) => {
    choiceOne !== null ? setChoiceTwo(card) : setChoiceOne(card)
    console.log(card)
  }

  //Handles the comparing of the cards + changes the matched property
  const handleCompare = () => {

    if(choiceTwo !== null && choiceOne !== null){
      setDisabled(true)
      if(choiceTwo.src === choiceOne.src){
        console.log("Correct")
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }else {
              return card
            }
          })
        })
        setTimeout(() => handleTurnReset(), 1000)

      }else{
        setTimeout(() => handleTurnReset(), 1000)
        console.log("Wrong")
      }

    }
  }

  //Resets choice and adds turn
  const handleTurnReset = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurns => prevTurns + 1)
      setDisabled(false)
  }

  //Compares the two cards when choice two changes
  useEffect(() => {
    handleCompare()
  }, [choiceTwo])

  //Start game automagically
  useEffect(() => {shuffleCards()}, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard  
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>{turns}</p>
    </div>
  );
}

export default App