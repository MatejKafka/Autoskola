path = require('path')
express = require('express')
cors = require('cors')
compression = require('compression')
handleApiCall = require('./handleApiCall')

logger = global.logger.getChildLogger('webserver')
alreadyRunning = false


limitToGetMw = (req, res, next) ->
	if req.method.toLowerCase() != 'get'
		res.status(405)
		res.setHeader('Allow', 'GET')
		res.send('Only `GET` HTTP method is allowed!')
	else
		next()


module.exports = (store, staticDirPath, testImgDirPath, host, port) ->
	if alreadyRunning
		logger.error('alreadyRunning', 'Webserver instance is already running!')
		throw new Error('Webserver instance is already running!')
	alreadyRunning = true

	webserver = express()

	# add compression
	webserver.use(compression())

	# API
	webserver.all('/api*', cors())
	webserver.all('/api*', limitToGetMw)
	webserver.get('/api*', (req, res, next) ->
		handleApiCall(req, res, next, store)
	)

	# question img dir
	webserver.all('/questionImg*', cors())
	webserver.all('/questionImg*', limitToGetMw)
	webserver.use('/questionImg', express.static(testImgDirPath))

	# static server
	webserver.use(express.static(staticDirPath))

	# error handler
	webserver.use((err, req, res, next) ->
		res.sendStatus(500)
		logger.error('error', 'Error occurred in webserver!', err)
	)


	listener = webserver.listen port, host, ->
		host = listener.address().address
		port = listener.address().port
		logger.log('start', 'Webserver started!', {host, port})
		console.log('Webserver running on ' + host + ':' + port)