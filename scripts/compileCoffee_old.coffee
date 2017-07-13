browserify = require('browserify')
coffeeify = require('coffeeify')
minifyify = require('minifyify')
path = require('path')
fs = require('fs-extra')

paths = {
	src: path.resolve('../client/res/coffee/index.coffee')
	out: path.resolve('../client/res/js/bundle.js')
}


bundle = browserify({
	extensions: ['.coffee']
	debug: true
})

bundle.transform(coffeeify)
# TODO: uncomment in production
#bundle.plugin(minifyify)
bundle.add(paths.src)

bundle.bundle (err, buffer) ->
	if err
		throw err
	fs.outputFileSync(paths.out, buffer)
	console.log('SUCCESSFULLY COMPILED TO ' + paths.out)