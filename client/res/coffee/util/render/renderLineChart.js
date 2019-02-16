const CSS_CLASS_PREFIX = 'chart-'
const CSS_CLASS_NAMES = {
	container: CSS_CLASS_PREFIX + 'container',
	labels: CSS_CLASS_PREFIX + 'labels',
	mainSvg: CSS_CLASS_PREFIX + 'svg',
	dataLinesContainer: CSS_CLASS_PREFIX + 'lines',
	axisMarkersContainer: CSS_CLASS_PREFIX + 'axis-markers',
	singlePointMarker: CSS_CLASS_PREFIX + 'point'
}

// affects rendering in browsers that don't support vector-effect property
const SVG_WIDTH = 100
const SVG_HEIGHT = 100

// how much are chart lines offset from marker start
const CHART_OFFSET = 2



const getRange = from => to => interval => {
	let out = []
	for (let i = from; i < to; i += interval) {
		out.push(i)
	}
	return out
}

const getChartPoint = (value, i) => [i, value]

const normalizePoint = ([maxX, maxY]) => point => [point[0] / maxX, point[1] / maxY]


const scalePoint = ([xScale, yScale]) => point => [point[0] * xScale, point[1] * yScale]

const pointToSvgInstruction = instructionLetter => point =>
	instructionLetter + ' ' + point[0] + ' ' + point[1]

const getSvgPathStrSegment = (point, i) => pointToSvgInstruction(i === 0 ? 'M' : 'L')(point)


const createSvgPathElem = pathStr => updateElemAttribute('d')(pathStr)(createSvgElement('path')([]))

const updateElemAttribute = attrName => attrValue => elem => {
	elem.setAttribute(attrName, attrValue)
	return elem
}

const updateElemAttributes = attrDict => elem =>
	Object.entries(attrDict)
		.map(([name, value]) => updateElemAttribute(name)(value))
		.reduce((elem, fn) => fn(elem), elem)


const addCssClass = classStr => elem => {
	elem.classList.add(classStr)
	return elem
}


const appendChildren = elem => children => {
	children
		.map(c => (c instanceof Node) ? c : document.createTextNode(c))
		.forEach(elem.appendChild.bind(elem))
	return elem
}

const createElement = tag =>
	appendChildren(document.createElement(tag))

const createSvgElement = tag =>
	appendChildren(document.createElementNS('http://www.w3.org/2000/svg', tag))


const createSvgPointElem = ([x, y]) =>
	updateElemAttributes({width: 0.01, height: 0.01, x: x, y: y})(createSvgElement('rect')([]))


const getPointsFromValues = maxValue => minValueCount => values =>
	values
		.map(getChartPoint)
		.map(normalizePoint([
			Math.max(minValueCount, values.length) - 1,
			maxValue
		]))
		.map(([x, y]) => [x, 1 - y])
		.map(scalePoint([SVG_WIDTH, SVG_HEIGHT]))


const createChartLineElem = maxValue => minValueCount => values =>
	values.length === 1
		? addCssClass(CSS_CLASS_NAMES.singlePointMarker)(createSvgPointElem(
			getPointsFromValues(maxValue)(minValueCount)(values)[0]
		))
		: createSvgPathElem(
			getPointsFromValues(maxValue)(minValueCount)(values)
				.map(getSvgPathStrSegment)
				.join(' ')
		)


const createChartLineContainer = maxValue => minValueCount => datasets =>
	createSvgElement('svg')(
		datasets
			.map(/** @param {{cssClass: string, values: [number]}} d */
				d => addCssClass(d.cssClass)(createChartLineElem(maxValue)(minValueCount)(d.values)))
	)


const normalizeValue = maxValue => value => value / maxValue


const getAxisLabelValues = maxValue =>
	// TODO: update - this will look bad if last rounded value is close to maxValue
	getRange(0)(maxValue)(10 ** Math.round(Math.log10(maxValue / 10)))
		.concat([maxValue])


const createMarkerSvgElem = maxValue =>
	createSvgElement('svg')(
		getAxisLabelValues(maxValue)
			.map(normalizeValue(maxValue))
			.map(v => 1 - v)
			.map(v => [[0, v], [1, v]])
			.map(points => points
				.map(scalePoint([SVG_WIDTH, SVG_HEIGHT]))
				.map(getSvgPathStrSegment)
				.join(' ')
			)
			.map(createSvgPathElem)
	)


const getAxisLabels = maxValue =>
	createElement('div')(
		getAxisLabelValues(maxValue)
			.reverse()
			.map(v => createElement('div')([v.toString()]))
	)


const setSvgSize = ([x, y]) => ([width, height]) => elem => {
	elem.setAttribute('x', x)
	elem.setAttribute('y', y)
	elem.setAttribute('width', width)
	elem.setAttribute('height', height)
	return elem
}


const configureSvgContainer = viewBoxStr => elem => {
	elem.setAttribute('viewBox', viewBoxStr)
	elem.setAttribute('preserveAspectRatio', 'none')
	elem.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
	return elem
}



const renderSvg = maxValue => minValueCount => datasets => {
	const lineContainer = createChartLineContainer(maxValue)(minValueCount)(datasets)
	const markerContainer = createMarkerSvgElem(maxValue)

	const viewBoxStr = `0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`
	configureSvgContainer(viewBoxStr)(lineContainer)
	configureSvgContainer(viewBoxStr)(markerContainer)

	const topOffset = 0.5
	const height = 100 - 2 * topOffset
	setSvgSize([CHART_OFFSET, topOffset])([100 - 2 * CHART_OFFSET, height])(lineContainer)
	setSvgSize([0, topOffset])([100, height])(markerContainer)

	const containerSvg = createSvgElement('svg')([
		addCssClass(CSS_CLASS_NAMES.axisMarkersContainer)(markerContainer),
		addCssClass(CSS_CLASS_NAMES.dataLinesContainer)(lineContainer),
	])

	configureSvgContainer('0 0 100 100')(containerSvg)
	return containerSvg
}


/**
 *
 * @param {number} maxValue - Highest value that could possibly be in datasets
 * @param {number} minValueCount - If there are less values than this, the chart won't take up full width
 * @param {[{cssClass: string, values: [number]}]} datasets
 * @return {HTMLDivElement}
 */
module.exports = (maxValue, minValueCount, datasets) =>
	addCssClass(CSS_CLASS_NAMES.container)(createElement('div')([
		addCssClass(CSS_CLASS_NAMES.labels)(getAxisLabels(maxValue)),
		addCssClass(CSS_CLASS_NAMES.mainSvg)(renderSvg(maxValue)(minValueCount)(datasets))
	]))