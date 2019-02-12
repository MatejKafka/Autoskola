getNextId = require('../getNextId')
cloneValue = require('../util/cloneValue')
validateArguments = require('../typeValidator')


module.exports = ({item, meta, isExisting}, eventInfoCb, store) ->
	validateArguments([item, meta, isExisting, eventInfoCb], ['object', 'object', 'boolean', 'function'])

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

	metaItem = {item: cloneValue(item), meta: newMeta}

	if newMeta.persistent
		store.db.writeItem(newMeta.id, metaItem)
	else
		store.memory.writeItem(newMeta.id, metaItem)

	return metaItem