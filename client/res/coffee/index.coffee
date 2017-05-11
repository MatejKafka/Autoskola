MESSAGES = require('./MESSAGES')
CONFIG = require('./CONFIG')


require('./testUtils')

bindScreenManager = require('./bindScreenManager')
getTestCollections = require('./store/getTestCollections')
getAnswerHistoryCollection = require('./store/getAnswerHistoryCollection')
getPracticeTestCollection = require('./store/getPracticeTestCollection')
questionTypes = require('./questionTypes')

screens = {
	home: require('./screens/home')
	questionSelect: require('./screens/questionSelect')
	browsing: require('./screens/browsing')
	prepareTest: require('./screens/prepareTest')
	practiceTest: require('./screens/practiceTest')
	evaluateTest: require('./screens/evaluateTest')
}



handleUncaughtError = (err) ->
	message = MESSAGES.error.errorPopup.baseMessage
	if CONFIG.verboseErrorMessages
		message += '\n\n\n' + MESSAGES.error.errorPopup.errorMessageBelow + '\n\n'
		if err instanceof Error
			if err.stack?
				message += err.stack
			else
				message += err.message
		else
			message += err
	alert(message)
	return


window.onerror = (msg, url, line, column, err) ->
	handleUncaughtError(err)
	return false

window.onunhandledrejection = (event) ->
	handleUncaughtError(event.reason)



# TODO: add loader screen (overlay - spinner + message)
# TODO: remove link from nav menu (signifies current section)
getTestCollections()
.then (testData) ->
	window.db = testData
	window.db.answers = getAnswerHistoryCollection('answerHistory')
	window.db.questionTypes = questionTypes
	window.db.finishedTests = getPracticeTestCollection('finishedTests')
	window.db.currentTest = null

	# TODO: remove
	#test = require('./screens/prepareTest/generateTest')()
	#for question, i in test.questions
	#	answerIndex = Math.floor(Math.random() * (question.answers.length + 1)) - 1
	#	if answerIndex == -1
	#		answerIndex = null
	#	test.answers[i] = answerIndex
	#window.db.currentTest = test

	bindScreenManager(document.getElementById('container'), screens, 'home')