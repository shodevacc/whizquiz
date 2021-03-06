import React from 'react'
import styled from 'styled-components';
import Input from 'components/Input'
import { setAnswerColor, initialiseAnswer } from 'utils'
import { Title, Container, QuestionNumber, Button } from 'components/styled'
import { useQuizState } from 'state'


export default function Index() {
    const [currentCharacter, setCurrentCharacter] = React.useState(0)
   
    const { currentAnswerKey, incrementQuestion, currentQuestionNumber } = useQuizState()
    const [answer, setAnswer] = React.useState(initialiseAnswer(currentAnswerKey.answer.length))
    const charactersInAnswer = currentAnswerKey.answer.split('')
    const correctAnswer = (answer.toLowerCase() === currentAnswerKey.answer.toLowerCase())
    const isIncomplete = answer.includes('#')
    console.log('  console.log(answer)', answer)
    React.useEffect(() => {
        setAnswer(initialiseAnswer(currentAnswerKey.answer.length))
        return () => { }
    }, [currentAnswerKey])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!correctAnswer) {
            window.alert('Sorry man')
            return
        }
        incrementQuestion()
        // else

    }
    React.useEffect(() => {
        setAnswerColor(answer, currentAnswerKey.answer)
        return () => { }
    }, [answer, currentAnswerKey.answer])
    const [code, setCode] = React.useState('')
    // console.log(answer,currentAnswerKey.answer)
    return (
        <Container>
            {/* {answer} */}
            <QuestionNumber className='smallTitle'>Question: {currentQuestionNumber + 1}</QuestionNumber>
            <Title style={{ textTransform: 'capitalize' }}>{currentAnswerKey.question}</Title>
            {code}
            <form className="form" onSubmit={handleSubmit}>
                <div className='keys'>
                    {charactersInAnswer.map((char, index) => {
                        return (
                            <React.Fragment key={`${char}-${index}-${currentAnswerKey.question.length}`}>
                                <Input answer={answer} setCode={setCode} correctAnswer={correctAnswer} currentAnswerlength={answer.length} setAnswer={setAnswer} index={index} answerlength={charactersInAnswer.length} />
                            </React.Fragment>
                        )
                    })}
                </div>

                {correctAnswer ? <p className='subtitle'>Thats the correct answer. Letter <span style={{ textTransform: 'capitalize', color: '#E85AFF', fontWeight: "600" }}>"{charactersInAnswer[0]}"</span> will be used to unscramble the word of the day</p> :
                    (charactersInAnswer.length === answer.length) && !isIncomplete ? <p className='subtitle'>Incorrect</p> : null}
                <Button type="submit" disabled={!correctAnswer}>Next</Button>
            </form>
        </Container>
    )
}
