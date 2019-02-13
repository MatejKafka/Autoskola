MESSAGES = require('../../config/MESSAGES').browsingQuestions
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
	sessionItem = store.findOne(db.STORE_TAGS.CURRENT_BROWSING_SESSION)
	if !sessionItem?
		return goto('questionSelect')

	if sessionItem.finished
		return goto('browseEvaluatedSession', params)

	if sessionItem.questionIds.length == 0
		store.removeByQuery(db.STORE_TAGS.CURRENT_BROWSING_SESSION)
		return goto('questionSelect')


	qIndex = qIndexFromParams(params)

	sessionItem.lastViewedIndex = qIndex
	store.update(sessionItem)


	gotoQuestion = (i) ->
		goto('browsing', Object.assign({}, params, {q: i + 1}))

	question = store.findOne({
		$tag: db.STORE_TAGS.QUESTION
		id: sessionItem.questionIds[qIndex]
	})

	qAnswers = sessionItem.answers[qIndex]
	alreadyCorrectlyAnswered = qAnswers? && qAnswers.filter((a) -> a.correctlyAnswered).length == 1


	questionContainer = createElem('div .questionView .browsingMode')
	container.appendChild(questionContainer)



	answerSubmitCount = -1
	correctAnswerClicked = false
	clickedAnswerIndexes = []

	renderQuestion({
		question: question
		questionCount: sessionItem.questionIds.length
		questionIndex: qIndex

		container: questionContainer
		shuffleAnswers: CONFIG.shuffleAnswers.browsingMode

		messages:
			backButton: MESSAGES.evaluateSessionButton

		handlers:
			gotoQuestion: gotoQuestion

			lastQuestionAnswer: ->
				goto('evaluateSession')

			backButtonClick: ->
				goto('evaluateSession')


			prepareView: (highlightAnswer, highlightQuestion) ->
				for questionAnswers, i in sessionItem.answers
					if !questionAnswers? || questionAnswers.length == 0
						continue
					if questionAnswers.length == 1 && questionAnswers[0].correctlyAnswered
						highlightQuestion(i, 'correct')
					else
						highlightQuestion(i, 'incorrect')

				if qAnswers?
					for answer in qAnswers
						highlightAnswer(
							answer.selectedAnswerIndex,
							if answer.correctlyAnswered then 'correct' else 'incorrectWithoutAnimation'
						)
				if alreadyCorrectlyAnswered
					for answer, i in question.answers
						highlightAnswer(i, '_')
				return


			answerClick: ({answer, index}, highlightAnswer) ->
				if alreadyCorrectlyAnswered
					return true

				if correctAnswerClicked
					return

				if clickedAnswerIndexes.indexOf(index) > -1
					return
				clickedAnswerIndexes.push(index)
				answerSubmitCount++

				saveAnswer = (attempt) ->
					answerObj = {
						mode: 'browsing'
						time: Date.now()
						correctlyAnswered: answer.correct
						selectedAnswerIndex: index
						questionId: question.id
						sections: params.sections
						questionTypes: params.questionTypes
						questionIndex: qIndex
						attemptNumber: attempt
					}
					store.add(db.STORE_TAGS.ANSWER, answerObj)
					if !sessionItem.answers[qIndex]?
						sessionItem.answers[qIndex] = []
					sessionItem.answers[qIndex].push(answerObj)
					store.update(sessionItem)

				highlightType = if answer.correct then 'correct' else 'incorrect'
				highlightAnswer(index, highlightType)
				saveAnswer(answerSubmitCount)

				if answer.correct
					correctAnswerClicked = true
					return new Promise (resolve) ->
						setTimeout((-> resolve(true)), CONFIG.answerClickTimeout)
				return
	})
	return