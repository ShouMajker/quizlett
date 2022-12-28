import React from 'react'
import correctImage from './../../../Graphics/correct.png'
import incorrectImage from './../../../Graphics/incorrect.png'
import Star from './../../../Graphics/star.png'
import StarFilled from './../../../Graphics/starFilled.png'
import './TestFeedback.css'

const TestFeedback = ({type, drawWord, userInput, correctTranslate, isFavourite}) => {

    return (
        <div className='feedback-container'>
            <div className='img-container left'>
                <img className='feedback-icon' src={type === 'correct' ? correctImage : incorrectImage} alt='result' />
            </div>
            <div className='feedback-info-container'>
                { type === 'incorrect' && <span className='feedback-incorrect'>{userInput}</span> }
                <span className='feedback-translate'>{drawWord} ➔ {correctTranslate}</span>
            </div>
            <div className='star-container right'>
                <img className='favourite-icon' src={isFavourite ? StarFilled : Star} alt='star' />
            </div>
        </div>
    )
}

export default TestFeedback