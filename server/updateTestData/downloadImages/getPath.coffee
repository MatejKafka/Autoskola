module.exports =
	structureJson: (qId) ->
		return "/#{qId}/structure.json"

	flashStructureJson: (qId) ->
		return "/#{qId}/flashStructure.json"

	questionImg: (qId, extension) ->
		return "/#{qId}/question.#{extension}"

	answerImg: (qId, answerLetter, extension) ->
		return "/#{qId}/answers/#{answerLetter}.#{extension}"
