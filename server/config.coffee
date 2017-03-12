path = require('path')

module.exports =
	port: 8080

	dataStoreDirPath: path.resolve(__dirname, '../data/testData/')
	logFilePath: path.resolve(__dirname, '../data/logs.txt')
	staticDir: path.resolve(__dirname, '../client/')