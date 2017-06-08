MESSAGES = require('../MESSAGES').practiceTest
CONFIG = require('../CONFIG')
getQuestions = require('../getQuestions')
renderQuestion = require('../util/render/renderQuestion')
createElem = require('../util/createElem')


module.exports = (container, goto, params) ->
	currentTest = db.state.currentTest

	if !currentTest?
		goto('prepareTest')
		return

	if !params.q?
		qIndex = 0
	else
		qIndex = params.q - 1


	gotoQuestion = (i) ->
		goto('practiceTest', Object.assign({}, params, {q: i + 1}))

	currentTest.lastViewedIndex = qIndex
	questions = currentTest.questions
	question = questions[qIndex]

	questionContainer = createElem('div .questionView .testMode ' +
			if currentTest.finished then '.showResults' else '.showTest')
	container.appendChild(questionContainer)

	clicked = false

	renderQuestion(questions, qIndex, questionContainer, CONFIG.shuffleAnswers.testMode, {
		gotoQuestion: gotoQuestion

		lastQuestionAnswer: ->
			if currentTest.finished
				gotoQuestion(0)
			else if confirm(MESSAGES.finishedPopup)
				goto('evaluateTest')
			else
				clicked = false
			return

		backButtonClick: ->
			if currentTest.finished || confirm(MESSAGES.evaluateTestPopup)
				goto('evaluateTest')
			return


		prepareView: (highlightAnswer, highlightQuestion) ->
			if currentTest.finished
				container.getElementsByClassName('backButton')[0].innerHTML = MESSAGES.backToResults

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

			else

				container.getElementsByClassName('backButton')[0].innerHTML = MESSAGES.evaluateTestButton

				for answer, i in currentTest.answers
					if answer?
						highlightQuestion(i, 'marked')

				answerIndex = currentTest.answers[qIndex]
				if answerIndex?
					highlightAnswer(answerIndex, 'marked')


		answerClick: ({index}, highlightAnswer, highlightQuestion) ->
			if currentTest.finished
				return true

			if clicked
				return false

			for i in [0...question.answers.length]
				highlightAnswer(i, null)
			highlightAnswer(index, 'marked')
			highlightQuestion(qIndex, 'marked')
			currentTest.answers[qIndex] = index

			clicked = true
			return new Promise (resolve) ->
				setTimeout((-> resolve(true)), CONFIG.answerClickTimeout)

			# TODO: change db to AutoStore - eg. db.state.currentTest will be kept saved
			return
	})
	return