bindScreenManager = require('./screenManager/bindScreenManager')

screens =
	home: require('./screens/home')

	questionSelect: require('./screens/questionSelect')
	browsing: require('./screens/browsing')
	evaluateSession: require('./screens/evaluateSession')
	browseEvaluatedSession: require('./screens/browseEvaluatedSession')

	prepareTest: require('./screens/prepareTest')
	practiceTest: require('./screens/practiceTest')
	evaluateTest: require('./screens/evaluateTest')
	browseEvaluatedTest: require('./screens/browseEvaluatedTest')



module.exports = ->
	container = document.getElementById('container')
	defaultScreenName = 'questionSelect'

	bindScreenManager(container, screens, defaultScreenName)