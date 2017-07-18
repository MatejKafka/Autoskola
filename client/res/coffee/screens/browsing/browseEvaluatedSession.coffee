MESSAGES = require('../../MESSAGES').browsingQuestions
CONFIG = require('../../CONFIG')
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
	session = store.findOne(db.STORE_TAGS.CURRENT_BROWSING_SESSION)

	if !session?
		return goto('questionSelect')

	if !session.finished
		return goto('browsing', params)


	qIndex = qIndexFromParams(params)

	gotoQuestion = (i) ->
		goto('browseEvaluatedSession', Object.assign({}, params, {q: i + 1}))

	session.lastViewedIndex = qIndex
	store.update(session)

	question = store.findOne({
		$tag: db.STORE_TAGS.QUESTION
		id: session.questionIds[qIndex]
	})

	questionContainer = createElem('div .questionView .browsingMode .showResults')
	container.appendChild(questionContainer)

	renderQuestion({
		questionIds: session.questionIds
		questionIndex: qIndex

		container: questionContainer
		shuffleAnswers: CONFIG.shuffleAnswers.testMode

		messages:
			backButton: MESSAGES.backToEvaluating

		handlers:
			gotoQuestion: gotoQuestion

			lastQuestionAnswer: ->
				gotoQuestion(0)

			backButtonClick: ->
				goto('evaluateSession')


			prepareView: (highlightAnswer, highlightQuestion) ->
				for questionAnswers, i in session.answers
					if !questionAnswers? || questionAnswers.length == 0
						highlightQuestion(i, 'unanswered')
					else if questionAnswers.length == 1 && questionAnswers[0].correctlyAnswered
						highlightQuestion(i, 'correct')
					else
						highlightQuestion(i, 'incorrect')


				qAnswers = session.answers[qIndex]
				if !qAnswers?
					correctAnswerClicked = false
				else
					correctAnswerClicked = qAnswers.filter((a) -> a.correctlyAnswered).length > 0

				if qAnswers?
					for answer in qAnswers
						highlightAnswer(
							answer.selectedAnswerIndex,
							if answer.correctlyAnswered then 'correct' else 'incorrectWithoutAnimation'
						)
					for answer, i in question.answers
						# block hover effects by adding clickedAnswer className
						highlightAnswer(i, '_')

				if !correctAnswerClicked
					for answer, i in question.answers
						if answer.correct
							highlightAnswer(i, 'correctUnanswered')


			answerClick: ->
				return true
	})
	return