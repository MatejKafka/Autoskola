config = require('./config')

Logger = require('./logger')
global.logger = if process.env.LOG_STDERR \
	then new Logger(null) \
	else new Logger(config.logFilePath)

TestDataStore = require('./TestDataStore')
startWebserver = require('./webserver/startWebserver')

global.logger.log('Starting new server instance')

# TODO: add logging for static servers
# TODO: add lot more logging - currently, it's completely useless


HOST = process.env.HOST || config.host
PORT = process.env.PORT || config.port

store = new TestDataStore(config.testDataPaths)
startWebserver(store, config.staticDir, config.testDataPaths.imgDir, HOST, PORT)