MESSAGES = require('./config/MESSAGES')
CONFIG = require('./config/CONFIG')

createWrappedEveStore = require('./store/eveStoreWrapper')
updateTestData = require('./store/updateTestData')

storeConfig = require('./storeConfig')


module.exports = ->
	window.store = createWrappedEveStore(CONFIG.storeNamespace)

	for query in storeConfig.cache
		store.setCacheFor(query)

	for validator in storeConfig.validators
		store.setValidatorFor(validator.tag, validator.validate)

	for decorator in storeConfig.decorators
		store.setDecoratorFor(decorator.tag, {
			decorate: decorator.decorate
			undecorate: decorator.undecorate
		})


	if !store.persistentStorageAvailable()
		alert(MESSAGES.error.storageUnavailable)

	return updateTestData()