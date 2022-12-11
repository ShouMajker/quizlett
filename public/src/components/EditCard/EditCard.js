import Axios from 'axios'
import React, {useState, useEffect, Fragment} from 'react'
import { useParams } from 'react-router-dom'
import EditableRow from './EditableRow'
import ReadOnlyRow from './ReadOnlyRow'
import '../HomePage/HomePage.css'
import './EditCard.css'

const EditCard = () => {
    const [allRecords, setAllRecords] = useState([])
    const [englishPhrase, setEnglishPhrase] = useState('')
    const [polishPhrase, setPolishPhrase] = useState('')
    const [editCardData, setEditCardData] = useState({
        english: '',
        polish: ''
    })
    const [editCardId, setEditCardId] = useState(null)

    const {cardName, groupName} = useParams()
    const port = '3001'
    const url = `http://localhost:${port}`
    const tableName = `group_${cardName}_${groupName}`

    const formSubmit = (e) => {
        e.preventDefault()
        if(englishPhrase === '' || polishPhrase === '') {
            alert('Uzupełnij wszystkie pola!')
            return
        }
        Axios.post(`${url}/api/addNewRecord`,
        {
            tableName: tableName,
            english: englishPhrase,
            polish: polishPhrase
        })
        setEnglishPhrase('')
        setPolishPhrase('')
    }
    // Getting all data from table
    useEffect(() => {
        Axios.get(`${url}/api/getAllRecords`, {params: {selectedTable: tableName}})
        .then(res => {
            setAllRecords(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [allRecords, url, tableName])


    // Set default values when user wants to edit a row
    const handleEditClick = (event, card) => {
        event.preventDefault()
        setEditCardId(card.id)

        const cardValues = {
            english: card.english,
            polish: card.polish
        }

        setEditCardData(cardValues)
    }

    // Change values that user's changed in inputs
    const handleEditCardData = (event) => {
        event.preventDefault()
        const {name, value} = event.target

        setEditCardData(prevData => {
            return {...prevData, [name]: value}
        })
    }

    // Apply changes in the table
    const handleEditCardSave = (event) => {
        event.preventDefault()

        const editedCard = {
            tableName: tableName,
            id: editCardId,
            english: editCardData.english,
            polish: editCardData.polish
        }

        Axios.post(`${url}/api/updateRecord`, {newValues: editedCard})
        setEditCardId(null)
        window.location.reload()
    }

    const handleCancelClick = () => {
        setEditCardId(null)
    }

    const handleDeleteClick = (cardId) => {
        const deletedCard = {
            tableName: tableName,
            id: cardId
        }
        Axios.post(`${url}/api/deleteRecord`, {deleteData: deletedCard})
        window.location.reload()

    }

    return (
        <main>
            <h1 className='cardEditInfo'>Edycja grupy {groupName}</h1>
            <div className='container'>
                <form onSubmit={formSubmit} className='formContainer'>
                    <div className='inputContainer'>
                        <label htmlFor='englishText' className='formLabel'>Angielski:</label>
                        <input
                            className='formInput'
                            type='text'
                            id='englishText'
                            name='englishText'
                            value={englishPhrase}
                            onChange={(e) => setEnglishPhrase(e.target.value)}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className='inputContainer'>
                        <label htmlFor='polishText' className='formLabel'>Polski:</label>
                        <input
                            className='formInput'
                            type='text'
                            id='polishText'
                            name='polishText'
                            value={polishPhrase}
                            onChange={(e) => setPolishPhrase(e.target.value)}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <button className='addBtn'>Dodaj</button>
                </form>
                <div className='tableContainer'>
                    {allRecords.length === 0 ? (
                        <div className="tableEmptyInfo">
                        <h1 className="emptyInfo">Fiszka nie posiada pól!</h1>
                        </div>
                    ) : (
                        <form className='cardsTable' onSubmit={handleEditCardSave}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tekst angielski</th>
                                        <th>Tekst polski</th>
                                        <th>Czynności</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allRecords.map((card, index) => {
                                        return (
                                            <Fragment key={index}>
                                                {editCardId === card.id ? (
                                                    <EditableRow
                                                        key={index}
                                                        card={card}
                                                        editCardData={editCardData}
                                                        handleEditCardData={handleEditCardData}
                                                        handleCancelClick={handleCancelClick} />
                                                ) : (
                                                    <ReadOnlyRow
                                                        key={index}
                                                        card={card}
                                                        handleEditClick={handleEditClick}
                                                        handleDeleteClick={handleDeleteClick}/>
                                                )}
                                            </Fragment>
                                        )
                                    })}
                                <tr>
                                    <td colSpan={4}>Footer</td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    )}
                </div>
            </div>
        </main>
    )
}
export default EditCard