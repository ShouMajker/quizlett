import React from "react"
import { NavLink } from "react-router-dom"
import './NavBar.css'

const Navbar = () => {
    return (
        <nav>
            <NavLink className='text-3xl font-bold underline' to='/' reloadDocument>Strona startowa</NavLink>
            <NavLink to='/createCard'>Stwórz fiszkę</NavLink>
        </nav>
    )
}

export default Navbar