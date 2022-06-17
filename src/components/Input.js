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

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
export default function Input({ answer,setCode, index, answerlength, correctAnswer, currentAnswerlength, setAnswer }) {
    const [value, setValue] = React.useState("")

    // Handle cases of backspace, delete
    const handleOnKeyDown = (e) => {
        console.log('onKey')
        const isBackspace = e.keyCode === BACKSPACE || e.key === 'Backspace'
        const isDelete = e.keyCode === DELETE || e.key === 'Delete'
        if (isBackspace || isDelete) {
            // Empty Space Delete Operation
            if (!value.length) {
                console.log("DELETE EMPTY SPACE")
                document.getElementById(`${(index - 1) > 0 ? (index - 1) : 0}-character`).focus()
                return
            }
            console.log("DELETE NON EMPTY SPACE on key",index,answer,answer.slice(0,index), answer.slice(index+1))
            // document.getElementById(`${(index - 1) > 0 ? (index - 1 ) : 0}-character`).focus()
            setAnswer(state => state.replaceAt(index,'#'))
            setValue("")
            return
        }
    };
    const handleOnInput = (e) => {
        console.log('onINput')
         // This is a workaround for dealing with keyCode "229 Unidentified" on Android.
        const { nativeEvent } = e;
        if (nativeEvent.data === null && nativeEvent.inputType === 'deleteContentBackward') {
            if (!value.length) {
                console.log("DELETE EMPTY SPACE IN INput")
                document.getElementById(`${(index - 1) > 0 ? (index - 1) : 0}-character`).focus()
                return
            }
            const ans =answer
            console.log("DELETE NON EMPTY SPACE IN INput",index,ans,ans.slice(0,index), ans.slice(index+1))
            setAnswer(state => state.replaceAt(index,'#'))
            setValue("")
            return
        }
    }
    const handleOnChange = (e) => {
        console.log('ocChnage')
        const { value: input } = e.target;
        const isChar = (/^[a-zA-Z]{1}$/).test(input)
        if (correctAnswer)
            return
        // If all the empty fields are filled disable input
        if (!answer[index]==='#') {
            // console.log("KEUDOWN no input")
            return
        }
        // If character is inputted
        if (!isChar)
            return
        // If value is not zero replace the last character of input
        // console.log('valuelength',value,value.length)
        if (value.length) {
            // console.log("setting here man")
            setAnswer(state => state.replaceAt(index,input))
            setValue(input)
            document.getElementById(`${index + 1 % answerlength}-character`).focus()
            return
        }
        // console.log("setting here")
        setAnswer(state => state.replaceAt(index,input))
        // setAnswer(state => state + input)
        setValue(input)
        document.getElementById(`${index + 1 % answerlength}-character`).focus()

        // console.log('onchange', input)

    }


    return (
        <StyledInput onChange={handleOnChange} onInput={handleOnInput} onKeyDown={handleOnKeyDown} correctAnswer={correctAnswer} firstCharacter={index === 0} id={`${index}-character`} type="text" value={value} maxLength={1} />
    )
}
