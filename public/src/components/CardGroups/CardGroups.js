import React, { useState, useEffect, Fragment } from "react"
import { Navigate, useParams } from "react-router-dom"
import Axios from 'axios'
import FormOnlyName from "../Modules/FormOnlyName/FormOnlyName"
import GroupReadOnlyRow from "./GroupReadOnlyRow"
import GroupEditableRow from "./GroupEditableRow"
import FormFeedback from "../Modules/FormFeedback/FormFeedback"
import axiosData from "../Modules/Connection"

const CardGroups = () => {

    const {cardName} = useParams()

    const [groupName, setGroupName] = useState('')
    const [tablesFromDb, setTablesFromDb] = useState([])
    const [currentTables, setCurrentTables] = useState([])
    const [cardGroupId, setCardGroupId] = useState(null)
    const [editedGroupName, setEditedGroupName] = useState('')
    const [isWrongName, setIsWrongName] = useState(false)
    const [isAlreadyExist, setIsAlredyExist] = useState(false)
    const [isGroupCreated, setIsGroupCreated] = useState(false)

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

        if(!(groupName.trim()) || groupName.includes('group') || groupName.includes('card')) {
            setIsWrongName(true)
            setTimeout(() => {
                setIsWrongName(false)
            }, 2000)
            return
        }
        if(tablesFromDb.filter(data => data.tables === groupNameToSend).length > 0) {
            setIsAlredyExist(true)
            setTimeout(() => {
                setIsWrongName(false)
            }, 2000)
            return
        }
        Axios.post(`${axiosData.url}/api/CreateNewGroup`, {tableName: groupNameToSend})
        setIsGroupCreated(true)
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
    
    const handleCloseWindow = () => {
        setIsAlredyExist(false)
        setIsWrongName(false)
    }

    return (
        <>
            {isGroupCreated && (
                <Navigate to={`/cardGroups/${cardName}/${groupName}/edit`} />
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
            <div className='container'>
                <FormOnlyName
                    creatingElementName='grupy'
                    value={groupName}
                    onChangeHandler={(event) => setGroupName(event.target.value)}
                    onSubmitHandler={createGroup}
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
        </>
    )
}

export default CardGroups