MESSAGES = require('./../MESSAGES')
CHUNK_SIZE = 30


isStorageQuotaExceededError = require('./isStorageQuotaExceededError')
attemptLocalStorageWrite = require('./attemptLocalStorageWrite')


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


getErasedBlockCount = (name) ->
	arrLength = arrayStore.getArrLength(name)
	if !arrLength?
		return null
	chunkN = getChunkCount(arrLength, CHUNK_SIZE)

	i = 0
	loop
		if i == chunkN || loadRawChunkStr(name, i)?
			break
		i++
	return i


getChunks = (arr, chunkSize, offset) ->
	length = getChunkCount(arr.length - offset, chunkSize)
	out = []
	for i in [0...length]
		out.push(arr.slice((i * chunkSize) + offset, ((i + 1) * chunkSize) + offset))
	return out


writeChunks = (arrChunks, storeName, startingIndex, arrLength, options) ->
	erasedBlockCount = getErasedBlockCount(storeName)
	diff = erasedBlockCount - options.erasedBlockCount
	if diff > 0
		arrChunks = arrChunks.slice(diff)
	startingIndex += erasedBlockCount

	if options.force
		chunkN = getChunkCount(arrayStore.getArrLength(storeName), CHUNK_SIZE)
		for i in [startingIndex...chunkN]
			localStorage.removeItem(storeName + '[' + i + ']')

	for chunk, i in arrChunks
		localStorage.setItem(storeName + '[' + (startingIndex + i) + ']', JSON.stringify(chunk))
	localStorage.setItem(storeName + '.length', arrLength)
	return true



arrayStore = module.exports =
	getArrLength: (name) ->
		arrLengthStr = localStorage.getItem(name + '.length')
		if !arrLengthStr?
			return null

		arrLength = parseInt(arrLengthStr)
		if isNaN(arrLength)
			return null
		else
			return arrLength


	load: (name) ->
		arrLength = arrayStore.getArrLength(name)
		if !arrLength? || arrLength == 0
			return {items: [], erasedBlockCount: 0}

		chunkN = getChunkCount(arrLength, CHUNK_SIZE)
		erasedBlockCount = 0
		items = []
		for i in [0...chunkN]
			chunkItems = loadChunk(name, i)
			if !chunkItems?
				if items.length == 0
					erasedBlockCount++
					console.log('skipped chunk at index ' + i + ' of ' + name)
					continue
				else
					console.warn('Incorrect localStorage array format - ' + name + '[' + i + '] should be array chunk')
					return {items, erasedBlockCount}

			items = items.concat(chunkItems)

		return {items, erasedBlockCount}


	save: (name, arr, options = {}) ->
		if options.force
			arrLength = 0
		else
			arrLength = arrayStore.getArrLength(name)
			if !arrLength
				arrLength = 0

		chunkN = Math.max(getChunkCount(arrLength, CHUNK_SIZE), 1)
		arrChunks = getChunks(arr, CHUNK_SIZE, (chunkN - 1) * CHUNK_SIZE)

		attemptLocalStorageWrite ->
			writeChunks(arrChunks, name, chunkN - 1, arr.length, options)
		return


	removeFirstChunk: (name) ->
		arrLength = arrayStore.getArrLength(name)
		if !arrLength?
			return false

		erasedBlockCount = getErasedBlockCount(name)
		chunkN = getChunkCount(arrLength, CHUNK_SIZE)

		if erasedBlockCount >= chunkN - 1
			return false

		localStorage.removeItem(name + '[' + erasedBlockCount + ']')
		return true