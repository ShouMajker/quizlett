import React from 'react'
import './Loader.css'

const Loader = () => {
    return (
        <div className='container-opacity'>
            <div class="lds-dual-ring"></div>
            <p className='container-title'>Pobieranie danych...</p>
        </div>
    )
}

export default Loader