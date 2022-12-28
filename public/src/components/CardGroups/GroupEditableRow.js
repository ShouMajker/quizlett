import React from 'react';
import Save from '../../Graphics/check.png'
import Cancel from '../../Graphics/close.png'

const GroupEditableRow = ({group, editedGroupName, handleEditGroupName, handleCancelClick, handleGroupNameSave}) => {
    return (
        <tr>
            <td>
                <input
                    autoFocus
                    className='form-edit-input'
                    type='text'
                    value={editedGroupName}
                    name='groupName'
                    onChange={handleEditGroupName}
                    autoComplete='off'
                />
            </td>
            <td className='table-td-action'>
                <div className='edit-container' onClick={(event) => handleGroupNameSave(event, group.tables)}>
                    <img className='table-img' src={Save} alt='save' />
                    <span className='action-text'>Zapisz</span>
                </div>
            </td>
            <td className='table-td-action'>
                <div className='edit-container' onClick={handleCancelClick}>
                    <img className='table-img' src={Cancel} alt='cancel' />
                    <span className='action-text'>Anuluj</span>
                </div>
            </td>
        </tr>
    )
}

export default GroupEditableRow