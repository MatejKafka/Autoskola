require('./polyfills')


CONFIG = require('./config/CONFIG')
MESSAGES = require('./config/MESSAGES')
STORE_TAGS = require('./config/STORE_TAGS')

window.util = require('./util/testUtils')


validateArguments = require('./validateArguments')
bindErrorListeners = require('./bindErrorListeners')
setupScreenManager = require('./setupScreenManager')
prepareStore = require('./prepareStore')
updateTestData = require('./store/updateTestData')

bindSidemenuManager = require('./screenManager/bindSidemenuManager')
getPopupManager = require('./screenManager/getPopupManager')
bindMobileMenuToggle = require('./screenManager/bindMobileMenuToggle')

questionTypes = require('./questionTypes')



# GLOBALS INIT
bindErrorListeners()

window.validateArguments = validateArguments
window.db =
	questionTypes: questionTypes
	STORE_TAGS: STORE_TAGS


# GUI INIT
document.title = MESSAGES.tabTitle
document.getElementById('pageTitle').innerHTML = MESSAGES.pageTitle

bindMobileMenuToggle(
	document.getElementById('mobileMenuToggle'),
	document.getElementById('sidebar'),
	document.getElementById('mobilePageCover')
)

window.popupManager = getPopupManager(document.getElementById('popupBgCover'), document.getElementById('popupContainerInner'))
loaderTimeoutId = setTimeout(
	(-> popupManager.show(MESSAGES.questionLoaderPopup)),
	CONFIG.loaderScreenTimeout
)


# STORE INIT
window.store = prepareStore()

updateTestData()
.then ->
	clearTimeout(loaderTimeoutId)
	popupManager.hide()

	setupScreenManager()
	bindSidemenuManager(document.getElementById('navList'))
.catch (err) ->
	clearTimeout(loaderTimeoutId)
	window.handleError(err)
	popupManager.hide()
	popupManager.show(MESSAGES.error.questionsNotLoaded)