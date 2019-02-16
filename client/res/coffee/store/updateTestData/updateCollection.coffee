getLastCheckTime = (collectionName) ->
	if !store.persistentStorageAvailable()
		return null
	result = store.findOne({
		$tag: db.STORE_TAGS.LAST_CHECK_TIME
		collection: collectionName
	})
	if result?
		result = result.time
	return result


writeLastCheckTime = (collectionName, checkTime, persistent) ->
	if !store.persistentStorageAvailable()
		return
	store.removeByQuery({
		$tag: db.STORE_TAGS.LAST_CHECK_TIME
		collection: collectionName
	})
	store._add(db.STORE_TAGS.LAST_CHECK_TIME, persistent, {
		collection: collectionName
		time: checkTime
	})
	return checkTime


saveItems = (tag, items, persistent = true) ->
	for item in items
		try
			store._add(tag, persistent, item)
		catch err
			if err !instanceof store.StorageFullError
				throw err
			store.removeByQuery(tag)
			saveItems(tag, items, false)
			return false
	return true


module.exports = (collectionTag, apiMethod) ->
	since = getLastCheckTime(collectionTag)
	checkStartTime = Date.now()

	return apiMethod(null, since)
	.catch (err) ->
		if since?
			console.warn("Could not update `#{collectionTag}s` - server connection failed")
			console.error(err)
			return
		else
			console.error("Could not download `#{collectionTag}s` - no local version saved and server connection failed")
			throw err

	.then (items) ->
		if !items?
			# no changes since last check
			console.debug("`#{collectionTag}s` update skipped - no changes")
			return

		store.removeByQuery(collectionTag)
		persistent = saveItems(collectionTag, items)

		writeLastCheckTime(collectionTag, checkStartTime, persistent)
		console.debug("`#{collectionTag}s` updated from server")
		return