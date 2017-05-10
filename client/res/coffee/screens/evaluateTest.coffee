CONFIG = require('../CONFIG')
MESSAGES = require('../MESSAGES').evaluateTest
PASS_SCORE = CONFIG.testSuccessThreshold


e = require('../createElem')
getTestResults = require('../getTestResults')


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
			questionId: test.questions[i].id
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
	items = for question, i in test.questions
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
				goto('practiceTest', {q: i + 1})
			return item

	questionAnswerList = e('ul .questionAnswerList', items)
	return questionAnswerList


module.exports = (container, goto) ->
	if !db.currentTest?
		goto('prepareTest')
		return

	testResults = getTestResults(db.currentTest)

	if !db.currentTest.finished
		saveTestResults(db.currentTest, testResults)
		db.currentTest.results = testResults
		db.currentTest.finished = true


	resultContainer = e('div .testResults')
	container.appendChild(resultContainer)

	resultContainer.appendChild(e(null, [
		e('h1', ['Výsledky testu'])
		backToTestButton = e('a .backToTest href="javascript:void(0);"', ['Zpět k zahájení testu'])
		e('br')
		renderSuccessBar(testResults.score, testResults.maxScore)
		#e('hr')
		renderQuestionList(db.currentTest, testResults, goto)
	]))

	backToTestButton.addEventListener 'click', ->
		db.currentTest = null
		goto('prepareTest')
		return