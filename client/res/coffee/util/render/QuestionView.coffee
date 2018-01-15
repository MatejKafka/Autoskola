EventEmitter = require('events')
MESSAGES = require('../../MESSAGES').questionView
createElem = require('../createElem')


renderQuestionImage = (img, container) ->
		container.classList.add('singleImg')
		container.innerHTML = '<img src="' + img.url + '">'


generateQuestionElem = (question, value) ->
	questionContainer = document.createElement('div')
	questionContainer.className = 'questionContainer'

	questionValue = document.createElement('div')
	questionValue.classList.add('questionValue')
	if value == 1
		questionValue.innerHTML = value + ' ' + MESSAGES.point
	else
		questionValue.innerHTML = value + ' ' + MESSAGES.points
	questionContainer.appendChild(questionValue)

	questionText = document.createElement('div')
	questionText.classList.add('questionText')
	questionText.innerHTML = question.text
	questionContainer.appendChild(questionText)

	if question.img?
		questionImage = document.createElement('div')
		questionImage.className = 'questionImage'
		img = question.img
		renderQuestionImage(img, questionImage)
		questionContainer.appendChild(questionImage)

	return questionContainer


generateAnswerList = (answers) ->
	answersContainImg = answers[0].img?

	list = document.createElement('ul')
	list.classList.add('answerList')
	if answersContainImg
		list.classList.add('imgAnswerList')
	else
		list.classList.add('textAnswerList')

	for answer, i in answers
		if answersContainImg
			content = [
				createElem("img src='#{answer.img.url}'")
				createElem('div .answerImageCover')
			]
		else
			content = [
				answer.text
			]

		item = createElem("li data-index='#{i}'", [
			createElem('a href="javascript:void(0);"', content)
		])

		list.appendChild(item)

	return list



module.exports = class QuestionView extends EventEmitter
	constructor: (question) ->
		@_question = question
		@_elems =
			questionElem: generateQuestionElem(question.question, question.value)
			answerList: generateAnswerList(question.answers)
		@_bindEvents()


	shuffleAnswers: ->
		list = @_elems.answerList
		for i in [1..list.children.length]
			list.appendChild(list.children[Math.floor(Math.random() * i)])
		return


	renderTo: (container) ->
		container.innerHTML = ''
		container.appendChild(@_elems.questionElem)
		container.appendChild(@_elems.answerList)
		return


	highlightAnswer: (index, highlightClass) ->
		for answerElem in @_elems.answerList.children
			i = parseInt(answerElem.dataset.index)
			if i == index
				@_highlightElem(answerElem, highlightClass)
				return true
		return false


	_highlightElem: (elem, highlightClass) ->
		if highlightClass? && highlightClass != ''
			elem.classList.add('clickedAnswer')
			elem.classList.add(highlightClass + 'Answer')
			return highlightClass + 'Answer'
		else
			pointer = 0
			while pointer < elem.classList.length
				if /.+Answer/.test(elem.classList[pointer])
					elem.classList.remove(elem.classList[pointer])
				else
					pointer++
			return null


	_bindEvents: ->
		answerList = @_elems.answerList
		answerList.addEventListener 'click', (e) =>
			target = e.target
			# find nearest <li> or return
			while !(target instanceof HTMLLIElement)
				if target == answerList
					return
				target = target.parentNode

			index = parseInt(target.dataset.index)
			answer = @_question.answers[index]
			@emit('answerClick', {answer, index})
			return
		return