path = require('path')

dataDir = path.resolve(__dirname, '../data/')
testDataDir = path.resolve(dataDir, './testData/')

module.exports =
	port: 8080

	logFilePath: path.resolve(__dirname, '../data/logs.txt')
	staticDir: path.resolve(__dirname, '../client/')

	collectionSuffix:
		lastChange: '.lastChange'
		old: '.old'

	testDataPaths:
		dir: testDataDir
		remoteImgQuestions: path.resolve(testDataDir, 'questions.remoteImg.json')
		localImgQuestions: path.resolve(testDataDir, 'questions.localImg.json')
		sections: path.resolve(testDataDir, 'sections.json')
		imgDir: path.resolve(testDataDir, 'img')
		flashReplaceDir: path.resolve(testDataDir, 'flashReplace')
		swfCacheDir: path.resolve(dataDir, './swfCache/')
		imgDirUrl: '/questionImg/'