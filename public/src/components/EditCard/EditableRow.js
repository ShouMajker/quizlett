import React from 'react';

const EditableRow = ({editCardData, handleEditCardData, handleCancelClick}) => {
    return (
        <tr>
            <td>
                <input
                    type='text'
                    value={editCardData.english}
                    placeholder='Wprowadź angielską frazę'
                    name='english'
                    onChange={handleEditCardData}
                    required
                    autoComplete='off'
                />
            </td>
            <td>
                <input
                    type='text'
                    value={editCardData.polish}
                    placeholder='Wprowadź angielską frazę'
                    name='polish'
                    onChange={handleEditCardData}
                    required
                    autoComplete='off'
                />
            </td>
            <td></td>
            <td>
                <button>Zapisz</button>
                <button onClick={handleCancelClick}>Anuluj</button>
            </td>
        </tr>
    )
}

export default EditableRow