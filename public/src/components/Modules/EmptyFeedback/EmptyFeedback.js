import React from 'react'

const EmptyFeedback = ({message}) => {
    return (
        <div className='group-container'>
            <p className='container-title'>{message} 🧐</p>
        </div>
    )
}

export default EmptyFeedback