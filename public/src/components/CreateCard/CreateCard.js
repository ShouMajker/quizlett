import React, { Component, useEffect, useState } from "react"
import Axios from "axios"
import { Navigate } from "react-router-dom"
import axiosData from "../Modules/Connection"
import './CreateCard.css'
import FormFeedback from "../Modules/FormFeedback/FormFeedback"
import FormOnlyName from "../Modules/FormOnlyName/FormOnlyName"

const CreateCard = () => {
    const [cardName, setCardName] = useState('')
    const [tablesFromDb, setTablesFromDb] = useState([])
    const [currentTables, setCurrentTables] = useState([])
    const [isWrongName, setIsWrongName] = useState(false)
    const [isAlreadyExist, setIsAlredyExist] = useState(false)
    const [isCardCreated, setIsCardCreated] = useState(false)

    useEffect(() => {
        Axios.get(`${axiosData.url}/api/getAllCards`, {params: {prefix: `card_${cardName}`}})
        .then(res => {
            setTablesFromDb(res.data)
            setCurrentTables(
                res.data.filter(item => item.tables.includes(`card_${cardName}`))
            )
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const createCard = (event) => {
        event.preventDefault()
        const nameToSend = `card_${cardName}`

        if(!(cardName.trim()) || cardName.includes('group') || cardName.includes('card')) {
            setIsWrongName(true)
            setTimeout(() => {
                setIsWrongName(false)
            }, 2000)
            return
        }

        if(tablesFromDb.filter(data => data.tables === nameToSend).length > 0) {
            setIsAlredyExist(true)
            setTimeout(() => {
                setIsWrongName(false)
            }, 2000)
            return
        }

        Axios.post(`${axiosData.url}/api/createCard`, {tableName: cardName})
        setIsCardCreated(true)
    }

    const handleCloseWindow = () => {
        setIsAlredyExist(false)
        setIsWrongName(false)
    }

    return (
        <main className='main-container'>
            {isCardCreated && (
                <Navigate to={`/cardGroups/${cardName}`}/>
            )}
            <FormFeedback
                error={true}
                seen={isAlreadyExist ? 'seen' : ''}
                data={'Ta nazwa istnieje już w bazie danych!'}
                handleCloseWindow={handleCloseWindow}
            />
            <FormFeedback
                error={true}
                seen={isWrongName ? 'seen' : ''}
                data={'Nieprawidłowa nazwa!'}
                handleCloseWindow={handleCloseWindow}
            />
            <FormOnlyName
                creatingElementName='fiszki'
                value={cardName}
                onChangeHandler={(event) => setCardName(event.target.value)}
                onSubmitHandler={createCard}
            />
        </main>
    )
}

export default CreateCard