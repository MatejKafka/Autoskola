module.exports = ->
	nextId = 0
	return ->
		return nextId++