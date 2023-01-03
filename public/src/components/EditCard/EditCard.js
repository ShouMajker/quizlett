import React, {useState, useEffect, Fragment} from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'

import axiosData  from './../Modules/Connection'
import EditableRow from './EditableRow'
import ReadOnlyRow from './ReadOnlyRow'
import EmptyFeedback from '../Modules/EmptyFeedback/EmptyFeedback'

import Loader from '../Modules/Loader/Loader'

const EditCard = () => {
    const [allRecords, setAllRecords] = useState([])
    const [englishPhrase, setEnglishPhrase] = useState('')
    const [polishPhrase, setPolishPhrase] = useState('')
    const [favouriteInForm, setFavouriteInForm] = useState(0)
    const [editCardData, setEditCardData] = useState({
        english: '',
        polish: '',
    })
    const [editCardId, setEditCardId] = useState(null)
    const [loading, setLoading] = useState(false)


    const {cardName, groupName} = useParams()
    const tableName = `group_${cardName}_${groupName}`

    // Getting all data from table
    useEffect(() => {
        setLoading(true)
        Axios.get(`${axiosData.url}/api/getAllRecords`, {params: {selectedTable: tableName}})
        .then(res => {
            setLoading(false)
            setAllRecords(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const formSubmit = (e) => {
        e.preventDefault()
        if(englishPhrase === '' || polishPhrase === '') {
            alert('Uzupełnij wszystkie pola!')
            return
        }
        Axios.post(`${axiosData.url}/api/addNewRecord`,
        {
            tableName: tableName,
            english: englishPhrase,
            polish: polishPhrase,
            favourite: favouriteInForm
        })
        setEnglishPhrase('')
        setPolishPhrase('')
        setFavouriteInForm(0)
        window.location.reload()
    }

    // Set default values when user wants to edit a row
    const handleEditClick = (event, card) => {
        event.preventDefault()
        setEditCardId(card.id)

        const cardValues = {
            english: card.english,
            polish: card.polish,
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

        Axios.post(`${axiosData.url}/api/updateRecord`, {newValues: editedCard})
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
        Axios.post(`${axiosData.url}/api/deleteRecord`, {deleteData: deletedCard})
        window.location.reload()

    }

    const handleChangeFavourite = (event, cardId, favourite) => {
        event.preventDefault()
        const data = {
            tableName: tableName,
            id: cardId,
            value: favourite === 0 ? 1 : 0
        }
        Axios.post(`${axiosData.url}/api/changeFavourite`, {changeData: data})
        window.location.reload()

    }

    return (
        <main className='container'>
            <div>
                <div className='container-opacity'>
                    <div className='group-container'>
                        <p className='container-title'>
                            Edycja grupy {groupName}
                        </p>
                    </div>
                    <form onSubmit={formSubmit} className='group-container'>
                        <div className='input-container'>
                            <label className='input-label' htmlFor='englishText'>Fraza angielska</label>
                            <input
                                autoFocus
                                className='form-input'
                                type='text'
                                id='englishText'
                                name='englishText'
                                value={englishPhrase}
                                onChange={(e) => setEnglishPhrase(e.target.value)}
                                autoComplete="off"
                                required
                            />
                            <span className='input-border-bottom'/>
                        </div>
                        <div className='input-container'>
                            <label htmlFor='polishText' className='input-label'>Fraza polska</label>
                            <input
                                className='form-input'
                                type='text'
                                id='polishText'
                                name='polishText'
                                value={polishPhrase}
                                onChange={(e) => setPolishPhrase(e.target.value)}
                                autoComplete="off"
                                required
                            />
                            <span className='input-border-bottom'/>
                        </div>
                        <div className='input-container'>
                            <input
                                className='form-checkbox'
                                type='checkbox'
                                id='favourite'
                                name='favorite'
                                value={favouriteInForm}
                                onChange={(e) => setFavouriteInForm(e.target.checked)}
                            />
                            <label htmlFor='favourite'><span>Ulubiony</span></label>
                        </div>
                        <button className='button'>Dodaj</button>
                    </form>
                </div>
            </div>
            <div className={loading ? 'table-container' : 'table-container w-90'}>
                {loading ? <Loader /> :
                    allRecords.length === 0 ? (
                        <EmptyFeedback
                            message='Wygląda na to, że nie masz jeszcze żadnych tłumaczeń'
                        />
                    ) : (
                        <div>
                            <form className='container-opacity resize-container'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Tekst angielski</th>
                                            <th>Tekst polski</th>
                                            <th></th>
                                            <th>Akcje</th>
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
                                                            handleCancelClick={handleCancelClick}
                                                            handleEditCardSave={handleEditCardSave}
                                                        />
                                                    ) : (
                                                        <ReadOnlyRow
                                                            key={index}
                                                            card={card}
                                                            handleEditClick={handleEditClick}
                                                            handleDeleteClick={handleDeleteClick}
                                                            handleChangeFavourite={handleChangeFavourite}
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
        </main>
    )
}
export default EditCard