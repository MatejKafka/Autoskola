config = require('./config')

Logger = require('./logger')
global.logger = new Logger(config.logFilePath)

TestDataStore = require('./TestDataStore')
startWebserver = require('./webserver/startWebserver')

global.logger.log('Starting new server instance')

store = new TestDataStore(config.testDataPaths)
startWebserver(store, config.staticDir, config.testDataPaths.imgDir, process.env.PORT || config.port || 8080)