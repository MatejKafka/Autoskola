scriptStart = 'gotoAndPlay('
parseScript = (scriptObj) ->
	if scriptObj.code.indexOf(scriptStart) != 0
		throw new Error('Incorrect script format')

	frameNPart = scriptObj.code.slice(scriptStart.length)
	start = parseInt(frameNPart.slice(0, frameNPart.indexOf(')')))
	end = scriptObj.n

	if isNaN(start) || isNaN(end)
		throw new Error('Incorrect script format')

	return [start - 1, end]



module.exports = (decompiledSwf) ->
	if decompiledSwf.scripts.length > 0
		try
			[start, end] = parseScript(decompiledSwf.scripts[0])
		catch
			throw new Error('Error while extracting frames: incorrect script format')

		#noinspection JSUnresolvedVariable
		frames = decompiledSwf.frames.slice(start, end)
	else
		frames = decompiledSwf.frames.slice()

	return {
		frames: frames
		frameRate: decompiledSwf.frameRate
		frameSize: decompiledSwf.frameSize
	}