getNextId = require('../getNextId')


module.exports = ({item, meta}, store) ->
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

	if persistent
		store.db.writeItem(newMeta.id, metaItem)
	else
		store.memory.writeItem(newMeta.id, metaItem)

	return metaItem