import React from 'react'

export default function Card({card, handleChoice, flipped, disabled}) {

    const handleClick =()=>{
        if(!disabled){
            handleChoice(card)
        }
        
    }

    return (
        <div className='card '>
            <div className={flipped ? 'flipped': ''}>
                <img src={card.src} alt='card-front' className=" front bg-black border-2 w-[200px] rounded-lg border-white" />
                <img src='/img/cover.png' 
                alt='card-back' 
                onClick={handleClick} 
                className=" back border-2 rounded-lg border-white"
                />
            </div>

        </div>
    )
}
