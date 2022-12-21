import React from 'react'
import './FormFeedback.css'
import CloseButton from './../../../Graphics/close.png'

const FormFeedback = ({seen, data, error, handleCloseWindow, handleDelete}) => {
    return (
        <div className={`form-feedback ${seen}`}>
            {error ? <p className='form-feedback-title'>Coś poszło nie tak 🤯!</p> : null }
            <p className='form-feedback-message'>⚠️ {data} ⚠️</p>
            {!error ? <button className='button' onClick={() => handleDelete()}>Tak, usuń</button> : null}
            <img className='form-feedback-close' src={CloseButton} alt='close' onClick={() => handleCloseWindow()}/>
        </div>
    )
}

export default FormFeedback