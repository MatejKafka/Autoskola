MESSAGES = require('../MESSAGES').browsingQuestions
CONFIG = require('../CONFIG')
getQuestions = require('../getQuestionIds')


renderQuestionImage =
	image: (img, container) ->
		container.innerHTML = '<img src="' + img.url + '">'

	multiple: (img, container) ->
	flash: (img, container) ->


generateQuestionElem = (question) ->
	questionContainer = document.createElement('div')
	questionContainer.className = 'questionContainer'

	questionText = document.createElement('div')
	questionText.innerHTML = question.question.text
	questionContainer.appendChild(questionText)

	if question.question.img?
		questionImage = document.createElement('div')
		questionImage.className = 'questionImage'
		img = question.question.img
		switch img.type
			when 'img'
				renderQuestionImage.image(img, questionImage)
			when 'multiple'
				renderQuestionImage.multiple(img, questionImage)
			when 'flash'
				renderQuestionImage.flash(img, questionImage)
		questionContainer.appendChild(questionImage)

	return questionContainer


generateAnswerList = (question) ->
	list = document.createElement('ul')
	list.className = 'answerList'
	for answer in question.answers
		item = document.createElement('li')
		if answer.text != '.'
			item.innerHTML = answer.text
		else
			item.innerHTML = answer.letter.toUpperCase() + ')'
		item.dataset.correct = answer.correct
		list.appendChild(item)
	return list


renderQuestion = (question, container) ->
	questionElem = generateQuestionElem(question)
	answerElem = generateAnswerList(question)
	container.appendChild(questionElem)
	container.appendChild(answerElem)
	return {
		question: questionElem
		answer: answerElem
	}


module.exports = (container, goto, params) ->
	if !params.sections? || (!Array.isArray(params.sections) && params.sections != '*')
		throw new Error('params.sections must be array')

	if !params.q?
		questionNumber = 1
	else
		questionNumber = params.q

	if params.sections == '*'
		questionIds = getQuestions()
	else
		questionIds = getQuestions(params.sections)

	if questionNumber > questionIds.length
		container.innerHTML = 'Ve vybraných oborech je jen ' + questionIds.length + ' otázek, zkuste nižší číslo otázky.'
		throw new Error('Too high question number - you only have ' + questionIds.length + ' questions selected')

	questionId = questionIds[questionNumber - 1]
	question = testData.questions.get(questionId)


	container.innerHTML = '
		<div class="buttons">
			<button class="toQuestionSelectButton">' + MESSAGES.toQuestionSelect + '</button>
			<button class="previousQuestionButton">' + MESSAGES.previousQuestion + '</button>
			<button class="nextQuestionButton">' + MESSAGES.nextQuestion + '</button>
		</div>
		<hr>
		<div class="testContainer"></div>
	'

	toQuestionSelectButton = container.getElementsByClassName('toQuestionSelectButton')[0]
	previousQuestionButton = container.getElementsByClassName('previousQuestionButton')[0]
	nextQuestionButton = container.getElementsByClassName('nextQuestionButton')[0]

	if questionNumber == 1
		previousQuestionButton.style.display = 'none'
	if questionNumber == questionIds.length
		nextQuestionButton.style.display = 'none'

	gotoPreviousQuestion = ->
		goto('browsing', {sections: params.sections, q: questionNumber - 1})
	gotoNextQuestion = ->
		goto('browsing', {sections: params.sections, q: questionNumber + 1})


	toQuestionSelectButton.addEventListener 'click', ->
		goto('questionSelect')
	previousQuestionButton.addEventListener('click', gotoPreviousQuestion)
	nextQuestionButton.addEventListener('click', gotoNextQuestion)

	questionElems = renderQuestion(question, container.getElementsByClassName('testContainer')[0])

	answerSubmitted = false
	questionElems.answer.addEventListener 'click', (e) ->
		if !(e.target instanceof HTMLLIElement)
			return
		if answerSubmitted
			gotoNextQuestion()
			return

		if e.target.dataset.correct != 'true'
			e.target.classList.add('incorrectAnswer')
		for item, i in questionElems.answer.children
			if item == e.target
				selectedAnswerIndex = i
			if item.dataset.correct == 'true'
				item.classList.add('correctAnswer')

		correctlyAnswered = e.target.dataset.correct == 'true'
		#questionHistory.add({correctlyAnswered, selectedAnswer: selectedAnswerIndex, question: questionId})
		if correctlyAnswered
			setTimeout(gotoNextQuestion, CONFIG.answerClickTimeout)
		answerSubmitted = true