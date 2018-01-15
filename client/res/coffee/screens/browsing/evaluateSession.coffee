CONFIG = require('../../CONFIG')
MESSAGES = require('../../MESSAGES').evaluateTest

e = require('../../util/createElem')


getResults = (sessionObj) ->
	existingAnswers = sessionObj.answers.filter((answerArr) -> answerArr? && answerArr.length > 0)
	return {
		score: existingAnswers.filter((answerArr) -> answerArr.length == 1).length
		maxScore: existingAnswers.length
	}


renderSuccessBar = (score, maxScore) ->
	percentage = Math.round(score / maxScore * 100)
	if isNaN(percentage)
		percentage = 0
		percentageStr = '-'
	else
		percentageStr = percentage

	container = e('div .scoreBarContainer .succeeded', [
		e('div .scoreBarLabels', [
			e('div .scoreBarPoints', [score + ' / ' + maxScore + ' ' + MESSAGES.ofNPoints])
			e('div .scoreBarPercentage', [percentageStr + ' %'])
		])
		e('div .scoreBar', [
			scoreLine = e('div .scoreBarLine')
		])
	])

	scoreLine.style.width = percentage + '%'
	return container


renderQuestionList = (session, goto) ->
	items = for questionId, i in session.questionIds
		qAnswers = session.answers[i]
		if !qAnswers? || qAnswers.length == 0
			continue

		question = store.findOne({
			$tag: db.STORE_TAGS.QUESTION
			id: questionId
		})
		if !question?
			continue

		itemClass = ''
		if qAnswers.length == 1
			itemClass = '.correct'
		else
			itemClass = '.incorrect'

		do (i) ->
			item = e('li ' + itemClass, [
				link = e('a .linkToQuestion', [
					e('div .questionIndex', [i + 1])
					e('div .questionText', [question.question.text])
				])
			])
			link.title = question.question.text
			link.href = 'javascript:void(0);'
			link.addEventListener 'click', ->
				goto('browseEvaluatedSession', {q: i + 1})
			return item

	questionAnswerList = e('ul .questionAnswerList', items)
	return questionAnswerList


module.exports = (container, goto) ->
	currentSession = store.findOne(db.STORE_TAGS.CURRENT_BROWSING_SESSION)

	if !currentSession?
		return goto('questionSelect')

	currentSession.lastViewedIndex = null
	store.update(currentSession)

	if !currentSession.finished
		sessionResults = getResults(currentSession)
		currentSession.results = sessionResults
		currentSession.finished = true
		store.update(currentSession)
	else
		sessionResults = currentSession.results


	resultContainer = e('div .testResults')
	container.appendChild(resultContainer)

	resultContainer.appendChild(e(null, [
		e('h1', ['Vyhodnocení projitých otázek'])
		backButton = e('a .backToTest href="javascript:void(0);"', ['Zpět k výběru otázek'])
		e('br')
		renderSuccessBar(sessionResults.score, sessionResults.maxScore)
		#e('hr')
		renderQuestionList(currentSession, goto)
	]))

	backButton.addEventListener 'click', ->
		store.removeByQuery(db.STORE_TAGS.CURRENT_BROWSING_SESSION)
		goto('questionSelect')
		return