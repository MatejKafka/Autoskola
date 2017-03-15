ReadOnlyCollection = require('./ReadOnlyCollection')
localStorageSupported = require('./localStorageSupported')


module.exports = (localStorageEntryName, apiMethod) ->
	if localStorageSupported()
		resourceStr = localStorage.getItem(localStorageEntryName)
		resourceSaveTime = localStorage.getItem(localStorageEntryName + 'SaveTime')
		if resourceStr? && resourceSaveTime? && (parseFloat(resourceSaveTime) + (3600 * 24 * 1000) > Date.now())
			resourceArr = JSON.parse(resourceStr)
			if Array.isArray(resourceArr)
				console.info('Collection `' + localStorageEntryName + '` loaded from localStorage')
				return Promise.resolve(new ReadOnlyCollection(resourceArr))

	apiMethod()
	.then (resourceArr) ->
		if localStorageSupported()
			localStorage.setItem(localStorageEntryName, JSON.stringify(resourceArr))
			localStorage.setItem(localStorageEntryName + 'SaveTime', Date.now())
		console.info('Collection `' + localStorageEntryName + '` loaded from server')
		return new ReadOnlyCollection(resourceArr)