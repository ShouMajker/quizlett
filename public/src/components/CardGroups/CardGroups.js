import React, { useState, useEffect, Fragment } from "react"
import { Navigate, useParams } from "react-router-dom"
import Axios from 'axios'

import axiosData from "../Modules/Connection"
import FormOnlyName from "../Modules/FormOnlyName/FormOnlyName"
import GroupReadOnlyRow from "./GroupReadOnlyRow"
import GroupEditableRow from "./GroupEditableRow"
import FormFeedback from "../Modules/FormFeedback/FormFeedback"
import Loader from "../Modules/Loader/Loader"

const CardGroups = () => {

    const {cardName} = useParams()

    const [groupName, setGroupName] = useState('')
    const [currentTables, setCurrentTables] = useState([])
    const [cardGroupNameToEdit, setCardGroupNameToEdit] = useState(null)
    const [editedGroupName, setEditedGroupName] = useState('')
    const [isWrongName, setIsWrongName] = useState(false)
    const [isAlreadyExist, setIsAlredyExist] = useState(false)
    const [isGroupCreated, setIsGroupCreated] = useState(false)
    const [deletingGroup, setDeletingGroup] = useState({
        deleting: false,
        groupName: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        Axios.get(`${axiosData.url}/api/getAllCards`, {params: {prefix: `group_${cardName}_`}})
        .then(res => {
            setLoading(false)
            setCurrentTables(
                res.data.filter(item => item.tables.includes(`group_${cardName}_`))
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
        if(currentTables.filter(data => data.tables === groupNameToSend).length > 0) {
            setIsAlredyExist(true)
            setTimeout(() => {
                setIsAlredyExist(false)
            }, 2000)
            return
        }
        Axios.post(`${axiosData.url}/api/CreateNewGroup`, {tableName: groupNameToSend})
        setIsGroupCreated(true)
    }
    
    const handleEditClick = (event, group) => {
        event.preventDefault()
        const groupName = group.tables.slice(7 + cardName.length)
        const slicedName = group.tables.slice(7 + cardName.length)

        setCardGroupNameToEdit(groupName)
        setEditedGroupName(slicedName)
    }

    const handleEditGroupName = (event) => {
        event.preventDefault()
        setEditedGroupName(event.target.value)
    }

    const handleGroupNameSave = (event, tableName) => {
        event.preventDefault()
        if(editedGroupName.trim() === '') {
            setIsWrongName(true)
            return
        }
        if(currentTables.filter(data => data.tables === `group_${cardName}_${editedGroupName}`).length > 0) {
            setIsAlredyExist(true)
            return
        }

        const edited = {
            cardName: cardName,
            tableName: tableName,
            newName: editedGroupName
        }

        Axios.post(`${axiosData.url}/api/updateGroupName`, {data: edited })
        setCardGroupNameToEdit(null)
        window.location.reload()
    }

    const handleCancelClick = () => {
        setCardGroupNameToEdit(null)
    }

    const deleteGroup = (groupName) => {
        Axios.post(`${axiosData.url}/api/deleteGroup`, {deletedTable: `group_${cardName}_${groupName}`})
        setDeletingGroup({
            deleting: false,
            groupName: ''
        })
        window.location.reload()
    }
    
    const handleCloseWindow = () => {
        setIsAlredyExist(false)
        setIsWrongName(false)
        setDeletingGroup({
            deleting: false,
            groupName: ''
        })
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
            <FormFeedback
                seen={deletingGroup.deleting ? 'seen' : ''}
                data={'Jesteś pewny?'}
                error={false}
                handleCloseWindow={handleCloseWindow}
                handleDelete={() => deleteGroup(deletingGroup.groupName)}
            />
            <div className='container'>
                <div>
                    <FormOnlyName
                        creatingElementName='grupy'
                        value={groupName}
                        onChangeHandler={(event) => setGroupName(event.target.value)}
                        onSubmitHandler={createGroup}
                    />
                </div>
                <div className={loading ? 'table-container' : 'table-container w-90' }>
                    {loading ? <Loader /> :
                        currentTables.length === 0 ? (
                            <div className='group-container'>
                                <p className='container-title'>Wygląda na to, że nie masz jeszcze żadnych grup 🧐</p>
                            </div>
                        ) : (
                            <div>
                                <form className='container-opacity resize-container' onSubmit={handleGroupNameSave}>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Nazwa</th>
                                                <th>Akcje</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentTables.map((table, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        {cardGroupNameToEdit === table.tables.slice(7 + cardName.length) ? (
                                                            <GroupEditableRow
                                                                key={index}
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
                                                                handleDeletingGroup={setDeletingGroup}
                                                            />
                                                        )}
                                                    </Fragment>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default CardGroups