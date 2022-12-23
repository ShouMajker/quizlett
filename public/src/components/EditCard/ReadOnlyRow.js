import React from 'react';
import { Link } from 'react-router-dom';
import Star from './../../Graphics/star.png'
import StarFilled from './../../Graphics/starFilled.png'
import Edit from '../../Graphics/edit.png'
import Delete from '../../Graphics/delete.png'

const ReadOnlyRow = ({card, handleChangeFavourite, handleEditClick, handleDeleteClick}) => {
    return (
        <tr>
            <td>{card.english}</td>
            <td>{card.polish}</td>
            <td className='table-td-action'>
                <img
                    className='favourite-icon'
                    src={card.favourite ? StarFilled : Star}
                    alt='star'
                    onClick={(event) => handleChangeFavourite(event, card.id, card.favourite)}
                />
            </td>
            <td>
                <Link className='table-td-action' onClick={(event) => handleEditClick(event, card)}>
                    <img className='table-img' src={Edit} alt='edit'/>
                    <span>Edytuj</span>
                </Link>
            </td>
            <td>
                <Link className='table-td-action' onClick={() => handleDeleteClick(card.id)}>
                    <img className='table-img' src={Delete} alt='delete' />
                    <span className='delete'>Usuń</span>
                </Link>
            </td>
        </tr>
    )
}

export default ReadOnlyRow