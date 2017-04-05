MESSAGES = require('./MESSAGES')

require('./testUtils')

bindScreenManager = require('./bindScreenManager')
getTestCollections = require('./getTestCollections')
AnswerHistoryCollection = require('./AnswerHistoryCollection')
questionTypes = require('./questionTypes')

screens = {
	home: require('./screens/home')
	questionSelect: require('./screens/questionSelect')
	browsing: require('./screens/browsingQuestions')
	#practiceTest: require('./screens/practiceTest')
}


window.onerror = ->
	alert(MESSAGES.errorPopup)
	return false

window.onunhandledrejection = (e) ->
	alert(MESSAGES.errorPopup)


# TODO: add loader screen (overlay - spinner + message)
getTestCollections()
.then (testData) ->
	window.db = testData
	window.db.answers = new AnswerHistoryCollection()
	window.db.questionTypes = questionTypes
	bindScreenManager(document.getElementById('container'), screens, 'home')