fs = require('fs')
etag = require('etag')

logger = global.logger.getChildLogger('webserver/api')


getWithRemoteImgParam = (req) ->
	withRemoteImg = req.query.withRemoteImg
	if withRemoteImg?
		if withRemoteImg == 'true'
			return true
		else if withRemoteImg == 'false'
			return false
		else
			return null
	return false


getSinceParam = (req) ->
	sinceStr = req.query.since
	if !sinceStr?
		return -Infinity
	since = parseInt(req.query.since)
	if isNaN(since)
		return null
	else
		return since


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
			withRemoteImg = getWithRemoteImgParam(req)
			switch withRemoteImg
				when true
					collection = store.remoteImgQuestions
				when false
					collection = store.localImgQuestions
				when null
					res.status(400).send('Invalid value of "withRemoteImg" parameter - must be either "true" or "false"')
					return
		else
			logger.log('endpointResolved', 'Invalid endpoint: `' + path + '`', {reqId: req.id, apiEndpoint: path, validEndpoint: false})
			next()
			return

	logger.log('endpointResolved', 'Requesting `' + path + '`', {reqId: req.id, apiEndpoint: path, validEndpoint: true})

	if ids? && ids.length == 0
		logger.log('incorrectQueryFormat', 'Request had incorrect query ID format: `' + req.query.id + '`', {reqId: req.id, idQuery: req.query.id})
		res.sendStatus(400)
		return

	since = getSinceParam(req)
	if !since?
		res.status(400).send('Invalid value of "since" parameter - must be integer timestamp')
		return
	if collection.lastChange <= since
		res.sendStatus(304)
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


	responseStr = JSON.stringify(result)

	res.setHeader('Content-Type', 'application/json')
	res.setHeader('Last-Modified', new Date(collection.lastChange * 1000).toUTCString())
	res.setHeader('ETag', etag(responseStr))
	res.send(responseStr)