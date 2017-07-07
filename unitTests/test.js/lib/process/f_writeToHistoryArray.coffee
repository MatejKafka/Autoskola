module.exports = (historyArray) ->
	return (fileName, testData) ->
		done = false

		for item in historyArray
			if item.file == fileName
				item.data.push(testData)
				# remove current value - it won't be needed again
				done = true

		if !done
			historyArray.push({
				file: fileName
				data: [testData]
			})