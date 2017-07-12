module.exports = (obj) ->
	for own key of obj
		return false
	return true