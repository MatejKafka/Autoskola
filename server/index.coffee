config = require('./config')

Logger = require('./logger')
global.logger = new Logger(config.logFilePath)

TestDataStore = require('./TestDataStore')
startWebserver = require('./webserver/startWebserver')

global.logger.log('Starting new server instance')

# TODO: add logging for static servers
# TODO: add lot more logging - currently, it's completely useless

# TODO: add gzip compression to webserver
# 	https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression

PORT = process.env.PORT || config.port

store = new TestDataStore(config.testDataPaths)
startWebserver(store, config.staticDir, config.testDataPaths.imgDir, PORT)