import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import Axios from 'axios'
import './HomePage.css'
import axiosData from "../Modules/Connection"


const HomePage = () => {

    const port = '3001'
    
    const [cardsList, setCardsList] = useState([]);

    useEffect(() => {
        Axios.get(`${axiosData.url}/api/getAllCards`, {params: {prefix: 'card'}})
        .then(res => {
            setCardsList(res.data)
        })
    }, [])

    const deleteCard = (cardName) => {
        console.log(cardName)
        Axios.post(`${axiosData.url}/api/deleteCard`, {cardName: cardName})
        .then(() => alert(`Fiszka ${cardName} została pomyślnie usunięta`))
        .catch(err => console.log(err))
    }

    return (
        <>
            <h1>Witaj w quizlett</h1>
            <h3>Lista fiszek:</h3>
            <div className="tableContainer">

                {/* In the future add a feature that will allow user to search for his specified card name:
                useSearchParams, exact as the useState, search input  */}

                {cardsList.length !== 0 ? (
                    // Show table containing all cards
                    <table className="cardsTable">
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
                                        <td><Link to={`cardGroups/${value.tables.toString().slice(5)}`} className="tdBtn">Edytuj</Link></td>
                                        <td><a href='#' className="tdBtn">Test</a></td>
                                        <td><Link reloadDocument to='/' className="tdDelete" onClick={() => deleteCard(value.tables.toString().slice(5))}>Usuń</Link></td>
                                    </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                ) : (
                    // Show info, there is no tables
                    <div className="tableEmptyInfo">
                        <h1 className="emptyInfo">Nie masz jeszcze żadnych fiszek :-C</h1>
                        <Link className='btnCreateCard' to='/createCard'>Stwórz fiszkę</Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default HomePage