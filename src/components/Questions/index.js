import React from 'react'
import styled from 'styled-components';
import Input from 'components/Input'
import { setAnswerColor } from 'utils'
import {Title, Container,QuestionNumber,Button} from 'components/styled'
import { useQuizState } from 'state'


export default function Index() {
    const [currentCharacter, setCurrentCharacter] = React.useState(0)
    const [answer, setAnswer] = React.useState("")
    const { currentAnswerKey, incrementQuestion,currentQuestionNumber } = useQuizState()
    const charactersInAnswer = currentAnswerKey.answer.split('')
    const correctAnswer = (answer === currentAnswerKey.answer)
    console.log('currentAnswerKey', currentAnswerKey, answer)
    React.useEffect(() => {
        setAnswer("")
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
        console.log(answer)
    }
    React.useEffect(()=>{
        setAnswerColor(answer,currentAnswerKey.answer)
        return ()=>{}
    },[answer,currentAnswerKey.answer])
    
    return (
        <Container>
            <QuestionNumber className='smallTitle'>Question: {currentQuestionNumber+1}</QuestionNumber>
            <Title style={{textTransform:'capitalize'}}>{currentAnswerKey.question}</Title>
            <form className="form" onSubmit={handleSubmit}>
                <div className='keys'>
                {charactersInAnswer.map((char, index) => {
                    return (
                        <React.Fragment key={`${char}-${index}-${currentAnswerKey.question.length}`}>
                            <Input correctAnswer={correctAnswer} currentAnswerlength={answer.length} setAnswer={setAnswer} index={index} answerlength={charactersInAnswer.length} />
                        </React.Fragment>
                    )
                })}
                </div>
                
                {correctAnswer ? <p className='subtitle'>Thats the correct answer. Letter <span style={{textTransform:'capitalize',color:'#E85AFF', fontWeight:"600"}}>"{charactersInAnswer[0]}"</span> will be used to unscramble the word of the day</p> :
                    charactersInAnswer.length === answer.length ? <p className='subtitle'>Incorrect</p> : null}
                <Button type="submit" disabled={!(answer.length === charactersInAnswer.length)}>Next</Button>
            </form>
        </Container>
    )
}
