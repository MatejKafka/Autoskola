MESSAGES = require('../MESSAGES').practiceTest
CONFIG = require('../CONFIG')
renderQuestion = require('../util/render/renderQuestion')
createElem = require('../util/createElem')


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

	if currentTest.finished
		return goto('browseEvaluatedTest', params)


	qIndex = qIndexFromParams(params)

	gotoQuestion = (i) ->
		goto('practiceTest', Object.assign({}, params, {q: i + 1}))

	currentTest.lastViewedIndex = qIndex
	store.update(currentTest)

	questionIds = currentTest.questionIds
	question = db.questions.get(questionIds[qIndex])

	questionContainer = createElem('div .questionView .testMode .showTest')
	container.appendChild(questionContainer)

	clicked = false

	renderQuestion({
		questionIds: questionIds
		questionIndex: qIndex

		container: questionContainer
		shuffleAnswers: CONFIG.shuffleAnswers.testMode

		messages:
			backButton: MESSAGES.evaluateTestButton

		handlers:
			gotoQuestion: gotoQuestion

			lastQuestionAnswer: ->
				if confirm(MESSAGES.finishedPopup)
					goto('evaluateTest')
				else
					clicked = false
				return

			backButtonClick: ->
				if confirm(MESSAGES.evaluateTestPopup)
					goto('evaluateTest')
				return


			prepareView: (highlightAnswer, highlightQuestion) ->
				for answer, i in currentTest.answers
					if answer?
						highlightQuestion(i, 'marked')

				answerIndex = currentTest.answers[qIndex]
				if answerIndex?
					highlightAnswer(answerIndex, 'marked')


			answerClick: ({index}, highlightAnswer, highlightQuestion) ->
				if clicked
					return false

				for i in [0...question.answers.length]
					highlightAnswer(i, null)
				highlightAnswer(index, 'marked')
				highlightQuestion(qIndex, 'marked')

				currentTest.answers[qIndex] = index
				store.update(currentTest)

				clicked = true
				return true
	})
	return