MESSAGES = require('../../config/MESSAGES').practiceTest
CONFIG = require('../../config/CONFIG')
renderQuestion = require('../../util/render/renderQuestion')
createElem = require('../../util/createElem')


qIndexFromParams = (params) ->
	if !params.q?
		index = 0
	else
		index = params.q - 1

	if isNaN(index)
		throw new Error('Invalid params')
	return index


module.exports = (container, goto, params) ->
	currentTest = store.findOne(db.STORE_TAGS.CURRENT_TEST)

	if !currentTest?
		return goto('prepareTest')

	if !currentTest.finished
		return goto('practiceTest', params)


	qIndex = qIndexFromParams(params)

	gotoQuestion = (i) ->
		goto('browseEvaluatedTest', Object.assign({}, params, {q: i + 1}))

	currentTest.lastViewedIndex = qIndex
	store.update(currentTest)

	question = store.findOne({
		$tag: db.STORE_TAGS.QUESTION
		id: currentTest.questionIds[qIndex]
	})

	questionContainer = createElem('div .questionView .testMode .showResults')
	container.appendChild(questionContainer)

	renderQuestion({
		question: question
		questionCount: currentTest.questionIds.length
		questionIndex: qIndex

		container: questionContainer
		shuffleAnswers: CONFIG.shuffleAnswers.testMode

		messages:
			backButton: MESSAGES.backToResults

		handlers:
			gotoQuestion: gotoQuestion

			lastQuestionAnswer: ->
				gotoQuestion(0)

			backButtonClick: ->
				goto('evaluateTest')


			prepareView: (highlightAnswer, highlightQuestion) ->
				for isCorrect, i in currentTest.results.answerResults
					switch isCorrect
						when true
							highlightQuestion(i, 'correct')
						when false
							highlightQuestion(i, 'incorrect')
						else
							highlightQuestion(i, 'unanswered')

				answerIndex = currentTest.answers[qIndex]
				if !answerIndex?
					# unanswered
					for answer, i in question.answers
						if answer.correct
							highlightAnswer(i, 'correctUnanswered')
					return
				correct = question.answers[answerIndex].correct

				if correct
					highlightAnswer(answerIndex, 'correct')
				else
					highlightAnswer(answerIndex, 'incorrect')
					for answer, i in question.answers
						if answer.correct
							highlightAnswer(i, 'correct')


			answerClick: ->
				return true
	})
	return