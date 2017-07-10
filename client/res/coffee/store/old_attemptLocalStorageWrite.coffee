MESSAGES = require('../MESSAGES')

isStorageQuotaExceededError = -> # noop

invalidateApiCache = ->
	localStorage.removeItem('sections')
	localStorage.removeItem('sectionsSaveTime')
	localStorage.removeItem('questions')
	localStorage.removeItem('questionsSaveTime')


attemptWrite = (writeFn, freeSpaceFn, i = 0) ->
	try
		return writeFn()
	catch err
		if !isStorageQuotaExceededError(err)
			throw err

		try
			freeSpaceFn(i)
		catch err
			throw new Error('Could not write to localStorage due to size limit: ' + err.message)

		return attemptWrite(writeFn, freeSpaceFn, i + 1)


# TODO: test if this... creation... works
module.exports = (writeFn) ->
	return attemptWrite writeFn, (i) ->
		switch i
			when 0
				console.error('localStorage is full!')
				console.log('Removing API cache - all questions will be loaded from server every time')
				invalidateApiCache()
				return

			when 1
				console.log('API cache was already removed')
				console.log('All new additions will start erasing oldest blocks when needed')
				alert(MESSAGES.error.storageFull)
				# assuming that answers take up most of the localStorage by now,
				# we can gain some space by removing chunks from the beginning
				if !db.answers.removeOldestChunk()
					console.log('Could not erase block of answers')
					console.log('Attempting to erase block of practiceTests')
					# all answers deleted (very improbable)
					# last resort - start deleting oldest practice tests
					if !db.finishedTests.removeOldestChunk()
						# fuck my life
						throw new Error('localStorage filed up by unknown data')
				return

			else
				throw new Error('Cannot write to localStorage for unknown reasons (it is probably full)')