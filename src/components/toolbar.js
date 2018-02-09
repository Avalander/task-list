import './toolbar.scss'

import xs from 'xstream'

import {
	nav,
	span,
	i,
	button,
} from '@cycle/dom'
import isolate from '@cycle/isolate'


const view = text$ => text$.map(text => nav('.toolbar', [
	button({ dataset: { show: 'small' }}, i('.fa.fa-bars.toolbar-item')),
	span('.toolbar-item', text),
]))

export default sources => isolate(({ DOM, text$ }) => {
	const open_sidebar$ = DOM.select('button').events('click').mapTo(true)

	return {
		DOM: view(text$),
		open_sidebar$,
	}
})(sources)