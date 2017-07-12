getTestResults = require('./getTestResults')


window.util =
	evaluateCurrentTest: ->
		currentTest = store.findOne(db.STORE_TAGS.CURRENT_TEST)
		if !currentTest?
			throw new Error('No test active')
		return getTestResults(currentTest)


	storage:
		getSize: ->
			totalSize = 0

			sizes = {byKey: {}}
			for key of localStorage
				keyValueSize = (localStorage[key].length + key.length) * 2 # UTF-16 - 2 bytes per char
				totalSize += keyValueSize
				sizes.byKey[key] = keyValueSize

			sizes.total = totalSize
			return sizes


		clear: ->
			backup = localStorage.getItem('backup')
			localStorage.clear()
			if backup? && backup != 'null'
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