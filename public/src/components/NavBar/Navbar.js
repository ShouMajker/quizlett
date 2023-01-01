import React from "react"
import { NavLink } from "react-router-dom"
import './NavBar.css'

const Navbar = () => {
    return (
        <nav className="top-nav">
            <div>
                <NavLink className='logo' to='/'>Fiszki</NavLink>
            </div>
            <input id="menu-toggle" type="checkbox" />
            <label className='menu-button-container' htmlFor="menu-toggle">
                <div className='menu-button'></div>
            </label>
            <ul className="menu">
                <li>
                    <NavLink className='navbar-link' to='/'>Strona główna</NavLink>
                </li>
                <li>
                    <NavLink className='navbar-link' to='/createCard'>Stwórz fiszkę</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar