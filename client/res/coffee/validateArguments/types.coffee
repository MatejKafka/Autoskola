# matchTypeFn returns either true/false or error (if used type checker function returned an error)
module.exports =
	array: (arg, arrItemType = null, matchTypeFn) ->
		if !Array.isArray(arg)
			return false
		if arrItemType?
			for item in arg
				if matchTypeFn(item, arrItemType) != true
					return false
		return true

	null: (arg) ->
		return !arg?

	function: (arg) ->
		return typeof arg == 'function'

	string: (arg) ->
		return typeof arg == 'string'

	int: (arg) ->
		return @number(arg) && (arg % 1) == 0

	number: (arg) ->
		return typeof arg == 'number'

	boolean: (arg) ->
		return typeof arg == 'boolean'

	object: (arg) ->
		return arg? && typeof arg == 'object'

	'*': ->
		return true