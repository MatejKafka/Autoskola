fs = require('fs-extra')
path = require('path')
chalk = require('chalk')
replaceImg = require('./replaceImg')
getPath = require('../util/getPath')
writeFile = require('./writeFile')
{async, await} = require('asyncawait')


module.exports = async (question, targetDir) ->
	dirPath = path.resolve(targetDir, '.' + getPath.dir(question.id))

	fs.removeSync(dirPath)

	try
		questionImgObj = await replaceImg(question.QUESTION.img, question.id, null, targetDir)
		answerImgObjs = question.answers.map((answer) -> await replaceImg(answer.img, question.id, answer.letter, targetDir))

		if answerImgObjs.filter((i) -> i?).length == 0
			answerImgObjs = null

		structure =
			id: question.id
			code: question.code
			QUESTION: questionImgObj
			answers: answerImgObjs

		writeFile(targetDir, getPath.structureJson(question.id), JSON.stringify(structure))
		return structure
	catch err
		console.error(chalk.red('ERROR OCCURRED - clearing question directory'))
		console.info('')
		console.info(chalk.magenta('use startIndex argument to continue from last question when re-running this script)'))
		console.info('')

		fs.removeSync(dirPath)
		throw err