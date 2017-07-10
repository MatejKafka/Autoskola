module.exports = (tag, count) ->
	items = store.find(tag)

	if items.length == 0
		return false

	if items.length <= count
		store.remove(items)
		return true

	items.sort (a, b) ->
		return store.getMetadata(a).writeTime - store.getMetadata(b).writeTime

	store.remove(items.slice(0, count))
	return true