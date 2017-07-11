url = require('url')


getUrl = (imgPath, rootWebPath) ->
	return url.resolve(rootWebPath, '.' + imgPath)

pathImgToUrlImg = (img, rootWebPath) ->
	return {
		type: img.type
		url: getUrl(img.path, rootWebPath)
	}


cloneObj = (obj) ->
	return JSON.parse(JSON.stringify(obj))


module.exports = (remoteImgQuestions, imgStructure, imgDirWebPath) ->
	if imgDirWebPath.slice(-1) != '/'
		imgDirWebPath += '/'
	
	structureObj = {}
	for substructure in imgStructure
		structureObj[substructure.id] = substructure

	localImgQuestions = []
	for question in remoteImgQuestions
		matchingFolder = structureObj[question.id]

		qClone = cloneObj(question)

		if question.question.img?
			if !matchingFolder.question?
				throw new Error("missing img: ##{question.id} (question)")
			qClone.question.img = pathImgToUrlImg(matchingFolder.question, imgDirWebPath)

		for answer, i in question.answers
			if answer.img?
				if !matchingFolder.answers[i]?
					throw new Error("missing img: ##{question.id} (answer - i: #{i})")
				qClone.answers[i].img = pathImgToUrlImg(matchingFolder.answers[i], imgDirWebPath)

		localImgQuestions.push(qClone)

	return localImgQuestions