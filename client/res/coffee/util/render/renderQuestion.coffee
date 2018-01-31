MESSAGES = require('../../MESSAGES').questionView

validate = require('../../validateArguments')
QuestionView = require('./QuestionView')


bindNavigationButtons = (container, questionCount, index, handlers) ->
	backButton = container.getElementsByClassName('backButton')[0]
	previousQuestionButton = container.getElementsByClassName('previousQuestionButton')[0]
	nextQuestionButton = container.getElementsByClassName('nextQuestionButton')[0]

	backButton.addEventListener('click', -> handlers.back())
	previousQuestionButton.addEventListener('click', -> handlers.previousQuestion())
	nextQuestionButton.addEventListener('click', -> handlers.nextQuestion())
	return


scrollToCenter = (elem, container) ->
	# probably needs to wait for render
	setTimeout ->
		container.scrollLeft = elem.offsetLeft + (elem.clientWidth / 2) - (container.clientWidth / 2)
	, 0
	return


# performance critical code - potentially renders hundreds of list items
# 2017-07-18 - extremely slow in Edge
# TODO: cache between renders, only change diff (cache fixed number of elements;
# TODO: 										when used, remove highlights, replace currentQuestionItem)
renderQuestionList = (questionCount, index, containerList, gotoQuestionFn) ->
	fragment = document.createDocumentFragment()
	for i in [0...questionCount]
		do (i) ->
			li = document.createElement('li')
			link = document.createElement('a')
			link.appendChild(document.createTextNode(i + 1))

			link.addEventListener 'click', ->
				gotoQuestionFn(i)

			li.appendChild(link)
			fragment.appendChild(li)

	currentQuestionItem = fragment.children[index]
	currentQuestionItem.classList.add('currentQuestion')
	currentQuestionItem.innerHTML = index + 1

	containerList.appendChild(fragment)
	scrollToCenter(currentQuestionItem, containerList)

	return (index, highlightClass) ->
		targetItem = containerList.children[index]
		if !targetItem?
			throw new Error('Out of bounds highlight attempt at ' + index)

		if highlightClass? && highlightClass != ''
			targetItem.classList.add('highlightedQuestion')
			targetItem.classList.add(highlightClass + 'Question')
			return highlightClass + 'Answer'
		else
			for className in targetItem.classList
				if /.+Question/.test(className)
					targetItem.classList.remove(className)
			return null



module.exports = (options) ->
	{questionCount, question, questionIndex: index, container, shuffleAnswers, handlers, messages} = options
	validate([questionCount, question, index], ['int', 'object', 'int'])

	handlers = Object.assign({
		prepareView: null
		gotoQuestion: (newIndex) -> throw new Error('handlers.gotoQuestion is not defined!')
		answerClick: ({answer, index}, highlightAnswerFn, highlightQuestionInListFn) -> throw new Error('handlers.answerClick is not defined!')
		lastQuestionAnswer: -> throw new Error('handlers.lastQuestionAnswer is not defined!')
		backButtonClick: -> throw new Error('handlers.backButtonClick is not defined!')
	}, handlers)

	if typeof index != 'number' || isNaN(index)
		throw new Error('Index must be a number, not ' + index)


	gotoPreviousQuestion = ->
		if index > 0
			handlers.gotoQuestion(index - 1)
		else
			handlers.gotoQuestion(questionCount - 1)

	gotoNextQuestion = (fromAnswerClick = false) ->
		if index < questionCount - 1
			handlers.gotoQuestion(index + 1)
		else if fromAnswerClick
			handlers.lastQuestionAnswer()
		else
			handlers.gotoQuestion(0)


	if index > questionCount - 1
		console.error('Question index is too high - you only have ' + questionCount + ' questions selected!')
		handlers.gotoQuestion(questionCount - 1)
		return

	if index < 0
		console.error('Question index is below zero (' + index + ')!')
		handlers.gotoQuestion(0)
		return


	# TODO: render speed could be greatly improved by reusing questionList
	container.innerHTML = "
		<div class='topbar'>
			<a href='javascript:void(0);' class='backButton'>#{messages.backButton}</a>

			<span class='questionNavigation'>
				<a href='javascript:void(0);' class='previousQuestionButton'>#{MESSAGES.previousQuestion}</a>
				<span class='questionNumber'>
					<span class='questionIndex'>#{index + 1}</span>
					#{MESSAGES.from}
					<span class='questionCollectionLength'>#{questionCount}</span>
				</span>
				<a href='javascript:void(0);' class='nextQuestionButton'>" + MESSAGES.nextQuestion + "</a>
			</span>
		</div>
		<hr class='questionNavigationLine'>

		<ul class='questionList'></ul>
		<hr>

		<div class='testContainer'></div>
	"


	questionListElem = container.getElementsByClassName('questionList')[0]
	setTimeout ->
		# TODO: fix to avoid content jump after load

		# height fix to account for scrollbar height
		# must be delayed to work with overflow-y = auto
		questionListElem.style.height = (2 * questionListElem.offsetHeight - questionListElem.clientHeight) + 'px'
	, 0
	highlightQuestionInList = renderQuestionList(questionCount, index, questionListElem, handlers.gotoQuestion)

	bindNavigationButtons(container, questionCount, index, {
		back: handlers.backButtonClick
		previousQuestion: gotoPreviousQuestion
		nextQuestion: gotoNextQuestion
	})

	questionView = new QuestionView(question)
	if shuffleAnswers
		questionView.shuffleAnswers()
	questionView.renderTo(container.getElementsByClassName('testContainer')[0])

	boundHighlightAnswer = questionView.highlightAnswer.bind(questionView)
	questionView.on 'answerClick', ({index, answer}) ->
		Promise.resolve(handlers.answerClick({index: index, answer: answer}, boundHighlightAnswer, highlightQuestionInList))
		.then (result) ->
			if result
				gotoNextQuestion(true)
		return

	if typeof handlers.prepareView == 'function'
		handlers.prepareView(boundHighlightAnswer, highlightQuestionInList)

	return