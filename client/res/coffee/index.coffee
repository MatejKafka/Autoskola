MESSAGES = require('./MESSAGES')
CONFIG = require('./CONFIG')
STORE_TAGS = require('./STORE_TAGS')

require('./util/testUtils')

bindScreenManager = require('./screenManager/bindScreenManager')
bindSidemenuManager = require('./screenManager/bindSidemenuManager')
getLoaderManager = require('./screenManager/getLoaderManager')
questionTypes = require('./questionTypes')

getCollection =
	questions: require('./store/collections/getQuestionCollection')
	sections: require('./store/collections/getSectionCollection')
	answers: require('./store/collections/getAnswerHistoryCollection')
	finishedTests: require('./store/collections/getPracticeTestCollection')
	finishedSessions: require('./store/collections/getSessionCollection')


createWrappedEveStore = require('./store/eveStoreWrapper')
updateTestCollections = require('./store/updateTestCollections')

screens = {
	home: require('./screens/home')

	questionSelect: require('./screens/questionSelect')
	browsing: require('./screens/browsing')
	evaluateSession: require('./screens/evaluateSession')
	browseEvaluatedSession: require('./screens/browseEvaluatedSession')

	prepareTest: require('./screens/prepareTest')
	practiceTest: require('./screens/practiceTest')
	evaluateTest: require('./screens/evaluateTest')
	browseEvaluatedTest: require('./screens/browseEvaluatedTest')
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

	return false


window.addEventListener 'error', (msg, url, line, column, err) ->
	if !err?
		err = msg.message
	return handleUncaughtError(err)

window.addEventListener 'unhandledrejection', (event) ->
	return handleUncaughtError(event.reason)

window.store = createWrappedEveStore('store')
window.db =
	questionTypes: questionTypes
	STORE_TAGS: STORE_TAGS

if !store.persistentStorageAvailable()
	alert(MESSAGES.error.storageUnavailable)

loaderManager = getLoaderManager(document.getElementById('loaderCover'))
loaderManager.show(CONFIG.loaderScreenTimeout)

# TODO: add migration script - arrayStore & collections to store
#		after finishing transition to store
updateTestCollections()
.then ->
	loaderManager.hide()

	db.questions = getCollection.questions()
	db.sections = getCollection.sections()
	db.answers = getCollection.answers()
	db.finishedTests = getCollection.finishedTests()
	db.finishedSessions = getCollection.finishedSessions()

	bindScreenManager(document.getElementById('container'), screens, 'questionSelect')
	bindSidemenuManager(document.getElementById('navList'))