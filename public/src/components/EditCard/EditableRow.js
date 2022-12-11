import React from 'react';

const EditableRow = ({editCardData, handleEditCardData, handleCancelClick}) => {
    return (
        <tr>
            <td>
                <input
                    type='text'
                    value={editCardData.english}
                    required='required'
                    placeholder='Wprowadź angielską frazę'
                    name='english'
                    onChange={handleEditCardData}
                />
            </td>
            <td>
                <input
                    type='text'
                    value={editCardData.polish}
                    required='required'
                    placeholder='Wprowadź angielską frazę'
                    name='polish'
                    onChange={handleEditCardData}
                />
            </td>
            <td>
                <button>Zapisz</button>
                <button onClick={handleCancelClick}>Anuluj</button>
            </td>
        </tr>
    )
}

export default EditableRow