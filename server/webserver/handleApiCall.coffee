fs = require('fs')

logger = global.logger.getChildLogger('webserver/api')


module.exports = (req, res, next, store) ->
	pathArr = req.path.split('/').slice(1)

	if pathArr.length == 1 || (pathArr.length == 2 && pathArr[1] == '')
		# /api || /api/
		res.sendFile(__dirname + '/apiHelp.txt')
		return

	path = pathArr.slice(1).join('/')

	if req.query.id?
		ids = req.query.id.split(',')
			.map((str) -> parseInt(str.trim(), 10))
			.filter((n) -> !isNaN(n))
	else
		ids = null

	logger.log('idParsed', 'ID query parsed', {reqId: req.id, parsedIds: ids})

	switch path
		when 'getSection', 'getSection/'
			collection = store.sections

		when 'getQuestion', 'getQuestion/'
			collection = store.questions
		else
			logger.log('endpointResolved', 'Invalid endpoint: `' + path + '`', {reqId: req.id, apiEndpoint: path, validEndpoint: false})
			next()
			return

	logger.log('endpointResolved', 'Requesting `' + path + '`', {reqId: req.id, apiEndpoint: path, validEndpoint: true})

	if ids? && ids.length == 0
		logger.log('incorrectQueryFormat', 'Request had incorrect query ID format: `' + req.query.id + '`', {reqId: req.id, idQuery: req.query.id})
		res.sendStatus(400)
		return

	if !ids?
		result = collection.get()
	else if ids.length == 1
		result = collection.get(ids[0])
	else
		result = []
		for id in ids
			result.push(collection.get(id))

	if Array.isArray(result)
		resultLength = result.length
	else
		resultLength = 1
	logger.log('resultRetrieved', 'Retrieved result: ' + resultLength + ' items', {reqId: req.id, resultLength: resultLength})

	res.json(result)