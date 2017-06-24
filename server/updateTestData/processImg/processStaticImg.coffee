lwip = require('lwip')
Jimp = require('jimp')

STATIC_IMG_TARGET_EXTENSION = require('./../downloadImages/TARGET_EXTENSIONS').static

# TODO: in future, look for replacement - lwip has problem with latest node versions
processWithLwip = (buffer, imgExtension) ->
	return new Promise (resolve, reject) ->
		lwip.open buffer, imgExtension, (err, img) ->
			if err?
				return reject(err)

			img.toBuffer STATIC_IMG_TARGET_EXTENSION, {}, (err, newBuffer) ->
				if err?
					return reject(err)
				resolve(newBuffer)


processWithJimp = (buffer) ->
	return Jimp.read(buffer)
	.then (img) ->
		return new Promise (resolve, reject) ->
			img.getBuffer Jimp.MIME_PNG, (err, newBuffer) ->
				if err
					return reject(err)
				resolve(newBuffer)


getTargetImgBufferFromStaticImg = (buffer, imgExtension) ->
	if imgExtension == 'gif'
		processWithLwip(buffer, imgExtension)
	else
		processWithJimp(buffer, imgExtension)


getExtension = (path) ->
	dotIndex = path.lastIndexOf('.')
	if dotIndex < 0
		return path
	else
		return path.slice(dotIndex + 1)


module.exports = (urlOrExtension, buffer) ->
	getTargetImgBufferFromStaticImg(buffer, getExtension(urlOrExtension))
	.then (newBuffer) ->
		return {
			type: 'img'
			buffer: newBuffer
			extension: STATIC_IMG_TARGET_EXTENSION
		}