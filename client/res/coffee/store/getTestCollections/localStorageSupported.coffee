module.exports = ->
	if !window.localStorage?
		return false
	try
		testValue = '@@__testValue__@@'
		localStorage.setItem(testValue, testValue)
		if localStorage.getItem(testValue) != testValue
			return false
		localStorage.removeItem(testValue)
		return true
	catch
		return false