import React, { Component } from "react"
import Axios from "axios"
import { Navigate } from "react-router-dom"
import './CreateCard.css'
import axiosData from "../Modules/Connection"

export default class CreateCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            card: "",
            cardCreated: false
        }
        this.CreatingCard = this.CreatingCard.bind()
    }

    CreatingCard = (event) => {
        event.preventDefault()
        Axios.post(`${axiosData.url}/api/createCard`, {tableName: this.state.card})
        this.setState({cardCreated: true})
    }

    render () {
        return (
            <main className='main-container'>
                <div className='container-opacity'>
                    {this.state.cardCreated && (
                        <Navigate to={`/cardGroups/${this.state.card}`}/>
                    )}
                    <div className='group-container'>
                        <p className='container-title'>Tworzenie fiszki</p>
                    </div>
                    <div className='group-container'>
                        <label className='input-label' htmlFor="cardName">Nazwa fiszki</label>
                        <input
                            className='form-input'
                            id="cardName"
                            name="cardName"
                            placeholder="Wpisz nazwę fiszki"
                            onChange={(e) => this.setState({card: e.target.value})}
                            value={this.state.card}
                            autoComplete='off'
                            required
                        />
                        <span className='input-border-bottom'/>
                        <button className='button' onClick={this.CreatingCard}>Stwórz fiszkę</button>
                    </div>
                </div>
            </main>
        )
    }
}