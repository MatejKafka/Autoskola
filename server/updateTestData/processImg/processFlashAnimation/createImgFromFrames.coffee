GIFEncoder = require('gifencoder')
bmp = require('bmp-js')
processStaticImg = require('../processStaticImg')
Jimp = require('jimp')
{async, await} = require('asyncawait')


cropImg = (imgBuffer, width, height) ->
	Jimp.read(imgBuffer)
	.then (img) ->
		return new Promise (resolve, reject) ->
			img.crop(0, 0, width, height)
			.getBuffer Jimp.MIME_BMP, (err, newBuffer) ->
				if err
					return reject(err)
				resolve(newBuffer)


framesAreAllSame = (frames) ->
	for frame in frames
		if Buffer.compare(frame.buffer, frames[0].buffer) != 0
			return false
	return true


createGif = async (frames, frameRate, frameSize) ->
	encoder = new GIFEncoder(frameSize.width, frameSize.height)
	encoder.setFrameRate(frameRate)
	encoder.setRepeat(0)
	encoder.setQuality(20)
	encoder.start()

	firstDecoded = bmp.decode(frames[0].buffer)
	shouldCrop = firstDecoded.width == frameSize.width + 1 && firstDecoded.height == frameSize.height + 1

	for frame in frames
		if frame.extension != 'bmp'
			throw new Error('createImgFromFrames currently only supports .bmp frames')

		if shouldCrop
			buffer = await cropImg(frame.buffer, frameSize.width, frameSize.height)
		else
			buffer = frame.buffer

		decodedImg = bmp.decode(buffer)
		encoder.addFrame(decodedImg.data)

	encoder.finish()
	return {
		type: 'animation'
		buffer: encoder.out.getData()
		extension: 'gif'
	}


module.exports = ({frames, frameRate, frameSize}) ->
	if frames.length == 1 || framesAreAllSame(frames)
		return processStaticImg(frames[0].extension, frames[0].buffer)
	else
		return createGif(frames, frameRate, frameSize)