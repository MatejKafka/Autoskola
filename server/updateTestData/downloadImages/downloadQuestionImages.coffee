replaceImg = require('./replaceImg')
getPath = require('./getPath')
writeFile = require('./writeFile')

getFlashAnim = (imgObj) ->
	if imgObj? && imgObj.type == 'animation'
		return imgObj.path
	else
		return null

getFlashImgStructure = (structure) ->
	if structure.answers?
		answers = structure.answers.map(getFlashAnim)
	else
		answers = null

	out =
		question: getFlashAnim(structure.question)
		answers: answers

	if !out.question? && out.answers.filter((a) -> a?).length == 0
		return null
	else
		return Object.assign({}, structure, out)


module.exports = (question, targetDir) ->
	questionImgObj = replaceImg(question.question.img, question.id, null, targetDir)
	answerImgObjs = question.answers.map((answer) -> replaceImg(answer.img, question.id, answer.letter, targetDir))

	if answerImgObjs.filter((i) -> i?).length == 0
		answerImgObjs = null

	structure =
		id: question.id
		code: question.code
		question: questionImgObj
		answers: answerImgObjs

	flashStructure = getFlashImgStructure(structure)

	writeFile(targetDir, getPath.structureJson(question.id), JSON.stringify(structure))
	if flashStructure?
		writeFile(targetDir, getPath.flashStructureJson(question.id), JSON.stringify(flashStructure))
	return structure