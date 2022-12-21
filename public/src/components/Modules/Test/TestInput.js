import React from "react"

const TestInput = ({choice, wordValue, data, handleOnChange}) => {
    const dataValues = Object.values(data || {})
    //[drawIndex, id, english, polish]
    
    return (
        <>
            <label className='input-label' htmlFor='test'>
                {choice === 'english' ? dataValues[2]: dataValues[3]}
            </label>
            <input
                id='testText'
                type='text'
                className='input'
                autoComplete='off'
                value={wordValue}
                onChange={handleOnChange}
                required
            />
            <span className='input-border-bottom'/>
        </>
    )
}

export default TestInput