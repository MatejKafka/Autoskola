getNextId = require('../getNextId')


module.exports = ({item, meta, isExisting}, store) ->
	if isExisting
		# will overwrite existing item
		newMeta = meta
	else
		id = getNextId(store)

		if meta.persistent == true
			persistent = true
		else
			persistent = false

		newMeta =
			id: id
			tag: meta.tag
			persistent: persistent
			writeTime: Date.now()

	metaItem = {item, meta: newMeta}

	if newMeta.persistent
		store.db.writeItem(newMeta.id, metaItem)
	else
		store.memory.writeItem(newMeta.id, metaItem)

	return metaItem