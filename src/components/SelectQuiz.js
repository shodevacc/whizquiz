import React from 'react'
import styled from 'styled-components';
import { AllQuiz } from 'state/config'
import { useQuizState } from 'state'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin:10px;
    p{
        margin: 0 5px 0 0;
    }
`;
export default function SelectQuiz() {
    // console.log("ALL QUIZ", AllQuiz)
    const { SetQuizNumber, quizNumber, isTodayQuiz } = useQuizState()
    const handleChange = (e) => {
        // console.log(e.target.value)
        SetQuizNumber(e.target.value)
    }
    // console.log("Check", isTodayQuiz)
    return (
        <>
            <Container>
                <p>Filter Quiz by date</p>
                <form>
                    <select onChange={handleChange} default="0">
                        {AllQuiz.map((quiz, index) => {
                            return (
                                <option value={index} key={index}>
                                    {quiz.date}
                                </option>
                            )
                        })}
                    </select>
                </form>
            </Container>
            <hr />
        </>

    )
}
