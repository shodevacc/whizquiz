import React from 'react'
import styled from 'styled-components';
import { Container as CTN } from 'components/styled'
import { useQuizState } from 'state'


const Container = styled(CTN)`
    
`
const AnswerContainer = styled.div`
background: ${({ theme }) => theme.colors.blue};
border-radius: 25px;
padding: 10px 0;
width:100%;
 h2{
     color:#fff;
     text-decoration: underline;
 }
`
const Title = styled.h3`
    text-align: center;
`;

export default function Answers() {
    const [answersToDisplay, setanswersToDisplay] = React.useState([])
    const { questionsCompleted, allAnswers, currentQuestionNumber, isTodayQuiz } = useQuizState()
    // console.log(currentQuestionNumber, 'currentAnswerKey', allAnswers)
    React.useEffect(() => {
        if (questionsCompleted) {
            setanswersToDisplay(allAnswers)
            return
        }
        // console.log("CEHCEOUCECN",allAnswers.map((ans, index) => (index <= currentQuestionNumber)?ans:null))
        setanswersToDisplay(allAnswers.filter((ans, index) => (index < currentQuestionNumber)))
        return () => { }
    }, [currentQuestionNumber, questionsCompleted])

    // console.log(answersToDisplay)
    return (
        <Container>
            {(currentQuestionNumber !== 0) && <AnswerContainer>
                <h2 style={{ textAlign: 'center' }}>Answers</h2>
                <div className='answercontainer'>
                    {answersToDisplay.map((answer, index) => {
                        return (
                            <p key={answer}>{answer.split('').map((char, index) => {
                                return (
                                    <span style={{ color: index === 0 ? "#E85AFF" : "inherit" }} key={`${index}-${char}-${answer}`}>
                                        {char}
                                    </span>
                                )
                            })}</p>
                        )
                    })}
                </div>
            </AnswerContainer>}
            {
                isTodayQuiz && <Title>You have 24 hours to solve 5 questions to guess the word of
                    the day
                </Title>
            }

        </Container >
    )
}
