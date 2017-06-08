MESSAGES = require('../MESSAGES').browsingQuestions
CONFIG = require('../CONFIG')
getQuestions = require('../getQuestions')
renderQuestion = require('../util/render/renderQuestion')
createElem = require('../util/createElem')


parseParams = (params) ->
	sections = params.sections
	questionTypes = params.questionTypes
	if !sections? || (!Array.isArray(sections) && sections != '*') ||
		!questionTypes? || (!Array.isArray(questionTypes) && questionTypes != '*')
			throw new Error('Invalid params')

	if !params.q?
		index = 0
	else
		index = params.q - 1

	if isNaN(index)
		throw new Error('Invalid params')

	if sections == '*'
		sections = null
	if questionTypes == '*'
		questionTypes = null

	return {
		sections: sections
		questionTypes: questionTypes
		questionIndex: index
	}



module.exports = (container, goto, params) ->
	{sections, questionTypes, questionIndex} = parseParams(params)

	questions = getQuestions(sections, questionTypes)


	gotoQuestion = (i) ->
		goto('browsing', Object.assign({}, params, {q: i + 1}))


	question = questions[questionIndex]


	questionContainer = createElem('div .questionView .browsingMode')
	container.appendChild(questionContainer)


	answerSubmitCount = -1
	correctAnswerClicked = false
	clickedAnswerIndexes = []
	renderQuestion(questions, questionIndex, questionContainer, CONFIG.shuffleAnswers.browsingMode, {
		gotoQuestion: gotoQuestion

		lastQuestionAnswer: ->
			# TODO: add session tracking & statistics
			alert(MESSAGES.finishedBrowsingPopup)
			goto('questionSelect')

		backButtonClick: ->
			goto('questionSelect')


		answerClick: ({answer, index}, highlightAnswer) ->
			if correctAnswerClicked
				return

			if clickedAnswerIndexes.indexOf(index) > -1
				return
			clickedAnswerIndexes.push(index)
			answerSubmitCount++

			saveAnswer = (attempt) ->
				db.store.answers.add({
					mode: 'browsing'
					correctlyAnswered: answer.correct
					selectedAnswerIndex: index
					questionId: question.id
					sections: params.sections
					questionTypes: params.questionTypes
					questionIndex: questionIndex
					attemptNumber: attempt
				})

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