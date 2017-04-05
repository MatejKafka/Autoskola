CHUNK_SIZE = 30

getChunks = (arr, chunkSize, offset) ->
	length = Math.ceil((arr.length - offset) / chunkSize)
	out = []
	for i in [0...length]
		out.push(arr.slice((i * chunkSize) + offset, ((i + 1) * chunkSize) + offset))
	return out


module.exports =
	load: (name) ->
		arrLengthStr = localStorage.getItem(name + '.length')
		if !arrLengthStr? || parseInt(arrLengthStr) == 0
			return []
		chunkN = Math.ceil(parseInt(arrLengthStr) / CHUNK_SIZE)
		items = []
		for i in [0...chunkN]
			chunkStr = localStorage.getItem(name + '[' + i + ']')
			if !chunkStr?
				console.warn('Incorrect localStorage array format - ' + name + '[' + i + '] should be array chunk')
				return items
			chunkItems = JSON.parse(chunkStr)
			items = items.concat(chunkItems)

		return items


	appendNew: (name, arr) ->
		# TODO: check for localStorage quota errors - should save to server in future
		arrLengthStr = localStorage.getItem(name + '.length')
		if !arrLengthStr?
			arrLengthStr = 0

		arrLength = parseInt(arrLengthStr)
		chunkN = Math.max(Math.ceil(arrLength / CHUNK_SIZE), 1)

		arrChunks = getChunks(arr, CHUNK_SIZE, (chunkN - 1) * CHUNK_SIZE)
		for chunk, i in arrChunks
			localStorage.setItem(name + '[' + (chunkN - 1 + i) + ']', JSON.stringify(chunk))
		localStorage.setItem(name + '.length', arr.length)
		return