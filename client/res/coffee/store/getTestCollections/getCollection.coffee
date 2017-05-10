createReadOnlyCollection = require('./createReadOnlyCollection')
localStorageSupported = require('./localStorageSupported')
isStorageQuotaExceededError = require('../isStorageQuotaExceededError')

DAY_IN_MS = 3600 * 24 * 1000
CACHE_TIMEOUT = 5 * DAY_IN_MS


module.exports = (localStorageEntryName, apiMethod) ->
	if localStorageSupported()
		resourceStr = localStorage.getItem(localStorageEntryName)
		resourceSaveTime = localStorage.getItem(localStorageEntryName + 'SaveTime')
		if resourceStr? && resourceSaveTime? && (parseFloat(resourceSaveTime) + CACHE_TIMEOUT > Date.now())
			resourceArr = JSON.parse(resourceStr)
			if Array.isArray(resourceArr)
				console.debug('Collection `' + localStorageEntryName + '` loaded from localStorage')
				return Promise.resolve(createReadOnlyCollection(resourceArr))

	apiMethod()
	.then (resourceArr) ->
		if localStorageSupported()
			newResourceStr = JSON.stringify(resourceArr)
			try
				if newResourceStr != resourceStr
					localStorage.setItem(localStorageEntryName, newResourceStr)
				localStorage.setItem(localStorageEntryName + 'SaveTime', Date.now())
			catch err
				if isStorageQuotaExceededError(err)
					# save space for other stuff, load this from server every time
					localStorage.removeItem(localStorageEntryName)
					localStorage.removeItem(localStorageEntryName + 'SaveTime')
				else
					throw err
		console.debug('Collection `' + localStorageEntryName + '` loaded from server')
		return createReadOnlyCollection(resourceArr)

	.catch (err) ->
		if resourceStr?
			resourceArr = JSON.parse(resourceStr)
			if Array.isArray(resourceArr)
				console.warn('Loaded last cached version of `' + localStorageEntryName + '` collection, because the server API could not be accessed.')
				return createReadOnlyCollection(resourceArr)

		console.warn('Server API inaccessible, while local cache is corrupt - could not load `' + localStorageEntryName + '` collection.')
		throw err