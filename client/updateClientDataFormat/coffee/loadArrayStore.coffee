CHUNK_SIZE = 30


getChunkCount = (arrLength, chunkLength) ->
	return Math.ceil(arrLength / chunkLength)


loadRawChunkStr = (name, i) ->
	return localStorage.getItem(name + '[' + i + ']')

loadChunk = (name, i) ->
	chunkStr = loadRawChunkStr(name, i)
	if !chunkStr
		return null

	chunk = JSON.parse(chunkStr)
	if !Array.isArray(chunk)
		return null
	return chunk


getArrLength = (name) ->
	arrLengthStr = localStorage.getItem(name + '.length')
	if !arrLengthStr?
		return null

	arrLength = parseInt(arrLengthStr)
	if isNaN(arrLength)
		return null
	else
		return arrLength


module.exports = (name) ->
	arrLength = getArrLength(name)
	if !arrLength? || arrLength == 0
		return []

	chunkN = getChunkCount(arrLength, CHUNK_SIZE)
	items = []
	for i in [0...chunkN]
		chunkItems = loadChunk(name, i)
		if !chunkItems?
			if items.length == 0
				console.log('skipped chunk at index ' + i + ' of ' + name)
				continue
			else
				console.warn('Incorrect localStorage array format - ' + name + '[' + i + '] should be array chunk')
				return items

		items = items.concat(chunkItems)

	return items