import React from 'react';
import { Link } from 'react-router-dom';
import Edit from './../../Graphics/edit.png'
import Approval from './../../Graphics/approval.png'
import Delete from './../../Graphics/delete.png'
import Learn from './../../Graphics/learn.png'

const GroupReadOnlyRow = ({group, currentTable, handleEditClick, handleDeletingGroup}) => {

    const groupName = group.tables.slice(7 + currentTable.length)

    return (
        <tr>
            <td>{group.id}</td>
            <td>{groupName}</td>
            <td className='table-td-action'>
                <div className='edit-container' onClick={(event) => handleEditClick(event, group)}>
                    <img className='table-img' src={Edit} alt='edit name'/>
                    <span className='table-button'>Edytuj nazwę</span>
                </div>
            </td>
            <td>
                <Link to={`${groupName}/edit`} className='table-td-action'>
                    <img className='table-img' src={Edit} alt='edit'/>
                    <span>Edytuj</span>
                </Link>
            </td>
            <td>
                <Link to={`${groupName}/learn`} className='table-td-action'>
                    <img className='table-img' src={Learn} alt='learn' />
                    <span>Ucz się</span>
                </Link>
            </td>
            <td>
                <Link to={`${groupName}/test`} className='table-td-action'>
                    <img className='table-img' src={Approval} alt='test'/>
                    <span>Test</span>
                </Link>
            </td>
            <td>
                <Link className='table-td-action' onClick={() => handleDeletingGroup({deleting: true, groupName: groupName})}>
                    <img className='table-img' src={Delete} alt='delete' />
                    <span className='delete'>Usuń</span>
                </Link>
            </td>
        </tr>
    )
}

export default GroupReadOnlyRow