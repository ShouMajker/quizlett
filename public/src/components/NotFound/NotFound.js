import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 2000)
    }, [])
    return (
        // Redirect immediately user if he has typed a wrong url
        // <Navigate to='/' />
        <>
            <h1>Błąd wczytywania strony: 404</h1>
            <h3>Za chwile zostaniesz przekierowany na stronę główną</h3>
        </>
    )
}

export default NotFound