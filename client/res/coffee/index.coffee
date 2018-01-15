require('./polyfills')


CONFIG = require('./CONFIG')
MESSAGES = require('./MESSAGES')
STORE_TAGS = require('./STORE_TAGS')

window.util = require('./util/testUtils')


validateArguments = require('./validateArguments')
bindErrorListeners = require('./bindErrorListeners')
setupScreenManager = require('./setupScreenManager')
prepareStore = require('./prepareStore')

bindSidemenuManager = require('./screenManager/bindSidemenuManager')
getLoaderManager = require('./screenManager/getLoaderManager')
bindMobileMenuToggle = require('./screenManager/bindMobileMenuToggle')

questionTypes = require('./questionTypes')



# GLOBALS INIT
bindErrorListeners()

window.validateArguments = validateArguments
window.db =
	questionTypes: questionTypes
	STORE_TAGS: STORE_TAGS


# GUI INIT
document.title = MESSAGES.pageTitle

bindMobileMenuToggle(
	document.getElementById('mobileMenuToggle'),
	document.getElementById('sidebar'),
	document.getElementById('mobilePageCover')
)
loaderManager = getLoaderManager(document.getElementById('loaderCover'))
loaderManager.show(CONFIG.loaderScreenTimeout)

# STORE INIT
prepareStore()
.then ->
	loaderManager.hide()
	setupScreenManager()
	bindSidemenuManager(document.getElementById('navList'))