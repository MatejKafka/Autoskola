CONFIG = require('../CONFIG')
MESSAGES = require('../MESSAGES').evaluateTest
PASS_SCORE = CONFIG.testSuccessThreshold


e = require('../util/createElem')
getTestResults = require('../util/getTestResults')


saveTestResults = (test, results) ->
	console.debug('Saving test results...')
	endTime = Date.now()

	testId = db.finishedTests.add({
		startTime: test.startTime
		endTime: endTime
		passScore: PASS_SCORE
		passed: results.passed
		score: results.score
		maxScore: results.maxScore
	})

	console.debug('(testId = ' + testId + ')')

	for isCorrect, i in results.answerResults
		db.answers.add({
			mode: 'practiceTest'
			testId: testId
			correctlyAnswered: isCorrect
			selectedAnswerIndex: test.answers[i]
			questionId: test.questionIds[i]
			questionIndex: i
			attemptNumber: 0
		})

	return testId


renderSuccessBar = (score, maxScore) ->
	passed = score >= PASS_SCORE
	percentage = Math.round(score / maxScore * 100)

	thresholdPercentage = Math.round(PASS_SCORE / maxScore * 100)

	container = e('div .scoreBarContainer ' + (if passed then '.succeeded' else '.failed'), [
		e('h2 .successMessage', [
			(if passed then MESSAGES.succeeded else MESSAGES.didNotSucceed)
		])
		e('div .scoreBarLabels', [
			e('div .scoreBarPoints', [score + ' / ' + maxScore + ' ' + MESSAGES.ofNPoints])
			e('div .scoreBarPercentage', [percentage + ' %'])
		])
		e('div .scoreBar', [
			scoreLine = e('div .scoreBarLine')
			thresholdElem = e('div .scoreBarThreshold')
		])
	])

	scoreLine.style.width = percentage + '%'
	thresholdElem.style.left = (thresholdPercentage - 0.25) + '%'

	return container


renderQuestionList = (test, testResults, goto) ->
	items = for questionId, i in test.questionIds
		question = db.questions.get(questionId)
		do (question, i) ->
			itemClass = ''
			switch testResults.answerResults[i]
				when true
					itemClass = '.correct'
				when false
					itemClass = '.incorrect'
				else
					itemClass = '.unanswered'
			item = e('li ' + itemClass, [
				link = e('a .linkToQuestion', [
					e('div .questionIndex', [i + 1])
					e('div .questionText', [question.question.text])
				])
			])
			link.title = question.question.text
			link.href = 'javascript:void(0);'
			link.addEventListener 'click', ->
				goto('browseEvaluatedTest', {q: i + 1})
			return item

	questionAnswerList = e('ul .questionAnswerList', items)
	return questionAnswerList


module.exports = (container, goto) ->
	currentTest = store.findOne(db.STORE_TAGS.CURRENT_TEST)

	if !currentTest?
		goto('prepareTest')
		return

	currentTest.lastViewedIndex = null
	store.update(currentTest)


	if !currentTest.finished
		testResults = getTestResults(currentTest)
		saveTestResults(currentTest, testResults)
		currentTest.results = testResults
		currentTest.finished = true
		store.update(currentTest)
	else
		testResults = currentTest.results


	resultContainer = e('div .testResults')
	container.appendChild(resultContainer)

	resultContainer.appendChild(e(null, [
		e('h1', ['Výsledky testu'])
		backToTestButton = e('a .backToTest href="javascript:void(0);"', ['Zpět k zahájení testu'])
		e('br')
		renderSuccessBar(testResults.score, testResults.maxScore)
		#e('hr')
		renderQuestionList(currentTest, testResults, goto)
	]))

	backToTestButton.addEventListener 'click', ->
		store.removeByQuery(db.STORE_TAGS.CURRENT_TEST)
		goto('prepareTest')
		return