MESSAGES = require('./MESSAGES')
CONFIG = require('./CONFIG')


require('./util/testUtils')

bindScreenManager = require('./screenManager/bindScreenManager')
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
	window.db = {}

	db.store = testData
	db.store.answers = getAnswerHistoryCollection('answerHistory')
	db.store.questionTypes = questionTypes
	db.store.finishedTests = getPracticeTestCollection('finishedTests')

	db.state = {}
	db.state.currentTest = null

	# TODO: remove
	#test = require('./screens/prepareTest/generateTest')()
	#for question, i in test.questions
	#	answerIndex = Math.floor(Math.random() * (question.answers.length + 1)) - 1
	#	if answerIndex == -1
	#		answerIndex = null
	#	test.answers[i] = answerIndex
	#window.state.db.currentTest = test

	bindScreenManager(document.getElementById('container'), screens, 'home')