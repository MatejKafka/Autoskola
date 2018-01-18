CONFIG = require('../config/CONFIG')

module.exports = (testObj) ->
	maxScore = 0
	score = 0
	answerResults = []
	for questionId, i in testObj.questionIds
		question = store.findOne({
			$tag: db.STORE_TAGS.QUESTION
			id: questionId
		})
		answerIndex = testObj.answers[i]
		maxScore += question.value
		if !answerIndex?
			answerResults[i] = null
			continue

		answer = question.answers[answerIndex]
		if !answer?
			throw new Error("Answer index is higher than the number of answers for given question (questionId=#{question.id}, i=#{answerIndex})")

		answerResults[i] = answer.correct
		if answer.correct
			score += question.value

	return {
		passed: score >= CONFIG.testSuccessThreshold
		score: score
		maxScore: maxScore

		answerResults: answerResults
	}