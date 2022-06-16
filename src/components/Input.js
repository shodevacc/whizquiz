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

export default function Input({ index, answerlength, correctAnswer, currentAnswerlength, setAnswer }) {
    const fieldRef = React.useRef()
    const [value, setValue] = React.useState("")
    // console.log('input', !(answerlength === currentAnswerlength))
    React.useEffect(() => {
        const field = fieldRef.current
        const handleKeyDown = (e) => {
            if (correctAnswer)
                return
            // console.log("KEUDOWN")
            if (e.keyCode === 8) {
                if(!value.length){
                    document.getElementById(`${(index - 1) > 0 ? (index - 1 ) : 0}-character`).focus()
                    return
                }
                  
                // document.getElementById(`${(index - 1) > 0 ? (index - 1 ) : 0}-character`).focus()
                setAnswer(state => state.slice(0, -1))
                setValue("")
                return
            }
            if (answerlength === currentAnswerlength) {
                // console.log("KEUDOWN no input")
                return
            }
            if(value.length){
                setAnswer(state => state.slice(0,-1) + e.key)
                setValue(e.key)
                document.getElementById(`${index + 1 % answerlength}-character`).focus()
                return
            }
            setAnswer(state => state + e.key)
            setValue(e.key)
            document.getElementById(`${index + 1 % answerlength}-character`).focus()

        }
        field.addEventListener('keydown', handleKeyDown)
        return () => {
            field.removeEventListener('keydown', handleKeyDown)
        }
    }, [value, setAnswer, currentAnswerlength])
    return (
        <StyledInput correctAnswer={correctAnswer} firstCharacter={index === 0} id={`${index}-character`} ref={fieldRef} type="text" value={value} maxLength={1} />
    )
}
