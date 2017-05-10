module.exports = (err) ->
	if !err?
		return false
	if err.code?
		switch err.code
			when 22
				return true
			when 1014
				# Firefox
				if err.name == 'NS_ERROR_DOM_QUOTA_REACHED'
					return true
	else if err.number == -2147024882
		# Internet Explorer 8
		return true
	return false;