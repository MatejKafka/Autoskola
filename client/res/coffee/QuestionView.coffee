EventEmitter = require('events')
MESSAGES = require('./MESSAGES').browsingQuestions
createElem = require('./createElem')

# TODO: add links inside answer li - tabindex & cursor support


renderQuestionImage =
	image: (img, container) ->
		container.classList.add('singleImg')
		container.innerHTML = '<img src="' + img.url + '">'

#	multiple: (img, container) ->
#		container.classList.add('multipleImg')
#		containerHtml = ''
#		for option in img.options
#			containerHtml += '<div class="option"><img src="' + option.url + '"><div class="optionLetter">' + option.letter.toUpperCase() + ')</div></div>'
#		container.innerHTML = containerHtml


	flash: (img, container) ->
		container.classList.add('flashImg')
		container.innerHTML = "
			<object type='application/x-shockwave-flash' width='640' height='325' data='#{img.url}' style='vertical-align: top;'>
  				<param name='loop' value='true'>
  				<param name='menu' value='false'>
  				<param name='wmode' value='transparent'>
			</object>"


generateQuestionElem = (question) ->
	questionContainer = document.createElement('div')
	questionContainer.className = 'questionContainer'

	questionValue = document.createElement('div')
	questionValue.classList.add('questionValue')
	if question.value == 1
		questionValue.innerHTML = question.value + ' ' + MESSAGES.point
	else
		questionValue.innerHTML = question.value + ' ' + MESSAGES.points
	questionContainer.appendChild(questionValue)

	questionText = document.createElement('div')
	questionText.classList.add('questionText')
	questionText.innerHTML = question.question.text
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


generateAnswerList = (question) ->
	isMultiple = question.question.img? && question.question.img.type == 'multiple'

	list = document.createElement('ul')
	list.classList.add('answerList')
	if isMultiple
		list.classList.add('imgAnswerList')
		listItems = question.question.img.options
	else
		list.classList.add('textAnswerList')
		listItems = question.answers

	for listItem, i in listItems
		if isMultiple
			content = [
				createElem("img src='#{listItem.url}'")
				createElem('div .answerImageCover')
			]
		else
			content = [
				listItem.text
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
			questionElem: generateQuestionElem(question)
			answerList: generateAnswerList(question)
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