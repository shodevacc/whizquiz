
import answerkey from './answerKey.json'
import dayjs from 'dayjs'

export const today = dayjs().hour(0).minute(0).second(0).millisecond(0)

var today_quiz = null
console.log("CHECK DATE", today.isSame(dayjs('2022-06-16').hour(0).minute(0).second(0).millisecond(0)), today.format('DD/MM/YYYY'), dayjs('2022-06-16').format('DD/MM/YYYY'))
answerkey.every(element => {
    var questionDate = dayjs(element.date).hour(0).minute(0).second(0).millisecond(0)
    if (today.isSame(questionDate)) {
        today_quiz = element
        return false
    }
    return true
});

// export const QuizOfTheDay = today_quiz
export const AllQuiz = answerkey
export const QuizOfTheDay = null