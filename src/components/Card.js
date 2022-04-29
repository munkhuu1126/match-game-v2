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
                <img src={card.src} alt='card-front' className=" front  w-[100px] rounded-full border border-white " />
                <img  src='/img/cover.png' 
                alt='card-back' 
                onClick={handleClick} 
                className=" back w-[100px] rounded-lg "
                />
            </div>

        </div>
    )
}
