module.exports = (targetObj, srcObjs...) ->
	for obj in srcObjs
		for own key, value of obj
			targetObj[key] = value
	return targetObj