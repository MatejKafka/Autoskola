parseIdentifierStr = (identifierStr) ->
	tagName = null
	id = null
	classes = []
	attributes = []
	if identifierStr?
		identifiers = identifierStr.split(' ')

		if identifiers.length == 0
			throw new Error('identifierStr must contain at least tagName')

		tagName = identifiers.shift()

		while identifiers.length > 0
			identifier = identifiers.shift()

			if identifier == ''
				continue

			if identifier[0] == '#'
				id = identifier.slice(1)
			else if identifier[0] == '.'
				classes.push(identifier.slice(1))
			else
				parts = identifier.split('=')
				key = parts[0]
				value = parts.slice(1).join('=')
				if !value?
					value = ''
				if value[0] == '"'
					endingChar = '"'
				else if value[0] == "'"
					endingChar = "'"

				if endingChar?
					identifiers.unshift(value.slice(1))
					parts = []
					loop
						nextPart = identifiers.shift()
						if !nextPart?
							break
						index = nextPart.indexOf(endingChar)
						if index > -1
							parts.push(nextPart.slice(0, index))
							identifiers.unshift(nextPart.slice(index + 1))
							break
						parts.push(nextPart)

					value = parts.join(' ')

				attributes.push([key, value])

	return {
		tagName: tagName
		id: id
		classes: classes
		attributes: attributes
	}



module.exports = (identifierStr, children) ->
	# WARN: doesn't support escaping

	if !identifierStr? && children?
		elem = document.createDocumentFragment()
	else
		if Array.isArray(identifierStr)
			children = identifierStr
			identifierStr = null

		{tagName, id, classes, attributes} = parseIdentifierStr(identifierStr)


		elem = document.createElement(tagName)
		if id?
			elem.id = id

		for className in classes
			elem.classList.add(className)

		for [key, value] in attributes
			elem.setAttribute(key, value)

	if Array.isArray(children)
		for child in children
			if child instanceof Node
				elem.appendChild(child)
			else
				elem.appendChild(document.createTextNode(child))

	return elem