

###################################################
#	NEEDS MANUAL COMPILATION THROUGH BROWSERIFY   #
###################################################


CONFIG = require('../../res/coffee/CONFIG')
updateDataFormat = require('./updateDataFormat')
createWrappedEveStore = require('../../res/coffee/store/eveStoreWrapper')


window.store = createWrappedEveStore(CONFIG.storeNamespace)

if !store.persistentStorageAvailable() || localStorage.length == 0 || store.find().length > 0
	window.location.href = '/'
	return


window.newItems = updateDataFormat(store, [
	{
		arrayStoreName: 'answerHistory'
		storeTag: 'answer'
		processItemFn: (item, i) ->
			item.id = i
			if !item.questionIndex
				item.questionIndex = 0
			return item
	}
	{
		arrayStoreName: 'finishedTests'
		storeTag: 'practiceTest'
	}
])

store.clear()
localStorage.clear()

for collection in newItems
	for item in collection
		store.update(item)

window.location.href = '/'