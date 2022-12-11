import React, { useState } from "react"

import './LearningPage.css'

const RotatingCard = (props) => {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = () => {
        setIsFlipped(!isFlipped)
    }

    return (
        <div className='scene'>
            <div className={!isFlipped ? 'card' : 'card cardFlipped'} onClick={handleClick}>
                <div className='cardSide english'>
                    {props.data.english}
                </div>
                <div className='cardSide polish'>
                    {props.data.polish}
                </div>
            </div>
        </div>
    )
}

export default RotatingCard