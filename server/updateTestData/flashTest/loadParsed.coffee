fs = require('fs')


unusedDirs = []
scriptlessDirs = []

for name in fs.readdirSync('./parsed')
	for subdir in fs.readdirSync('./parsed/' + name)
		files = fs.readdirSync('./parsed/' + name + '/' + subdir)
		if files.length == 0
			unusedDirs.push(subdir)
		else
			if subdir == 'morphshapes'
				scriptlessDirs.push(name)
#			if subdir == 'frames' && files.length == 1
#				scriptlessDirs.push(name)



obj = {}
for dir in unusedDirs
	if obj[dir]?
		obj[dir]++
	else
		obj[dir] = 1

console.log obj
console.log scriptlessDirs