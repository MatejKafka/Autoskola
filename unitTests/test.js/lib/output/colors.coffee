cfg = {
	heading: 'bold'
	heading2: 'yellow'
	heading3: 'magenta'
	success: 'green'
	error: 'red'
	message: 'white'
	basic: 'white'
}

colors = require('colors/safe')

for elem of cfg
	(->
		color = cfg[elem]
		String.prototype.__defineGetter__(elem, ->
			return colors[color](this.valueOf())
		)
	)()