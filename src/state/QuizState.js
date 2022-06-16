import React from 'react'
import dayjs from 'dayjs';
import { AllQuiz, today } from './config'


const QuizContext = React.createContext();


const getlocalStorage = () => JSON.parse(localStorage.getItem('initialState'))
const initialiseDefault = () => {
    // console.log("default")
    localStorage.setItem('initialState', JSON.stringify({ currentQuestion: 0, questionsCompleted: false, quizCompleted: false, date: '2022-06-10' }))
}
var initialState = getlocalStorage() ? getlocalStorage() : { currentQuestion: 0, questionsCompleted: false, quizCompleted: false, date: '2022-06-10' }

const resetIfNewDay = () => {
    const storedState = getlocalStorage()
    const storedDate = storedState ? storedState.date : ''
    // console.log("RESET", storedDate)
    if (!isTodayDate(storedDate)) {
        // console.log("STATE XX")
        initialiseDefault()
        initialState = { currentQuestion: 0, questionsCompleted: false, quizCompleted: false, date: '2022-06-10' }
    }
}
const isTodayDate = (date) => {
    // return dayjs(date).hour(0).minute(0).second(0).millisecond(0).isSame(dayjs('2022-06-16').hour(0).minute(0).second(0).millisecond(0))
    return dayjs(date).hour(0).minute(0).second(0).millisecond(0).isSame(today)
}
export const QuizProvider = ({ children }) => {
    // console.log("INITIAL", JSON.parse(localStorage.getItem('initialState')), initialState, localStorage.getItem('questionsCompleted'))
    // Stage refers to the step in the quiz
    // Start at 0. End at number of questions

    const [quizNumber, setQuizNumber] = React.useState(0)
    var QuizOfTheDay = AllQuiz[quizNumber]
    const isTodayQuiz = isTodayDate(QuizOfTheDay.date)
    // console.log("STATE", quizNumber, isTodayQuiz)

    React.useEffect(() => {
        resetIfNewDay()
        return () => { }
    }, [])
    const [currentQuestionNumber, setCurrentQuestion] = React.useState(isTodayQuiz ? initialState.currentQuestion : 0)
    const [questionsCompleted, setQuestionsCompleted] = React.useState(isTodayQuiz ? initialState.questionsCompleted : 0)
    const [quizCompleted, setQuizCompleted] = React.useState(isTodayQuiz ? initialState.quizCompleted : false)

    const [celebrate, setCelebrate] = React.useState(false)
    const questions = QuizOfTheDay?.answerKey || []
    const WordofTheDay = QuizOfTheDay?.word_of_the_day || ""
    const numberOfQuestions = QuizOfTheDay?.answerKey.length || 0
    const allAnswers = QuizOfTheDay?.answerKey.map(item => item.answer) || []

    const currentAnswerKey = {
        ...questions[currentQuestionNumber]
    }
    const SetQuizNumber = (number) => {
        const initialState = getlocalStorage() ? getlocalStorage() : { currentQuestion: 0, questionsCompleted: false, quizCompleted: false }
        const isTodayQuiz = isTodayDate(AllQuiz[number].date)
        setCurrentQuestion(isTodayQuiz ? initialState.currentQuestion : 0)
        setQuestionsCompleted(isTodayQuiz ? initialState.questionsCompleted : 0)
        setQuizCompleted(isTodayQuiz ? initialState.quizCompleted : false)
        setQuizNumber(number)
    }
    const SetQuizCompleted = () => {
        if (isTodayQuiz)
            localStorage.setItem('initialState', JSON.stringify({ currentQuestion: 1, questionsCompleted: true, quizCompleted: true, date: QuizOfTheDay.date }))
        setQuizCompleted(true)
    }
    const incrementQuestion = () => {
        // console.log('isTodayQuiz', isTodayQuiz)
        if (currentQuestionNumber + 1 < numberOfQuestions) {
            // console.log("NOT DONE", currentQuestionNumber)
            if (isTodayQuiz)
                localStorage.setItem('initialState', JSON.stringify({ currentQuestion: currentQuestionNumber + 1, questionsCompleted: false, quizCompleted: false, date: QuizOfTheDay.date }))
            setCurrentQuestion(state => state + 1)

        }
        else {
            if (isTodayQuiz)
                localStorage.setItem('initialState', JSON.stringify({ currentQuestion: 1, questionsCompleted: true, quizCompleted: false, date: QuizOfTheDay.date }))
            // localStorage.setItem('questionsCompleted', currentQuestionNumber + 1)

            setQuestionsCompleted(true)
        }


    }
    return (
        <QuizContext.Provider
            value={{ isTodayQuiz, quizNumber, SetQuizNumber, SetQuizCompleted, setCelebrate, celebrate, quizCompleted, currentQuestionNumber, allAnswers, currentAnswerKey, incrementQuestion, questionsCompleted, WordofTheDay }}>
            {children}
        </QuizContext.Provider>
    )



}
export const useQuizState = () => {

    return React.useContext(QuizContext)
}