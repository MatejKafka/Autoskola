action = require('./../updateSectionsAndQuestions/action')
fs = require('fs')
config = require('../../config')

now = ->
	return Math.floor(Date.now() / 1000)


module.exports = (path, collection, collectionName) ->
	actionName = 'saving ' + collectionName
	action.logStart(actionName)

	newJson = JSON.stringify(collection)
	try
		originalJson = fs.readFileSync(path, {encoding: 'utf8'})
	catch err
		originalJson = null

	if newJson == originalJson
		console.info('no changes in ' + collectionName)
		changed = false
	else
		fs.writeFileSync(path + config.collectionSuffix.lastChange, now().toString())
		fs.writeFileSync(path, newJson)
		if originalJson?
			fs.writeFileSync(path + config.collectionSuffix.old, originalJson)
		console.info('updated ' + collectionName)
		changed = true

	action.logEnd(actionName)
	return changed