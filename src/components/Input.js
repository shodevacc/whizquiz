import React from 'react'
import styled from 'styled-components';

const StyledInput = styled.input`
    color: ${({ theme, correctAnswer, firstCharacter }) => correctAnswer ? (firstCharacter ? theme.colors.purple : theme.colors.green) : ''};
    border:none ;
    border-bottom: 1px solid ${({ theme }) => theme.colors.blue};
    margin: 0 10px;
    max-width:40px;
    font-weight:600;
    font-size:32px;
    text-transform: capitalize;
    text-align: center;
    :focus{
        outline: none;
    }
`
// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;
const SPACEBAR = 32;


export default function Input({ setCode, index, answerlength, correctAnswer, currentAnswerlength, setAnswer }) {
    const fieldRef = React.useRef()
    const [value, setValue] = React.useState("")
    // console.log('input', !(answerlength === currentAnswerlength))
    // React.useEffect(() => {
    const field = fieldRef.current
    const handleOnKeyDown = (e) => {
        const isBackspace = e.keyCode === BACKSPACE || e.key === 'Backspace'
        const isDelete = e.keyCode === DELETE || e.key === 'Delete'
        if (isBackspace || isDelete) {
            if (!value.length) {
                document.getElementById(`${(index - 1) > 0 ? (index - 1) : 0}-character`).focus()
                return
            }

            // document.getElementById(`${(index - 1) > 0 ? (index - 1 ) : 0}-character`).focus()
            setAnswer(state => state.slice(0, -1))
            setValue("")
            return
        }
    };
    const handleOnInput = (e) => {
        console.log("oninput", e)
    }
    const handleOnChange = (e) => {
        const { value:input } = e.target;
        const isChar = (/^[a-zA-Z]{1}$/).test(input)
        if (correctAnswer)
            return
        // If all the empty fields are filled disable input
        if (answerlength === currentAnswerlength) {
            // console.log("KEUDOWN no input")
            return
        }
        // If character is inputted
        if (!isChar)
            return
        // If value is not zero replace the last character of input
        // console.log('valuelength',value,value.length)
        if (value.length) {
            console.log("setting here man")
            setAnswer(state => state.slice(0, -1) + input)
            setValue(input)
            document.getElementById(`${index + 1 % answerlength}-character`).focus()
            return
        }
        console.log("setting here")
        setAnswer(state => state + input)
        setValue(input)
        document.getElementById(`${index + 1 % answerlength}-character`).focus()

        console.log('onchange', input)
        // if (this.isInputValueValid(value)) {
        //     this.changeCodeAtFocus(value);
        // }
    }
    const handleKeyDown = (e) => {
        const input = e.key
        console.log(e)
        setCode(e.key)

        const isChar = (/^[a-zA-Z]{1}$/).test(input)
        const isBackspace = input === 'Backspace' || input === 'Delete'
        console.log(input, 'isChar', isChar, 'isBackspace', isBackspace)
        // console.log(String.fromCharCode(e.keyCode).match(/(\w|\s)/g))
        // If all the correct answer is found return
        if (correctAnswer)
            return
        // console.log("KEUDOWN")

        // If all the empty fields are filled disable input
        if (answerlength === currentAnswerlength) {
            // console.log("KEUDOWN no input")
            return
        }
        // If character is inputted
        if (!isChar)
            return
        if (value.length) {
            setAnswer(state => state.slice(0, -1) + e.key)
            setValue(e.key)
            document.getElementById(`${index + 1 % answerlength}-character`).focus()
            return
        }
        setAnswer(state => state + e.key)
        setValue(e.key)
        document.getElementById(`${index + 1 % answerlength}-character`).focus()

    }
    // field.addEventListener('keydown', handleKeyDown)
    // return () => {
    //     field.removeEventListener('keydown', handleKeyDown)
    // }
    // }, [value, setAnswer, currentAnswerlength])

    return (
        <StyledInput onChange={handleOnChange} onInput={handleOnInput} onKeyDown={handleOnKeyDown} correctAnswer={correctAnswer} firstCharacter={index === 0} id={`${index}-character`} ref={fieldRef} type="text" value={value} maxLength={1} />
    )
}
