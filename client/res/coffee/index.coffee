bindScreenManager = require('./bindScreenManager')
getTestCollections = require('./getTestCollections')
getQuestionHistoryCollection = require('./getQuestionHistoryCollection')

screens = {
	questionSelect: require('./screens/questionSelect')
	browsing: require('./screens/browsingQuestions')
	#practiceTest: require('./screens/practiceTest')
}


# TODO: add loader screen (overlay - spinner + message)
getTestCollections()
.then (testData) ->
	window.testData = testData
	window.questionHistory = {}
	bindScreenManager(document.getElementById('container'), screens, 'questionSelect')