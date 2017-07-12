LAST_CHECK_TIME_KEY = 'lastUpdateCheckTime'

getLastCheckTime = (collectionName) ->
	if !store.persistentStorageAvailable()
		return null
	result = store.findOne({
		$tag: LAST_CHECK_TIME_KEY
		collection: collectionName
	})
	if result?
		result = result.time
	return result

writeLastCheckTime = (collectionName, checkTime) ->
	if !store.persistentStorageAvailable()
		return
	store.removeByQuery({
		$tag: LAST_CHECK_TIME_KEY
		collection: collectionName
	})
	store.add(LAST_CHECK_TIME_KEY, {
		collection: collectionName
		time: checkTime
	})
	return checkTime


saveItems = (tag, items) ->
	for item in items
		store.add(tag, item)
	return


module.exports = (collectionTag, apiMethod) ->
	since = getLastCheckTime(collectionTag)
	checkStartTime = Date.now()

	return apiMethod(null, since)
	.then (items) ->
		if !items?
			# no changes since last check
			console.debug("`#{collectionTag}s` update skipped - no changes")
			return

		store.removeByQuery(collectionTag)
		saveItems(collectionTag, items)

		writeLastCheckTime(collectionTag, checkStartTime)
		console.debug("`#{collectionTag}s` updated from server")
		return

	.catch (err) ->
		if since?
			console.warn("Could not update `#{collectionTag}s` - server connection failed")
			console.error(err)
			return
		else
			console.error("Could not download `#{collectionTag}s` - no local version saved and server connection failed")
			throw err