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
    const [currentTables, setCurrentTables] = useState([])
    const [cardGroupId, setCardGroupId] = useState(null)
    const [editedGroupName, setEditedGroupName] = useState('')
    const [isWrongName, setIsWrongName] = useState(false)
    const [isAlreadyExist, setIsAlredyExist] = useState(false)
    const [isGroupCreated, setIsGroupCreated] = useState(false)
    const [deletingGroup, setDeletingGroup] = useState({
        deleting: false,
        groupName: ''
    })

    useEffect(() => {
        Axios.get(`${axiosData.url}/api/getAllCards`, {params: {prefix: `group_${cardName}_`}})
        .then(res => {
            setCurrentTables(
                res.data.filter(item => item.tables.includes(`group_${cardName}_`))
            )
        })
        .catch(error => {
            console.log(error)
        })
        Axios.get(`${axiosData.url}/api/`)
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
        setCardGroupId(group.id)
        const slicedName = group.tables.slice(7 + cardName.length)
        setEditedGroupName(slicedName)
    }

    const handleEditGroupName = (event) => {
        event.preventDefault()
        setEditedGroupName(event.target.value)
    }

    const handleGroupNameSave = (tableName) => {
        if(editedGroupName.trim() === '') {
            setIsWrongName(true)
            return
        }

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

    const deleteGroup = (groupName) => {
        Axios.post(`${axiosData.url}/api/deleteGroup`, {deletedTable: `group_${cardName}_${groupName}`})
        setDeletingGroup({deleting: false, groupName: ''})
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
                <div>
                    {currentTables.length === 0 ? (
                        <div className='group-container'>
                            <p className='container-title'>Wygląda na to, że nie masz jeszcze żadnych grup 🧐</p>
                        </div>
                    ) : (
                        <div>
                            <form className='container-opacity resize-container'>
                                <table className='table'>
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
                    )}
                </div>
            </div>
        </>
    )
}

export default CardGroups