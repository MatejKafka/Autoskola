module.exports =
	# TODO: change in production
	verboseErrorMessages: true

	answerClickTimeout: 500
	loaderScreenTimeout: 500

	shuffleAnswers:
		browsingMode: true
		testMode: false

	testSuccessThreshold: 43 # points

	# pairs of [sectionId, questionCount]
	testComposition: [
		[[24, 16, 25], 10] # pravidla provozu
		[14, 3] # dopravni znacky
		[17, 3] # dopravni situace
		[19, 4] # bezpecna jizda
		[21, 2] # souvisejici predpisy
		[22, 2] # podminky provozu
		[20, 1] # zdravotnicka priprava
	]