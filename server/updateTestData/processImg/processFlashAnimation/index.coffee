getStaticImg = require('./getStaticImg')


# TODO: seeing as many animations are duplicates, add memoization - store hashes of swf files

module.exports = (urlOrExtension, buffer) ->
	extension = urlOrExtension.slice(urlOrExtension.lastIndexOf('.') + 1)
	if extension != 'swf'
		throw new Error('processFlashAnimation can only take .swf file buffers, not ' + extension)

	return getStaticImg(buffer)
	.then (staticImg) ->
		if staticImg?
			return staticImg

		# will be replaced by hand
		return {
			type: 'animation'
			buffer: buffer
			extension: extension
		}