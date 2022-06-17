import React from 'react'
import styled from 'styled-components';
import Input from 'components/Input'
import { setAnswerColor, initialiseAnswer } from 'utils'
import { Title, Container, QuestionNumber, Button } from 'components/styled'
import { useQuizState } from 'state'


export default function Index() {


    const { currentAnswerKey, setCelebrate, quizCompleted, SetQuizCompleted, incrementQuestion, WordofTheDay, allAnswers } = useQuizState()
    const [answer, setAnswer] = React.useState(initialiseAnswer(WordofTheDay.length))
    // console.log("wordofday", WordofTheDay, allAnswers)
    const charactersInAnswer = WordofTheDay.split('')
    const correctAnswer = (answer.toLocaleLowerCase() === WordofTheDay.toLocaleLowerCase())
    // console.log('currentAnswerKey', currentAnswerKey, answer)
    const isIncomplete = answer.includes('#')
    React.useEffect(() => {
        setAnswer(initialiseAnswer(WordofTheDay.length))
        return () => { }
    }, [currentAnswerKey])
    React.useEffect(() => {
        setAnswerColor(answer, WordofTheDay)
        return () => { }
    }, [answer, currentAnswerKey.answer])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!correctAnswer) {
            window.alert('Sorry Wrong Answer')
            return
        }
        SetQuizCompleted()
        setCelebrate(true)
        // window.alert("wohoooooo")
        // else
        // console.log(answer)

    }
    return (
        <>
            <Container>
                <h2 style={{ textTransform: 'capitalize', textAlign: 'center' }}>Unscramble the “First
                    Letters” of your answers
                    to guess the word of the
                    day</h2>
                <form onSubmit={handleSubmit}>
                    <div className='keys'>
                        {charactersInAnswer.map((char, index) => {
                            return (
                                <React.Fragment key={`${char}-${index}-${currentAnswerKey.question.length}`}>
                                    <Input answer={answer} correctAnswer={correctAnswer} currentAnswerlength={answer.length} setAnswer={setAnswer} index={index} answerlength={charactersInAnswer.length} />
                                </React.Fragment>
                            )
                        })}
                    </div>

                    {correctAnswer ? <p className='subtitle'>Congratulations 🎉 Let's celebrate! <br /> Hit the button below</p> :
                        (charactersInAnswer.length === answer.length) && !isIncomplete ? <p className='subtitle'>Incorrect</p> : null}
                    <Button type="submit" disabled={!correctAnswer}>Complete Quiz</Button>
                </form>
            </Container>
        </>

    )
}
