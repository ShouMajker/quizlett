import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import Axios from 'axios'
import axiosData from "../Modules/Connection"
import './HomePage.css'
import Edit from './../../Graphics/edit.png'
import Approval from './../../Graphics/approval.png'
import Delete from './../../Graphics/delete.png'
import FormFeedback from './../Modules/FormFeedback/FormFeedback'


const HomePage = () => {
    const [cardsList, setCardsList] = useState([]);
    const [isDeletingCard, setIsDeletingCard] = useState({
        deleting: false,
        cardName: ''
    })

    useEffect(() => {
        Axios.get(`${axiosData.url}/api/getAllCards`, {params: {prefix: 'card'}})
        .then(res => {
            setCardsList(res.data)
        })
    }, [])

    const deleteCard = (cardName) => {
        Axios.post(`${axiosData.url}/api/deleteCard`, {cardName: cardName})
        .catch(err => console.log(err))
        setIsDeletingCard({deleting: false, cardName: ''})
        window.location.reload();
    }

    const handleCloseWindow = () => {
        setIsDeletingCard({deleting: false, cardName: ''})
    }

    return (
        <>
            <FormFeedback
                seen={isDeletingCard.deleting ? 'seen' : ''}
                data={'Jesteś pewny?'}
                error={false}
                handleCloseWindow={handleCloseWindow}
                handleDelete={() => deleteCard(isDeletingCard.cardName)}
            />
            <div className='main-container'>
                <div className="container-opacity resize-container">

                    {/* In the future, add a feature that will allow user to search for his specified card name:
                    useSearchParams, exact as the useState, search input  */}

                    {cardsList.length !== 0 ? (
                        // Show the table containing all cards
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Nazwa</th>
                                    <th colSpan={4}>Czynności</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cardsList.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{value.tables.toString().slice(5)}</td>
                                            <td>
                                                <Link to={`cardGroups/${value.tables.toString().slice(5)}`} className='table-td-action'>
                                                    <img className='table-img' src={Edit} alt='edit' />
                                                    <span>Edytuj</span>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to={`test/${value.tables.toString().slice(5)}`} className="table-td-action">
                                                    <img className='table-img' src={Approval} alt='approval' />
                                                    <span>Test</span>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to='/' className='table-td-action' onClick={() => setIsDeletingCard({deleting: true, cardName: value.tables.toString().slice(5)})}>
                                                    <img className='table-img' src={Delete} alt='delete' />
                                                    <span className='delete'>Usuń</span>
                                                </Link>
                                            </td>
                                        </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    ) : (
                        // Show info, there are no tables
                        <div className='group-container'>
                            <p className='container-title'>Wygląda na to, że nie masz jeszcze żadnych fiszek 🧐</p>
                            <Link className='button' to='/createCard'>Stwórz fiszkę</Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default HomePage