bindScreenManager = require('./screenManager/bindScreenManager')

screens =
	questionSelect: require('./screens/browsing/questionSelect')
	browsing: require('./screens/browsing/browsing')
	evaluateSession: require('./screens/browsing/evaluateSession')
	browseEvaluatedSession: require('./screens/browsing/browseEvaluatedSession')

	prepareTest: require('./screens/practiceTest/prepareTest')
	practiceTest: require('./screens/practiceTest/practiceTest')
	evaluateTest: require('./screens/practiceTest/evaluateTest')
	browseEvaluatedTest: require('./screens/practiceTest/browseEvaluatedTest')



module.exports = ->
	container = document.getElementById('container')
	defaultScreenName = 'questionSelect'

	bindScreenManager(container, screens, defaultScreenName)