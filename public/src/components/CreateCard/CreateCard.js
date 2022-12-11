
import React, { Component } from "react"
import Axios from "axios"
import { Navigate } from "react-router-dom"

export default class CreateCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            card: "",
            cardCreated: false
        }

        this.port = '3001'
        this.CreatingCard = this.CreatingCard.bind()
    }

    CreatingCard = (event) => {
        event.preventDefault()

        if(this.card !== "") {
            Axios.post(`http://localhost:${this.port}/api/createCard`, {tableName: this.state.card})
            this.setState({cardCreated: true})
        } else {
            alert("Nieprawidłowa nazwa tabeli")
        }
    }

    render () {
        return (
            <>
                {this.state.cardCreated && (
                    <Navigate to={`/editCard/${this.state.card}`}/>
                )}
                <h1>Tworzenie fiszki</h1>
                <label htmlFor="cardName">Nazwa fiszki</label>
                <input
                    id="cardName"
                    name="cardName"
                    placeholder="Wpisz nazwę fiszki"
                    onChange={(e) => this.setState({card: e.target.value})}
                    value={this.state.card}/>
                <button onClick={this.CreatingCard}>Stwórz fiszkę</button>
            </>
        )
    }
}