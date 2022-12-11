import React from 'react';
import { Link } from 'react-router-dom';

const GroupReadOnlyRow = ({group, currentTable, handleEditClick, handleDeleteClick}) => {

    const groupName = group.tables.slice(7 + currentTable.length)

    return (
        <tr>
            <td>{group.id}</td>
            <td>{groupName}</td>
            <td>
                <button className='tdBtn' onClick={(event) => handleEditClick(event, group)}>Edytuj nazwę</button>
                <Link to={`${groupName}`} className='tdBtn'>Edytuj</Link>
                <Link to={`${groupName}/learn`} className='tdBtn'>Ucz się</Link>
                <button className='tdDelete' onClick={() => handleDeleteClick(group.tables)}>Usuń</button>
            </td>
        </tr>
    )
}

export default GroupReadOnlyRow