import React from "react"
import { NavLink } from "react-router-dom"
import './NavBar.css'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <NavLink className='logo' to='/'>Quizzlet</NavLink>
            <ul className='navbar-list'>
                <li className='navbar-item'>
                    <NavLink className='navbar-link' to='/'>Strona główna</NavLink>
                </li>
                <li className='navbar-item'>
                    <NavLink className='navbar-link' to='/createCard'>Stwórz fiszkę</NavLink>
                </li>
            </ul>

        </nav>
    )
}

export default Navbar