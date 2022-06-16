import React from 'react'
import { useQuizState } from 'state'
import Nav from 'components/Nav'
import Questions from 'components/Questions'
import FinalStep from 'components/FinalStep'
import Answers from 'components/Answers'
import TimeLeft from 'components/TimeLeft'
import SelectQuiz from 'components/SelectQuiz'
import QuizCompleted from 'components/QuizCompleted'
import { Title } from 'components/styled'

export default function Main() {
  const { questionsCompleted: completed, quizCompleted, isTodayQuiz } = useQuizState()
  return (
    <div>
      <Nav />
      <SelectQuiz />
      {isTodayQuiz ? (!quizCompleted ? <TimeLeft /> : null) : null}

      {quizCompleted ? <QuizCompleted /> : (completed ? <FinalStep /> : <Questions />)}
      <Answers />
    </div>
  ) 
} 

