Jimp = require('jimp')


STATIC_IMG_TARGET_EXTENSION = require('./../downloadImages/TARGET_EXTENSIONS').static
TARGET_EXTENSION_MIME_TYPE = 'image/' + STATIC_IMG_TARGET_EXTENSION


loadImg = (buffer) ->
	return Jimp.read(buffer)

getPngBuffer = (jimpImg) ->
	return new Promise (resolve, reject) ->
		jimpImg.getBuffer TARGET_EXTENSION_MIME_TYPE, (err, newBuffer) ->
			if err
				return reject(err)
			resolve(newBuffer)


getTargetImgBufferFromStaticImg = (buffer, imgExtension) ->
	return loadImg(buffer, imgExtension)
	.then(getPngBuffer)


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