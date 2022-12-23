import React from 'react'
import { useNavigate } from 'react-router-dom'
import TestEndedPng from '../../../Graphics/finishedTest.png'
import Close from '../../../Graphics/close.png'
import './TestResult.css'

const TestResult = ({total, percent, handleCloseWindow, seen}) => {
    const navigation = useNavigate()
    
    return (
        <div className={`test-result ${seen}`}>
            <p className='container-title'>Gratulacje! Udało ci się przebrnąć przez test</p>
            <p className='container-title'>Twój wynik to: <span className='result'>{total} [{percent}]</span></p>
            <img className='test-ended-img' src={TestEndedPng} alt='Test ended'/>
            <div className='buttons-container'>
                <button className='button-result' onClick={() => window.location.reload()}>Spóbuj jeszcze raz</button>
                <span className='link-result' onClick={() => navigation(-1)}>Powrót do listy grup</span>
            </div>
            <img className='close-icon' src={Close} alt='close icon' onClick={() => handleCloseWindow()}/>
        </div>
    )
}

export default TestResult