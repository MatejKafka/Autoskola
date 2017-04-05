createReadOnlyCollection = require('./createReadOnlyCollection')
localStorageSupported = require('./localStorageSupported')
isStorageQuotaExceededError = require('./isStorageQuotaExceededError')

DAY_IN_MS = 3600 * 24 * 1000


module.exports = (localStorageEntryName, apiMethod) ->
	if localStorageSupported()
		resourceStr = localStorage.getItem(localStorageEntryName)
		resourceSaveTime = localStorage.getItem(localStorageEntryName + 'SaveTime')
		if resourceStr? && resourceSaveTime? && (parseFloat(resourceSaveTime) + (DAY_IN_MS * 5) > Date.now())
			resourceArr = JSON.parse(resourceStr)
			if Array.isArray(resourceArr)
				#console.info('Collection `' + localStorageEntryName + '` loaded from localStorage')
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
		#console.info('Collection `' + localStorageEntryName + '` loaded from server')
		return createReadOnlyCollection(resourceArr)