import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

import axiosData from '../Modules/Connection'
import TestInput from '../Modules/TestInput/TestInput'
import TestFeedback from '../Modules/TestInput/TestFeedback'
import TestResult from '../Modules/TestResult/TestResult'
import EmptyFeedback from '../Modules/EmptyFeedback/EmptyFeedback'

import './TestOnlyGroup.css'

const TestOnlyGroup = () => {

    const { cardName, groupName } = useParams()
    const [allRecords, setAllRecords] = useState([])
    const [id, setId] = useState(0)
    const [choice, setChoice] = useState()
    const [word, setWord] = useState('')
    const [incorrent, setIncorrect] = useState([])
    const [correct, setCorrect] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [isEnded, setIsEnded] = useState(false)
    
    const tableName = `group_${cardName}_${groupName}`

    //Get all words with its translates
    useEffect(() => {
        Axios.get(`${axiosData.url}/api/getAllRecords`, {params: {selectedTable: tableName}})
        .then(res => {

            //Shuffling our records array
            setAllRecords(Array.from(res.data).sort(
                    (a, b) => 0.5 - Math.random()
                )
            )

            //Adding one additional property, which will be containing the index of its position in array
            setAllRecords(prev => prev.map((record, index) => {
                return ({
                    drawIndex: index,
                    id: record.id,
                    english: record.english,
                    polish: record.polish,
                    favourite: record.favourite
                })
            }))
            randChoice()
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const dataValues = Object.values(allRecords.find(item => item.drawIndex === id) || {})
    
    //Either tranlate from polish or english
    const randChoice = () => {
        return Math.random() > 0.5 ? setChoice('english') : setChoice('polish')
    }

    const handleOnChange = (event) => {
        event.preventDefault()
        setWord(event.target.value)
    }
    
    const correctAnswer = () => {
        setCorrect(prev => [{
            id: dataValues[1],
            english: dataValues[2],
            polish: dataValues[3],
            favourite: dataValues[4]
        },
        ...prev ])
    }

    const incorrentAnswer = (language) => {
        setIncorrect(prev => [{
            id: dataValues[1],
            english: dataValues[2],
            polish: dataValues[3],
            favourite: dataValues[4],
            userInput: word,
            languageToTranslate: language
        },
        ...prev ])
    }


    const handleOnKeyDown = (event) => {
        event.preventDefault()
        setId(prev => prev + 1)
        setWord('')
        randChoice()

        //Checking if user has entered the correct input
        if(choice === 'english') {
            if(word.trim() === dataValues[3]) {
                correctAnswer()
            } else {
                incorrentAnswer('polish')
            }
        } else {
            if(word.trim() === dataValues[2]) {
                correctAnswer()
            } else {
                incorrentAnswer('english')
            }
        }

        if((id + 1) === allRecords.length) {
            setIsEnded(true)
            setShowResult(true)
        }
    }

    const closeWindow = () => {
        setShowResult(false)
    }

    return (
        <>
            <TestResult
                total={`${correct.length} / ${allRecords.length}`}
                percent={`${Math.round((correct.length / allRecords.length) * 100)}%`}
                handleCloseWindow={closeWindow}
                seen={showResult ? 'test-ended' : ''}
            />
            <main className='main-container'>
            {allRecords.length < 5 ? (
                <div className='main'>
                    <EmptyFeedback
                        message='Aby rozpocząć test musisz mieć conajmniej 5 tłumaczeń'
                    />
                </div>
            ) : (
                <>
                    <div className='test-container'>
                        <p className='container-title'>Test z grupy: <span className='group-name'>{groupName}</span></p>
                        {!isEnded &&
                            <form className='form' onSubmit={handleOnKeyDown}>
                                <TestInput
                                    choice={choice}
                                    wordValue={word}
                                    data={allRecords.find(item => item.drawIndex === id)}
                                    handleOnChange={handleOnChange}
                                />
                                <span className='counter'>{id + 1} / {allRecords.length}</span>
                            </form>
                        }
                    </div>
                    <div className='results-container'>
                        <div className='incorrects-container resize-container'>
                            <p className='container-title'>Niepoprawne</p>
                            {
                                incorrent.length !== 0 ? (
                                    incorrent.map((item, index) => (
                                        <TestFeedback
                                            key={index}
                                            type={'incorrect'}
                                            drawWord={item.languageToTranslate === 'polish' ? item.english : item.polish}
                                            userInput={item.userInput}
                                            correctTranslate={item.languageToTranslate === 'polish' ? item.polish : item.english}
                                            isFavourite={item.favourite}
                                        />
                                    ))
                                ) : <p className='container-title'>Oby tak dalej 🥳</p>
                            }
                        </div>
                        <span className='seperated-line'></span>
                        <div className='corrects-container resize-container'>
                            <p className='container-title'>Poprawne</p>
                            {
                                correct.length !== 0 ? (
                                    correct.map((item, index) => (
                                        <TestFeedback
                                            key={index}
                                            type={'correct'}
                                            drawWord={item.languageToTranslate === 'polish' ? item.english : item.polish}
                                            correctTranslate={item.languageToTranslate === 'polish' ? item.polish : item.english}
                                            isFavourite={item.favourite}
                                        />
                                    ))
                                ) : null
                            }
                        </div>
                    </div>
                </>
            )}
            </main>
        </>
    )
}

export default TestOnlyGroup