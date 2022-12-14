import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import Axios from 'axios'
import './HomePage.css'


const HomePage = () => {

    const port = '3001'
    
    const [cardsList, setCardsList] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:${port}/api/getAllCards`)
        .then(res => {
            setCardsList(res.data)
        })
    }, [])

    const deleteCard = (cardName) => {
        Axios.post(`http://localhost:${port}/api/deleteCard`, {cardName: cardName})
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

                {cardsList.length === 0 ? (
                        // Show info, there is no tables
                        <div className="tableEmptyInfo">
                            <h1 className="emptyInfo">Nie masz jeszcze żadnych fiszek :-C</h1>
                            <Link className='btnCreateCard' to='/createCard'>Stwórz fiszkę</Link>
                        </div>
                        ) : (
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
                                    <tr>
                                        <td key={index}>{value.tables.toString().slice(5)}</td>
                                        <td><Link to={`/cardGroups/${value.tables.toString().slice(5)}`} className="tdBtn">Edytuj</Link></td>
                                        <td><a href='#' className="tdBtn">Test</a></td>
                                        <td><Link reloadDocument to='/' className="tdDelete" onClick={() => deleteCard(value.tables.toString().slice(5))}>Usuń</Link></td>
                                    </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}

export default HomePage