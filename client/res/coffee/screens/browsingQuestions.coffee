MESSAGES = require('../MESSAGES').browsingQuestions
CONFIG = require('../CONFIG')
getQuestions = require('../getQuestions')


renderQuestionImage =
	image: (img, container) ->
		container.classList.add('singleImg')
		container.innerHTML = '<img src="' + img.url + '">'

	#multiple: (img, container) ->
	#	container.classList.add('multipleImg')
	#	containerHtml = ''
	#	for option in img.options
	#		containerHtml += '<div class="option"><img src="' + option.url + '"><div class="optionLetter">' + option.letter.toUpperCase() + ')</div></div>'
	#	container.innerHTML = containerHtml


	flash: (img, container) ->
		container.classList.add('flashImg')
		container.innerHTML = '
			<object type="application/x-shockwave-flash" width="640" height="325" data="' + img.url + '" style="vertical-align: top;">
  				<param name="loop" value="true">
  				<param name="menu" value="false">
  				<param name="wmode" value="transparent">
			</object>'


generateQuestionElem = (question) ->
	questionContainer = document.createElement('div')
	questionContainer.className = 'questionContainer'

	questionText = document.createElement('div')
	questionText.classList.add('questionText')
	text = question.question.text
	questionText.innerHTML = text
	questionContainer.appendChild(questionText)

	if question.question.img? && question.question.img.type != 'multiple'
		questionImage = document.createElement('div')
		questionImage.className = 'questionImage'
		img = question.question.img
		switch img.type
			when 'img'
				renderQuestionImage.image(img, questionImage)
#			when 'multiple'
#				renderQuestionImage.multiple(img, questionImage)
			when 'flash'
				renderQuestionImage.flash(img, questionImage)
		questionContainer.appendChild(questionImage)

	return questionContainer


generateAnswerList = (question, shuffle) ->
	isMultiple = question.question.img? && question.question.img.type == 'multiple'

	list = document.createElement('ul')
	list.classList.add('answerList')
	if isMultiple
		list.classList.add('imgAnswerList')
		for option in question.question.img.options
			item = document.createElement('li')
			item.classList.add('imgOptionAnswer')
		listItems = question.question.img.options
	else
		list.classList.add('textAnswerList')
		listItems = question.answers

	for listItem, i in listItems
		item = document.createElement('li')
		if !isMultiple
			item.innerHTML = listItem.text
			item.dataset.correct = listItem.correct
			item.dataset.index = i
		else
			item.innerHTML = '<img src="' + listItem.url + '"><div class="answerImageCover"></div>'
			item.dataset.correct = question.answers[i].correct
			item.dataset.index = i
		list.appendChild(item)

	if shuffle
		for i in [1..list.children.length]
			list.appendChild(list.children[Math.floor(Math.random() * i)])

	return list


renderQuestion = (question, container, shuffle = false) ->
	questionElem = generateQuestionElem(question)
	answerElem = generateAnswerList(question, shuffle)
	container.appendChild(questionElem)
	container.appendChild(answerElem)
	return {
		question: questionElem
		answer: answerElem
	}


scrollToCenter = (elem, container) ->
	# probably needs to wait for render
	setTimeout ->
		container.scrollLeft = elem.offsetLeft + (elem.clientWidth / 2) - (container.clientWidth / 2)
	, 0
	return


renderQuestionList = (questionLength, questionIndex, container, gotoQuestion) ->
	currentQuestionItem = null
	for i in [1..questionLength]
		do (i) ->
			li = document.createElement('li')
			link = document.createElement('a')
			link.innerHTML = i
			link.addEventListener 'click', ->
				gotoQuestion(i)
			li.appendChild(link)
			container.appendChild(li)
			if i == questionIndex + 1
				currentQuestionItem = li

	currentQuestionItem.classList.add('currentQuestion')
	currentQuestionItem.innerHTML = questionIndex + 1
	scrollToCenter(currentQuestionItem, container)
	return


module.exports = (container, goto, params) ->
	sections = params.sections
	questionTypes = params.questionTypes
	if !sections? || (!Array.isArray(sections) && sections != '*') ||
		!questionTypes? || (!Array.isArray(questionTypes) && questionTypes != '*')
			goto('questionSelect')
			return

	if !params.q?
		questionNumber = 1
	else
		questionNumber = params.q

	if sections == '*'
		sections = null
	if questionTypes == '*'
		questionTypes = null

	questions = getQuestions(sections, questionTypes)


	gotoQuestion = (questionN) ->
		goto('browsing', Object.assign({}, params, {q: questionN}))

	gotoPreviousQuestion = ->
		gotoQuestion(questionNumber - 1)
	gotoNextQuestion = ->
		if questionNumber < questions.length
			gotoQuestion(questionNumber + 1)
		else
			goto('questionSelect')



	if questionNumber > questions.length
		console.error('Question index is too high - you only have ' + questions.length + ' questions selected')
		gotoQuestion(questions.length)
		return

	questionIndex = questionNumber - 1
	question = questions[questionIndex]


	container.innerHTML = '
		<div class="topbar">
			<button class="toQuestionSelectButton">' + MESSAGES.toQuestionSelect + '</button>

			<span class="questionNavigation">
				<button class="previousQuestionButton">' + MESSAGES.previousQuestion + '</button>
				<span class="questionNumber"><span class="questionIndex">' + questionNumber + '</span> ' + MESSAGES.from + ' <span class="questionCollectionLength">' + questions.length + '</span></span>
				<button class="nextQuestionButton">' + MESSAGES.nextQuestion + '</button>
			</span>
		</div>
		<hr class="questionNavigationLine">

		<ul class="questionList"></ul>
		<hr>

		<div class="testContainer"></div>
	'


	questionListElem = container.getElementsByClassName('questionList')[0]
	questionListElem.style.height = (2 * questionListElem.offsetHeight - questionListElem.clientHeight) + 'px'
	renderQuestionList questions.length, questionIndex, questionListElem, (questionN) ->
		gotoQuestion(questionN)

	questionElems = renderQuestion(question, container.getElementsByClassName('testContainer')[0], true)

	toQuestionSelectButton = container.getElementsByClassName('toQuestionSelectButton')[0]
	previousQuestionButton = container.getElementsByClassName('previousQuestionButton')[0]
	nextQuestionButton = container.getElementsByClassName('nextQuestionButton')[0]

	if questionNumber == 1
		previousQuestionButton.style.visibility = 'hidden'
	if questionNumber == questions.length
		nextQuestionButton.style.visibility = 'hidden'


	toQuestionSelectButton.addEventListener 'click', ->
		goto('questionSelect')
	previousQuestionButton.addEventListener('click', gotoPreviousQuestion)
	nextQuestionButton.addEventListener('click', gotoNextQuestion)


	answerSubmitted = false
	questionElems.answer.addEventListener 'click', (e) ->
		target = e.target
		while !(target instanceof HTMLLIElement)
			if target == questionElems.answer
				return
			target = target.parentNode

		if answerSubmitted
			if target.dataset.correct == 'true'
				gotoNextQuestion()
			return

		selectedAnswerIndex = parseInt(target.dataset.index)
		correctlyAnswered = target.dataset.correct == 'true'

		if !correctlyAnswered
			target.classList.add('incorrectAnswer')
		for item in questionElems.answer.children
			if item.dataset.correct == 'true'
				item.classList.add('correctAnswer')

		db.answers.add({
			correctlyAnswered: correctlyAnswered
			selectedAnswerIndex: selectedAnswerIndex
			questionId: question.id
			sections: params.sections
			questionIndex: questionIndex
		})

		answerSubmitted = true
		if correctlyAnswered
			setTimeout(gotoNextQuestion, CONFIG.answerClickTimeout)