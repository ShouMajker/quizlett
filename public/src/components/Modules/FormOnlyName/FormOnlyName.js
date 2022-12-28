import React from "react";
import './FormOnlyName.css'

const FormOnlyName = ({creatingElementName, onChangeHandler, onSubmitHandler, value}) => {
    return (
        <div className='container-opacity'>
            <div className='group-container'>
                <p className='container-title'>Tworzenie {creatingElementName}</p>
            </div>
            <form className='group-container' onSubmit={onSubmitHandler}>
                <div>
                    <label className='input-label' htmlFor="input">Nazwa {creatingElementName}</label>
                    <label className='input-info' htmlFor="input">Nie może zawierać: group, card</label>
                </div>
                <input
                    autoFocus
                    className='form-input'
                    id='input'
                    name="name"
                    onChange={onChangeHandler}
                    value={value}
                    autoComplete='off'
                />
                <span className='input-border-bottom'/>
                <button className='button'>Stwórz</button>
            </form>
        </div>
    )
}
export default FormOnlyName