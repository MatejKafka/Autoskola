MESSAGES = require('../../MESSAGES').questionView


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


renderQuestionList = (questionCount, index, containerList, gotoQuestionFn) ->
	currentQuestionItem = null
	for i in [0...questionCount]
		do (i) ->
			li = document.createElement('li')
			link = document.createElement('a')
			link.innerHTML = i + 1
			link.addEventListener 'click', ->
				gotoQuestionFn(i)
			li.appendChild(link)
			containerList.appendChild(li)
			if i == index
				currentQuestionItem = li

	currentQuestionItem.classList.add('currentQuestion')
	currentQuestionItem.innerHTML = index + 1
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
	{questionIds, questionIndex: index, container, shuffleAnswers, handlers, messages} = options

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
			handlers.gotoQuestion(questionIds.length - 1)

	gotoNextQuestion = (fromAnswerClick = false) ->
		if index < questionIds.length - 1
			handlers.gotoQuestion(index + 1)
		else if fromAnswerClick
			handlers.lastQuestionAnswer()
		else
			handlers.gotoQuestion(0)


	if index > questionIds.length - 1
		console.error('Question index is too high - you only have ' + questionIds.length + ' questions selected!')
		handlers.gotoQuestion(questionIds.length - 1)
		return

	if index < 0
		console.error('Question index is below zero (' + index + ')!')
		handlers.gotoQuestion(0)
		return

	question = db.questions.get(questionIds[index])


	# TODO: render speed could be much improved by reusing questionList
	container.innerHTML = "
		<div class='topbar'>
			<a href='javascript:void(0);' class='backButton'>#{messages.backButton}</a>

			<span class='questionNavigation'>
				<a href='javascript:void(0);' class='previousQuestionButton'>#{MESSAGES.previousQuestion}</a>
				<span class='questionNumber'>
					<span class='questionIndex'>#{index + 1}</span>
					#{MESSAGES.from}
					<span class='questionCollectionLength'>#{questionIds.length}</span>
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
		# TODO: fix to avoid loadjump issue

		# height fix to account for scrollbar height
		# must be delayed to work with overflow-y = auto
		questionListElem.style.height = (2 * questionListElem.offsetHeight - questionListElem.clientHeight) + 'px'
	, 0
	highlightQuestionInList = renderQuestionList(questionIds.length, index, questionListElem, handlers.gotoQuestion)

	bindNavigationButtons(container, questionIds.length, index, {
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