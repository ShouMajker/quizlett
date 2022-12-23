import React from 'react'
import Save from '../../Graphics/check.png'
import Cancel from '../../Graphics/close.png'

const EditableRow = ({editCardData, handleEditCardData, handleCancelClick, handleEditCardSave}) => {
    
    return (
        <tr>
            <td>
                <input
                    autoFocus
                    className='form-edit-input'
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
                    className='form-edit-input'
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
            <td className='table-td-action'>
                <div className='edit-container' onClick={handleEditCardSave}>
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

export default EditableRow