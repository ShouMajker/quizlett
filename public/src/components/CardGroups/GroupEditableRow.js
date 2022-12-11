import React from 'react';

const GroupEditableRow = ({id, group, editedGroupName, handleEditGroupName, handleCancelClick, handleGroupNameSave}) => {
    return (
        <tr>
            <td>{id}</td>
            <td>
                <input
                    type='text'
                    value={editedGroupName}
                    placeholder='Wprowadź nazwę grupy'
                    name='groupName'
                    onChange={handleEditGroupName}
                    required
                />
            </td>
            <td>
                <button onClick={() => handleGroupNameSave(group.tables)}>Zapisz</button>
                <button onClick={handleCancelClick}>Anuluj</button>
            </td>
        </tr>
    )
}

export default GroupEditableRow