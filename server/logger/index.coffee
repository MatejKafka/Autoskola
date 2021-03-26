fs = require('fs')

parseArgs = (args) ->
	path = null
	message = null
	msgData = null
	if args.length == 1
		if typeof args[0] == 'string'
			message = args[0]
		else
			msgData = args[0]
	if args.length == 2
		if typeof args[1] == 'string'
			path = args[0]
			message = args[1]
		else
			message = args[0]
			msgData = args[1]
	if args.length == 3
		path = args[0]
		message = args[1]
		msgData = args[2]
	return {path, message, msgData}


joinPaths = (path1, path2) ->
	if !path2?
		return path1

	if path1.slice(-1) != '/'
		path1 += '/'
	if path2[0] == '/'
		path2 = path2.slice(1)
	return path1 + path2



module.exports = class Logger
	constructor: (pathOrParentLogger, currentLogBranch = '') ->
		@_currentLogBranch = currentLogBranch
		# stdout logger
		if pathOrParentLogger == null
			@_writeStream = null
		else if typeof pathOrParentLogger == 'string'
			@_logPath = pathOrParentLogger
			try
				@_writeStream = fs.createWriteStream(@_logPath, {flags: 'a'})
			catch err
				throw new Error('Could not open logger write stream: ' + err.message)
		else
			@_parentLogger = pathOrParentLogger


	getChildLogger: (additionalLogPath) ->
		return new Logger(@, joinPaths(@_currentLogBranch, additionalLogPath))


	_writeLog: (type, path, message, msgData) ->
		if @_parentLogger?
			@_parentLogger._writeLog(type, path, message, msgData)
		else if @_writeStream?
			@_writeStream.write('\n' + JSON.stringify({time: Date.now(), type, path, message, msgData}))
		else
			# log to stderr
			console.error(JSON.stringify({time: Date.now(), type, path, message, msgData}))
		return


	log: (path, message, msgData) ->
		{path, message, msgData} = parseArgs(arguments)
		path = joinPaths(@_currentLogBranch, path)
		@_writeLog('log', path, message, msgData)
		return


	warn: (path, message, msgData) ->
		{path, message, msgData} = parseArgs(arguments)
		path = joinPaths(@_currentLogBranch, path)
		@_writeLog('warn', path, message, msgData)
		return


	err: ->
		@error.apply(@, arguments)

	error: (path, message, err) ->
		{path, message, msgData} = parseArgs(arguments)
		path = joinPaths(@_currentLogBranch, path)
		err = msgData

		errObj = {}
		for key in Object.getOwnPropertyNames(err)
			errObj[key] = err[key]
		@_writeLog('error', path, message, errObj)
		return