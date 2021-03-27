module.exports =
	questionSelect:
		selectAll: 'Vybrat vše'
		deselectAll: 'Odvybrat vše'
		noSectionChecked: 'Není vybrána žádná otázka!'

	questionView:
		previousQuestion: '<'
		nextQuestion: '>'
		from: 'z'
		point: 'bod'
		points: 'body'

	browsingQuestions:
		evaluateSessionButton: 'Vyhodnotit otázky'
		backToEvaluating: 'Zpět k výsledkům'
		outOfBoundsQuestion: ['Ve vybraných oborech je jen ', ' otázek, zkuste nižší číslo otázky.']
		finishedBrowsingConfirm: 'Dokončili jste procházení vybraných otázek. Chete vyhodnotit projité otázky?'

	practiceTest:
		evaluateTestButton: 'Ukončit a vyhodnotit test'
		evaluateTestPopup: 'Opravdu chcete ukončit a vyhodnotit test?'
		finishedPopup: 'Došli jste k poslední otázce. Chcete ukončit a vyhodnotit test?'
		backToResults: 'Zpět k výsledkům testu'

	evaluateTest:
		succeeded: 'Prospěl'
		didNotSucceed: 'Neprospěl'
		ofNPoints: 'bodů'


	questionLoaderPopup: '
		<img id="loaderSpinner" src="./res/img/loaderCircle.gif">
		<br>
		Načítám testové otázky...
	'


	error:
		errorPopup:
			baseMessage: 'Omlouvám se, v aplikaci nastala neznámá chyba.
						Pro nápravu zkuste stránku znovu načíst, případně kontaktovat administrátora
						(autoskola@matejkafka.com).'

			errorMessageBelow: 'Níže je uvedený důvod chyby:'

		storageFull: 'Zaplnil se úložný prostor, do kterého se ukládaly vaše odpovědi.
					Nové odpovědi nebudou uloženy.'

		storageUnavailable: 'Váš prohlížeč nepodporuje ukládání informací na váš počítač, všechny odpovědi se
							po odchodu ze stránky smažou.'

		questionsNotLoaded: 'Nepovedlo se načíst testové otázky.'

		# shown when some SVG properties required for correct chart display are not supported
		chartNotSupported: 'Váš prohlížeč nepodporuje některé funkce nutné pro správné vykreslení grafu.
							Možná bude vypadat trochu rozbitě.'