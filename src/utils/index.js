export const setAnswerColor = (answer, correctAnswer) => {
    // console.log("CHECK THIS",answer,correctAnswer)
    var currentAnswer = answer.toLowerCase()
    var correctAnswerLower = correctAnswer.toLowerCase()
    currentAnswer.split("").forEach((char, index) => {
        const correctCharacter = correctAnswerLower.includes(char)
        const element = document.getElementById(`${index}-character`)
        if (!element)
            return
        if (!correctCharacter) {
            element.classList.remove(...["correctColor", "wrongPosColor"])
            element.classList.add("wrongColor")
        }
        const correctPosition = char === correctAnswerLower.charAt(index)
        if (correctPosition) {
            element.classList.remove(...["wrongColor", "wrongPosColor"])
            element.classList.add("correctColor")
        }
        if (correctCharacter && !correctPosition) {
            element.classList.remove(...["wrongColor", "correctColor"])
            element.classList.add("wrongPosColor")
        }
    })
}