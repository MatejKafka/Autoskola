createEveStore = require('./eveStore')

module.exports = ->
	eve = createEveStore.apply(null, arguments)
	persistentStorageAvailable = eve.persistentStorageAvailable()

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
			# TODO finish
			# TODO: add removing when localStorage is full
			alert('locStorage full')

		# TODO: WHEN REMOVING QUESTIONS & SECTIONS, MOVE THEM TO MEMORY STORE
		# TODO: 	also remove lastCheckTime record for both

	# TODO: intercept update fn


	out.rawStore = eve
	return out