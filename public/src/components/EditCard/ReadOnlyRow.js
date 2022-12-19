import React from 'react';
import Star from './../../Graphics/star.png'
import StarFilled from './../../Graphics/starFilled.png'

const ReadOnlyRow = ({card, handleChangeFavourite, handleEditClick, handleDeleteClick}) => {
    return (
        <tr>
            <td>{card.english}</td>
            <td>{card.polish}</td>
            <td>
                <img
                    src={card.favourite ? StarFilled : Star}
                    alt='star'
                    onClick={(event) => handleChangeFavourite(event, card.id, card.favourite)}
                />
            </td>
            <td>
                <button className='tdBtn' onClick={(event) => handleEditClick(event, card)}>Edytuj</button>
                <button className='tdDelete' onClick={() => handleDeleteClick(card.id)}>Usuń</button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow