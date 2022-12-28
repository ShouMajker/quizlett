import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 5000)
    }, [])
    return (
        // Redirect immediately user if he has typed a wrong url
        // <Navigate to='/' />
        <div className='container'>
            <div className='container-opacity'>
            <p className='container-title'>Błąd wczytywania strony: <span className='result'>404</span></p>
            <p className='container-title'>Za chwile zostaniesz przekierowany na stronę główną</p>

            </div>
        </div>
    )
}

export default NotFound