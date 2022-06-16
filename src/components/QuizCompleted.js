import React from 'react'
import { Container, Title } from 'components/styled'
import Confetti from 'components/Confetti'
import { useQuizState } from 'state'

export default function QuizCompleted() {
    const { celebrate } = useQuizState()
    return (
        <Container>
            {celebrate && <Confetti />}
            <Title lg >QuizCompleted</Title>
        </Container>

    )
}
