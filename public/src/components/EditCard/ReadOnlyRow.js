import React from 'react';

const ReadOnlyRow = ({card, handleEditClick, handleDeleteClick}) => {
    return (
        <tr>
            <td>{card.english}</td>
            <td>{card.polish}</td>
            <td>
                <button className='tdBtn' onClick={(event) => handleEditClick(event, card)}>Edytuj</button>
                <button className='tdDelete' onClick={() => handleDeleteClick(card.id)}>Usuń</button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow