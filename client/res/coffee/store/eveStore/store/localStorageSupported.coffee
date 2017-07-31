module.exports = ->
	try
		if !window.localStorage?
			return false

		if localStorage.key(0)?
			if localStorage.getItem(localStorage.key(0))?
				return true

		testValue = '@@__testValue__@@'
		localStorage.setItem(testValue, testValue)
		if localStorage.getItem(testValue) != testValue
			return false
		localStorage.removeItem(testValue)
		return true
	catch
		return false