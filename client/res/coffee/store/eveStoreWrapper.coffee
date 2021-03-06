KEYS =
	storageFull: 'persistentStorageFull'
	placeholder: 'persistentStorageFullPlaceholder'

CONFIG = require('../config/CONFIG')
MESSAGES = require('../config/MESSAGES')
createEveStore = require('./eveStore')


moveCollectionToMemory = (tag, eve) ->
	collectionInDb = eve.findOne(tag).$persistent
	if collectionInDb
		eve.removeByQuery({
			$tag: db.STORE_TAGS.LAST_CHECK_TIME
			collection: tag
		})
		items = eve.removeByQuery(tag)
		for item in items
			item.$persistent = false
			eve.update(item)
	return collectionInDb



# TODO: figure out a way to reduce old answer size when storage gets filled - should be pretty compressible
module.exports = ->
	eve = createEveStore.apply(null, arguments)
	persistentStorageAvailable = eve.persistentStorageAvailable()
	attemptedTestDataMove = false

	if eve.count(KEYS.storageFull) > 0
		persistentStorageAvailable = false
		alert(MESSAGES.error.storageFull)
	else
		try
			if eve.count(KEYS.placeholder) == 0
				# create place to guarantee enough space for the real record
				eve.add(KEYS.placeholder, true, {time: 1000000000000000000000000})

	out = {}
	for own key of eve
		do (key) ->
			if typeof eve[key] != 'function'
				out.__defineGetter__(key, -> eve[key])
				out.__defineSetter__(key, (newValue) -> eve[key] = newValue)
			else
				out[key] = ->
					eve[key].apply(eve, arguments)

	out._add = oldAdd = out.add
	out.add = (tag, item) ->
		if !item? && typeof tag == 'object'
			item = tag
			tag = null

		persist = persistentStorageAvailable
		try
			return oldAdd(tag, persist, item)
		catch err
			if err !instanceof eve.StorageFullError
				throw err

			if !attemptedTestDataMove
				console.warn('localStorage full - moving test data (questions and sections) to memory store')
				attemptedTestDataMove = true

				movedSections = moveCollectionToMemory(db.STORE_TAGS.SECTION, eve)
				movedQuestions = moveCollectionToMemory(db.STORE_TAGS.QUESTION, eve)
				if movedSections || movedQuestions
					return out.add(tag, item)
				else
					console.warn('test data already moved')

			try
				eve.removeByQuery(KEYS.placeholder)
				oldAdd(KEYS.storageFull, true, {time: Date.now()})
			alert(MESSAGES.error.storageFull)
			persistentStorageAvailable = false
			return out.add(tag, item)


	# TODO: intercept update fn


	out.StorageFullError = eve.StorageFullError
	out.rawStore = eve

	if CONFIG.storeLogging.log
		require('./bindStoreLogger')(out)

	return out