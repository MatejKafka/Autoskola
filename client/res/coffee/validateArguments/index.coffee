types = require('./types')


sliceStackTrace = (error, sliceIndex) ->
	try
		throw new error.constructor(error.message)
	catch err
		lines = err.stack.split('\n')
		lines.splice(1, 1 + sliceIndex)
		err.stack = lines.join('\n')
		return err


parseSingleTypeStr = (typeStr) ->
	separatorIndex = typeStr.indexOf('>')
	if separatorIndex >= 0
		return {
			type: typeStr.slice(0, separatorIndex)
			arg: typeStr.slice(separatorIndex + 1)
			str: typeStr
		}
	else {type: typeStr, arg: null, str: typeStr}


parseTypeStr = (typeStr) ->
	typeBlocks = typeStr.split('|').map((type) -> type.trim())
	possibleTypes = []
	for block in typeBlocks
		possibleTypes.push(parseSingleTypeStr(block))
	return possibleTypes


matchSingleType = (value, typeObj, types) ->
	if !types[typeObj.type]?
		throw new Error("Tried to check type against missing definition: #{typeObj.str}")

	callback = (value, typeStr) ->
		return matchesType(value, typeStr, types)
	return types[typeObj.type](value, typeObj.arg, callback)


matchesType = (value, typeStr, types) ->
	if typeof typeStr != 'string'
		throw new Error('typeStr must be string, not ' + typeof typeStr)

	if typeStr[0] == '?' || typeStr[typeStr.length - 1] == '?'
		isOptional = true
		if typeStr[0] == '?'
			typeStr = typeStr.slice(1)
		else
			typeStr = typeStr.slice(0, -1)
	else
		isOptional = false

	if matchSingleType(value, parseTypeStr('null')[0], types) && isOptional
		return true

	possibleTypes = parseTypeStr(typeStr)
	for typeObj in possibleTypes
		matches = null
		try
			matches = matchSingleType(value, typeObj, types)
		catch err
			if err instanceof TypeError
				matches = err
			throw err

		if matches instanceof TypeError && possibleTypes.length == 1
			return matches
		if matches == true then return true
	return false


findType = (value, types) ->
	for typeName of types
		if matchSingleType(value, parseTypeStr(typeName)[0], types)
			return typeName
	console.warn('value does not match any defined type:', value)
	return null


validateArguments = (args, argTypes, types, returnErrors) ->
	for type, i in argTypes
		try
			matches = matchesType(args[i], type, types)
		catch err
			throw sliceStackTrace(err, 2)
		if matches != true
			if returnErrors
				if matches instanceof TypeError
					msg = matches.message
				else
					realType = findType(args[i], types)
					msg = "it must be `#{type}`, not `#{realType}`"
				throw sliceStackTrace(new TypeError("Invalid argument type at index #{i}: #{msg}"), 2)
			else
				return false
	if returnErrors
		return null
	else
		return true


# IT'S IMPORTANT THAT THERE IS 1 STACK LAYER ABOVE validateArguments FUNCTION - otherwise, sliceStackTrace will cut incorrectly
getValidatorFn = (types) ->
	validateFn = (args, argTypes) ->
		return validateArguments(args, argTypes, types, true)

	validateFn.matches = (args, argTypes) ->
		return validateArguments(args, argTypes, types, false)

	validateFn.addType = (name, checkFn) ->
		validateFn([name, checkFn], ['string', 'function'])
		types[name] = checkFn
		return checkFn

	# WARN: clones types when called - when types are later added to parent scope, they won't be recognised
	validateFn.getScope = ->
		return getValidatorFn(Object.assign({}, types))

	return validateFn



# TODO: add toggle for type finding when mismatch occurs

# TODO: nested objects / arrays in argTypes
# TODO: better error messages
# TODO: ("Invalid argument type at index 0: it must be `array>array>string`, not `object`"
# TODO: 	is not very useful - handle nesting through arguments)

# TODO: add braces in arguments (array(string|number) for multiple or array>string for single)
module.exports = getValidatorFn(types)