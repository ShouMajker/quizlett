import React from 'react';
import Save from '../../Graphics/check.png'
import Cancel from '../../Graphics/close.png'

const GroupEditableRow = ({id, group, editedGroupName, handleEditGroupName, handleCancelClick, handleGroupNameSave}) => {
    return (
        <tr>
            <td>{id}</td>
            <td>
                <input
                    className='form-edit-input'
                    type='text'
                    value={editedGroupName}
                    name='groupName'
                    onChange={handleEditGroupName}
                    autoComplete='off'
                    required='required'
                />
            </td>
            <td className='table-td-action'>
                <div className='edit-container' onClick={() => handleGroupNameSave(group.tables)}>
                    <img className='table-img' src={Save} alt='save' />
                    <span className='table-button'>Zapisz</span>
                </div>
                <div className='edit-container' onClick={handleCancelClick}>
                    <img className='table-img' src={Cancel} alt='cancel' />
                    <span className='table-button'>Anuluj</span>
                </div>
            </td>
        </tr>
    )
}

export default GroupEditableRow