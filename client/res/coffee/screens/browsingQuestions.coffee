MESSAGES = require('../MESSAGES').browsingQuestions
getQuestions = require('../getQuestionIds')


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
				questionImage.innerHTML = '<img src="' + img.url + '">'
			#when 'multiple'
			#when 'flash'
			else
				questionImage.innerHTML = '<hr><b><|' + img.type + '|></b><hr>'
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
	container.appendChild(generateQuestionElem(question))
	container.appendChild(generateAnswerList(question))


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

	question = testData.questions.get(questionIds[questionNumber - 1])


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

	toQuestionSelectButton.addEventListener 'click', ->
		goto('questionSelect')
	previousQuestionButton.addEventListener 'click', ->
		goto('browsing', {sections: params.sections, q: questionNumber - 1})
	nextQuestionButton.addEventListener 'click', ->
		goto('browsing', {sections: params.sections, q: questionNumber + 1})

	renderQuestion(question, container.getElementsByClassName('testContainer')[0])