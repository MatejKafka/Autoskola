# ALL FUNCTIONS ARE IMPURE - to purify, they should copy structure before altering
module.exports = updateStructure =
	add: (structure, item) ->
		structure.location[item.meta.id] = if item.meta.persistent
				structure.LOCATIONS.DB
			else
				structure.LOCATIONS.MEMORY_STORE

		if item.meta.tag?
			if !structure.byTag[item.meta.tag]?
				structure.byTag[item.meta.tag] = []
			structure.byTag[item.meta.tag].push(item.meta.id)

		return structure


	remove: (structure, item) ->
		delete structure.location[item.meta.id]

		if item.meta.tag?
			tagCache = structure.byTag[item.meta.tag]
			tagCache.splice(tagCache.indexOf(item.meta.id), 1)
			if tagCache.length == 0
				delete structure.byTag[item.meta.tag]

		return structure


	change: (structure, item) ->
		if structure.location[item.meta.id]?
			# already written, only changes were applied
			return structure
		return updateStructure.add(structure, item)