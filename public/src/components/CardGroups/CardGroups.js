import React, { useState, useEffect, Fragment } from "react"
import { useParams } from "react-router-dom"
import Axios from 'axios'
import FormOnlyName from "../Modules/FormOnlyName"
import GroupReadOnlyRow from "./GroupReadOnlyRow"
import GroupEditableRow from "./GroupEditableRow"
import axiosData from "../Modules/Connection"

const CardGroups = () => {

    const {cardName} = useParams()

    const [groupName, setGroupName] = useState('')
    const [tablesFromDb, setTablesFromDb] = useState([])
    const [currentTables, setCurrentTables] = useState([])
    const [cardGroupId, setCardGroupId] = useState(null)
    const [editedGroupName, setEditedGroupName] = useState('')

    useEffect(() => {
        Axios.get(`${axiosData.url}/api/getAllCards`, {params: {prefix: `group_${cardName}`}})
        .then(res => {
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
        Axios.post(`${axiosData.url}/api/CreateNewGroup`, {tableName: groupNameToSend})
        setCurrentTables(prevTables => (
            [...prevTables, groupNameToSend]
        ))
        window.location.reload()
    }
    
    const handleEditClick = (event, group) => {
        event.preventDefault()
        setCardGroupId(group.id)
        const slicedName = group.tables.slice(7 + cardName.length)
        
        setEditedGroupName(slicedName)
    }

    const handleEditGroupName = (event) => {
        event.preventDefault()
        setEditedGroupName(event.target.value)
    }

    const handleGroupNameSave = (tableName) => {
        const edited = {
            cardName: cardName,
            tableName: tableName,
            newName: editedGroupName
        }

        Axios.post(`${axiosData.url}/api/updateGroupName`, {data: edited })
        setCardGroupId(null)
        window.location.reload()
    }

    const handleCancelClick = () => {
        setCardGroupId(null)
    }

    const handleDeleteClick = (groupName) => {
        Axios.post(`${axiosData.url}/api/deleteGroup`, {deletedTable: groupName})
        window.location.reload()
    }
    

    return (
        <div className='container'>
            <FormOnlyName
                info='grupa fiszki'
                value={groupName}
                onChangeHandler={(event) => setGroupName(event.target.value)}
                onClickHandler={createGroup}
            />
            {currentTables.length === 0 ? (
                <h1 className='emptyInfo'>Fiszka nie posiada grup!</h1>
            ) : (
                <form>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nazwa grupy</th>
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTables.map((table, index) => {
                                return (
                                    <Fragment key={index}>
                                        {cardGroupId === table.id ? (
                                            <GroupEditableRow
                                                key={index}
                                                id={table.id}
                                                group={table}
                                                editedGroupName={editedGroupName}
                                                handleEditGroupName={handleEditGroupName}
                                                handleCancelClick={handleCancelClick}
                                                handleGroupNameSave={handleGroupNameSave}
                                            />
                                        ) : (
                                            <GroupReadOnlyRow
                                                key={index}
                                                group={table}
                                                currentTable={cardName}
                                                handleEditClick={handleEditClick}
                                                handleDeleteClick={handleDeleteClick}
                                            />

                                        )}
                                    </Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </form>
            )}
        </div>
    )
}

export default CardGroups