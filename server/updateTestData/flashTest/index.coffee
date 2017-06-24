fs = require('fs')
jpexs = require('jpexs-flash-decompiler')
request = require('request')

questions = require('../../../../data/testData/remoteImgQuestions.test.json')


flashQ = questions.filter (q) ->
	return q.question.img? && q.question.img.type == 'animation'

flashAnimUrls = flashQ.map (q) -> q.question.img.url


#done = 0
#fileNames = []
#for url in flashAnimUrls
#	do ->
#		name = url.slice(url.lastIndexOf('/'))
#		fileNames.push(name)
#		request(url)
#		.on 'response', ->
#			console.log('LOADED: ' + name)
#			done++
#			if done == flashAnimUrls.length
#				parseAnimations()
#		.pipe(fs.createWriteStream('./animations/' + name))


fileNames = fs.readdirSync('./animations')


oldLog = console.log
logged = []
captureConsoleLog = ->
	logged = []
	console.log = ->
		logged.push(Array::slice.call(arguments).join(' '))
		return

stopCapture = ->
	console.log = oldLog
	return logged


parseAnimations = (i = 0) ->
	next = ->
		if fileNames[i + 1]?
			setTimeout(->
				parseAnimations(i + 1)
			, 10)
		else
			console.log('\nFINISHED')

	name = fileNames[i]
	if fs.existsSync('./parsed/' + name)
		console.log('SKIPPING: ' + name + ' (' + (i + 1) + './' + fileNames.length + ')')
		next()
		return

	console.log('STARTING: ' + name + ' (' + (i + 1) + './' + fileNames.length + ')')
	captureConsoleLog()
	jpexs.export({
		file: './animations/' + name
		output: './parsed/' + name
		items: [jpexs.ITEM.ALL]
		#items: [jpexs.ITEM.SPRITE, jpexs.ITEM.IMAGE]
		#formats: [jpexs.FORMAT.SPRITE.SVG, jpexs.FORMAT.IMAGE.PNG]
	}, (err) ->
		stopCapture()
		if err?
			console.log('ERROR WHILE PROCESSING: ' + name + ' (' + (i + 1) + './' + fileNames.length + ')')
			console.error(err.message)
		else
			console.log('DONE: ' + name + ' (' + (i + 1) + './' + fileNames.length + ')')
			next()
	)

parseAnimations()