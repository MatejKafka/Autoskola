getStaticImg = require('./getStaticImg')


# only relevant for full translation - getStaticImg is pretty fast
# seeing as many animations are duplicates, add memoization - store hashes of swf files
module.exports = (urlOrExtension, buffer) ->
	extension = urlOrExtension.slice(urlOrExtension.lastIndexOf('.') + 1)
	if extension != 'swf'
		throw new Error('processFlashAnimation can only take .swf file buffers')

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

	# TODO: potentially use this to provide quick way to pick best frame
	#return decompileSwf(buffer)
	#.then(extractRelevantFrames)
	#.then(createImgFromFrames)