import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [hideButton, setHideButton] = useState(false)
  const [matchQuantity, setMatchQuantity] = useState(0)
  const [chosenNumber, setChosenNumber] = useState(0)
  const [countdown, setCountdown] = useState(-1)
  const [isCount, setIsCount] = useState(false)
  const [gameOver, setGameOver] = useState(false)


  //shuffled cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    
    setGameOver(false)
    setIsCount(true)
    setCards(shuffledCards)
    setTurns(0)
    setHideButton(true)
  }


  //4x4
  const fourByFour = () => {
    setCountdown(100)
    setChosenNumber(1)
    shuffleCards()
  }


  //6x6
  const sixBySix = () => {
    setCountdown(200)
    setChosenNumber(2)
    shuffleCards()
  }


  //6x4
  const sixByFour = () => {
    setCountdown(150)
    setChosenNumber(3)
    shuffleCards()
  }

  //handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  //compare 2 cards
  useEffect(() => {

    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        setMatchQuantity(prevQuantity => prevQuantity + 1)
        if (matchQuantity === 5) {
          setTimeout(() => setHideButton(false), 3000)
        }
        resetTurn()
      }
      else {
        setTimeout(() => resetTurn(), 500)

      }
    }
  }, [choiceOne, choiceTwo])


  useEffect(() => {
    countdown > -1 && setTimeout(() => setCountdown(countdown - 1), 1000)
    if(countdown === 0){
      setHideButton(false)
      setIsCount(false)
      setGameOver(true)
      setChosenNumber(0)
    }
  }, [countdown])




  //reset choices
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  return (
    <div className="App mx-auto">
      <div className="space-y-5">
        <div className="flex justify-center ">
          <h1 className="text-white bg-red-500 p-5 rounded-lg font-bold text-4xl my-10 text-center">Match Game</h1>
        </div>
        <div className={`${hideButton ? 'hidden' : 'block'} space-x-10 flex justify-center`}>
          <button onClick={fourByFour} className={` text-white hover:text-black hover:bg-white transition ease-in duration-200 rounded-md text-2xl border-4 p-2 border-white`}>4x4 100sec</button>
          <button onClick={sixBySix} className={` text-white hover:text-black hover:bg-white transition ease-in duration-200 rounded-md text-2xl border-4 p-2 border-white`}>6x6 200sec</button>
          <button onClick={sixByFour} className={` text-white hover:text-black hover:bg-white transition ease-in duration-200 rounded-md text-2xl border-4 p-2 border-white`}>6x4 150sec</button>
        </div>
      </div>
      <div className={`${isCount ? 'flex' : 'hidden'} justify-center`}>
        <div className="text-4xl text-blue-500 text-center my-5 px-10 py-2 rounded-xl bg-white">{countdown}</div>
      </div>
      <div className={`${gameOver ? 'flex' : 'hidden'} justify-center text-white text-4xl`}>
        <div className="bg-black px-10 py-3 my-4 rounded-lg">Game Over</div>
      </div>

      <div className={`${chosenNumber === 1 ? 'grid-cols-4' : chosenNumber === 2 ? 'grid-cols-5' : chosenNumber === 3 ? 'grid-cols-6' : 'hidden'} container mt-10 px-48 mx-auto place-items-center grid grid-cols-4 gap-5`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;


