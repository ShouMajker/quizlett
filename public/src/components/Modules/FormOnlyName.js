import React from "react";

const FormOnlyName = (props) => {
    return (
        <div className='formContainer'>
            <h1>Tworzenie: {props.info}</h1>
            <label htmlFor='inputName'>Nazwa elementu</label>
            <input
                type='text'
                id='inputName'
                className='inputName'
                placeholder='Wpisz nazwę'
                onChange={props.onChangeHandler}
                value={props.value}
            />
            <button onClick={props.onClickHandler}>Stwórz</button>
        </div>
    )
}
export default FormOnlyName