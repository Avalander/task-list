import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'
import delay from 'xstream/extra/delay'

import {
	div,
	input,
	button,
	span,
} from '@cycle/dom'
import isolate from '@cycle/isolate'

import {
	$put
} from 'cycle-idb'


const view = ({ is_first_list$, name$ }) => xs.combine(is_first_list$, name$)
	.map(([ first, name ]) => div('.vertical', [
		first ? span('.handwriting', 'Start by creating your first task list!') : null,
		input({ props: { placeholder: 'Title', value: name }}),
		button('.btn.btn-primary', 'Save'),
	]))

const intent = (DOM, IDB) => {
	const input_value$ = DOM.select('input').events('input')
		.map(ev => ev.target.value)
	const save_click$ = DOM.select('button').events('click')
		.mapTo(true)

	const name$ = xs.merge(input_value$, save_click$.mapTo('')).startWith('')
	const save_list$ = save_click$.compose(sampleCombine(input_value$))
		.map(([_, name]) => name)
		.map(name => $put('lists', { name, created_on: Date.now() }))

	const is_first_list$ = IDB.store('lists').count()
		.map(x => x === 0)
	const last_added$ = IDB.store('lists').getAll()
		.map(x => x[x.length - 1])
	const route$ = save_click$
		.compose(delay(100))
		.compose(sampleCombine(last_added$))
		.map(([_, list]) => list)
		.map(({ id }) => ({ path: '/list', params: { id }}))

	return {
		name$,
		save_list$,
		is_first_list$,
		route$,
	}
}

export default sources => isolate(({ DOM, IDB }) => {
	const intents = intent(DOM, IDB)

	return {
		DOM: view(intents),
		IDB: intents.save_list$,
		router: intents.route$,
	}
})(sources)
