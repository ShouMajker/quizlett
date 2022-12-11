import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Axios from 'axios'
import FormOnlyName from "../Modules/FormOnlyName"
import Table from "../Modules/Table"

const CardGroups = () => {

    const {cardName} = useParams()
    const port = '3001'
    const url = `http://localhost:${port}`

    const [groupName, setGroupName] = useState('')
    const [tablesFromDb, setTablesFromDb] = useState([])
    const [currentTables, setCurrentTables] = useState([])

    const columns = [
        {label: 'id', accessor: 'id'},
        {label: 'Nazwa grupy', accessor: 'tables'}
    ]

    useEffect(() => {
        Axios.get(`${url}/api/getAllCards`, {params: {tableName: cardName}})
        .then(res => {
            console.log(res)
            setTablesFromDb(res.data)
            setCurrentTables(
                res.data.filter(item => item.tables.includes(`group_${cardName}`))
            )
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const createGroup = (event) => {
        const groupNameToSend = `group_${cardName}_${groupName}`
        event.preventDefault()

        if(groupName === '') {
            alert('Nieprawidłowa nazwa!')
            return
        }
        if(tablesFromDb.filter(data => data.tables === groupNameToSend).length > 0) {
            alert('Taka nazwa grupy już istnieje w bazie!')
            return
        }
        Axios.post(`${url}/api/CreateNewGroup`, {tableName: groupNameToSend})
        setCurrentTables(prevTables => (
            [...prevTables, groupNameToSend]
        ))
    }
    
    return (
        <>
            <FormOnlyName
                info='grupa fiszki'
                value={groupName}
                onChangeHandler={(event) => setGroupName(event.target.value)}
                onClickHandler={createGroup}
            />
            {currentTables.length === 0 ? (
                <h1 className='emptyInfo'>Fiszka nie posiada grup!</h1>
            ) : (
                <Table columns={columns} tableData={currentTables}/>
            )}
        </>
    )
}

export default CardGroups