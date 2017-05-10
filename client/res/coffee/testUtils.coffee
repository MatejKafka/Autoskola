getTestResults = require('./getTestResults')


window.util =
	invalidateApiCache: ->
		localStorage.removeItem('sections')
		localStorage.removeItem('sectionsSaveTime')
		localStorage.removeItem('questions')
		localStorage.removeItem('questionsSaveTime')


	arrayStore: require('./store/arrayStore')


	evaluateCurrentTest: ->
		if !db.currentTest?
			throw new Error('No test active')
		return getTestResults(db.currentTest)


	storage:
		getSize: ->
			totalSize = 0

			sizes = {byKey: {}}
			for key of localStorage
				keyValueSize = ((localStorage[key].length + key.length)* 2)
				totalSize += keyValueSize
				sizes.byKey[key] = keyValueSize

			sizes.total = totalSize
			return sizes


		clear: ->
			backup = localStorage.getItem('backup')
			localStorage.clear()
			localStorage.setItem('backup', backup)
			return

		setObj: (obj) ->
			for own key, value of obj
				localStorage[key] = value
			return obj

		getObj: ->
			return Object.assign({}, localStorage)

		backup: ->
			backupObj = @getObj()
			backupStr = JSON.stringify(backupObj)
			localStorage.setItem('backup', backupStr)
			return backupObj

		restoreBackup: ->
			backupStr = localStorage.getItem('backup')
			if !backupStr?
				throw new Error('Could not load backup!')
			obj = JSON.parse(backupStr)
			@setObj(obj)
			return obj

		clearBackup: ->
			localStorage.removeItem('backup')