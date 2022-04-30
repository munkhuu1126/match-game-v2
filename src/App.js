import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';

const cardImages = [
  { "src": "/img/ihc.png", matched: false },
  { "src": "/img/ardcoin.png", matched: false },
  { "src": "/img/mont.png", matched: false },
  { "src": "/img/eth.png", matched: false },
  { "src": "/img/mongolnft.jpeg", matched: false },
  { "src": "/img/bitcoin.png", matched: false },
  { "src": "/img/maker.png", matched: false },
  { "src": "/img/apecoin.png", matched: false },
]
const cardImages1 = [
  { "src": "/img/ihc.png", matched: false },
  { "src": "/img/ardcoin.png", matched: false },
  { "src": "/img/mont.png", matched: false },
  { "src": "/img/eth.png", matched: false },
  { "src": "/img/mongolnft.jpeg", matched: false },
  { "src": "/img/bitcoin.png", matched: false },
  { "src": "/img/maker.png", matched: false },
  { "src": "/img/apecoin.png", matched: false },
  { "src": "/img/luna.png", matched: false },
  { "src": "/img/solana.png", matched: false },
  { "src": "/img/polka.png", matched: false },
  { "src": "/img/doge.png", matched: false },
]
const cardImages2 = [
  { "src": "/img/ihc.png", matched: false },
  { "src": "/img/ardcoin.png", matched: false },
  { "src": "/img/mont.png", matched: false },
  { "src": "/img/eth.png", matched: false },
  { "src": "/img/mongolnft.jpeg", matched: false },
  { "src": "/img/bitcoin.png", matched: false },
  { "src": "/img/maker.png", matched: false },
  { "src": "/img/apecoin.png", matched: false },
  { "src": "/img/luna.png", matched: false },
  { "src": "/img/solana.png", matched: false },
  { "src": "/img/polka.png", matched: false },
  { "src": "/img/doge.png", matched: false },
  { "src": "/img/tusd.png", matched: false },
  { "src": "/img/xrp.png", matched: false },
  { "src": "/img/bnb.png", matched: false },
  { "src": "/img/busd.png", matched: false },
  { "src": "/img/stellar.png", matched: false },
  { "src": "/img/avalanche.png", matched: false },

]

// ! fix card selection

function App() {

  const [cards, setCards] = useState([]) //self explanatory
  const [turns, setTurns] = useState(0) //counts the turns, but is unused
  const [choiceOne, setChoiceOne] = useState(null) //first choice of card
  const [choiceTwo, setChoiceTwo] = useState(null) // second choice of card
  const [disabled, setDisabled] = useState(false) //disables clicking when 1 card is chosen
  const [hideButton, setHideButton] = useState(false) //hides the button when game is started
  const [matchQuantity, setMatchQuantity] = useState(0) //if matchQuantity equals to 5. you win...
  const [chosenNumber, setChosenNumber] = useState(0) //mode choice of the game
  const [countdown, setCountdown] = useState(-1) //countdown state
  const [isCount, setIsCount] = useState(false) //show countdown
  const [gameOver, setGameOver] = useState(false) // condition for when a player loses the game
  const [isWin, setIsWin] = useState(false) //condition for when a player wins the game
  const [chosenCards, setChosenCards] = useState(0)



  //shuffled cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChosenCards(cardImages)
    setGameOver(false)
    setCountdown(0)
    setIsCount(true)
    setCards(shuffledCards)
    setTurns(0)
    setHideButton(true)
    setIsWin(false)
  }
  const shuffleCards1 = () => {
    const shuffledCards = [...cardImages1, ...cardImages1,]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChosenCards(cardImages1)
    setGameOver(false)
    setCountdown(0)
    setIsCount(true)
    setCards(shuffledCards)
    setTurns(0)
    setHideButton(true)
    setIsWin(false)
  }
  const shuffleCards2 = () => {
    const shuffledCards = [...cardImages2, ...cardImages2]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChosenCards(cardImages2)
    setGameOver(false)
    setCountdown(0)
    setIsCount(true)
    setCards(shuffledCards)
    setTurns(0)
    setHideButton(true)
    setIsWin(false)
  }


  //4x4
  const fourByFour = () => {
    setMatchQuantity(0)
    setChosenNumber(1)
    shuffleCards()
    setCountdown(70)
  }


  //6x6
  const sixBySix = () => {
    setMatchQuantity(0)
    setChosenNumber(2)
    shuffleCards2()
    setCountdown(200)
  }


  //6x4
  const sixByFour = () => {
    setMatchQuantity(0)
    setChosenNumber(3)
    shuffleCards1()
    setCountdown(150)
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
        console.log(matchQuantity);
        if (matchQuantity === chosenCards.length - 1) {
          setIsWin(true)
          setCountdown(-1)
          setIsCount(false)

          setTimeout(() => { setHideButton(false) }, 3000)

        }
        resetTurn()
      }
      else {
        setTimeout(() => resetTurn(), 400)

      }
    }
  }, [choiceOne, choiceTwo, countdown, matchQuantity])


  useEffect(() => {
    if (!isWin) {
      countdown > -1 && setTimeout(() => setCountdown(countdown - 1), 1000)
      if (countdown === 0) {
        setHideButton(false)
        setIsCount(false)
        setGameOver(true)
        setChosenNumber(0)
      }
    }
  }, [countdown, isWin])



  //reset choices
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  return (
    <div className="App mx-auto min-h-[100vh]">
      <div className="space-y-5">
        <div className="flex justify-center mt-5 ">
          <h1 className="text-white bg-red-500 p-5 rounded-lg font-bold text-4xl text-center">Token Matching Game</h1>
        </div>
        <div className={`${hideButton ? 'hidden' : 'block'} space-x-10 flex justify-center`}>
          <button
            onClick={fourByFour}
            className={` text-white hover:text-black bg-black hover:bg-white transition ease-in duration-200 rounded-md text-2xl border-4 p-2 border-white`}>
            4x4 70sec
          </button>
          <button
            onClick={sixByFour}
            className={` text-white hover:text-black bg-black hover:bg-white transition ease-in duration-200 rounded-md text-2xl border-4 p-2 border-white`}>
            6x4 150sec
          </button>
          <button
            onClick={sixBySix}
            className={` text-white hover:text-black bg-black hover:bg-white transition ease-in duration-200 rounded-md text-2xl border-4 p-2 border-white`}>
            6x6 200sec
          </button>

        </div>
      </div>
      <div className={`${isCount ? 'flex' : 'hidden'} justify-center`}>
        <div className="text-4xl text-blue-500 text-center my-5 px-10 py-2 rounded-xl bg-white">{countdown}</div>
      </div>
      <div className={`${gameOver && isWin === false ? 'flex' : 'hidden'} justify-center text-white text-4xl`}>
        <div className="bg-black px-10 py-3 my-4 rounded-lg">Game Over</div>
      </div>
      <div className={`${isWin ? 'flex' : 'hidden'} justify-center text-white text-4xl `}>
        <div className="bg-black px-10 py-3 my-4 rounded-lg">
          You Win
        </div>

      </div>
      <div className={`${isWin ? 'flex' : 'hidden'} justify-center text-white text-4xl `}>
        <div className='bg-black px-10 py-3 my-4 rounded-lg'>Total turns: {turns}</div>
      </div>
      <div className={`${chosenNumber === 1 ? 'grid-cols-4 px-96' : chosenNumber === 2 ? 'grid-cols-6 px-72' : chosenNumber === 3 ? 'grid-cols-6 px-72' : 'hidden'} container mt-10  mx-auto place-items-center grid grid-cols-4 gap-5`}>
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


