import './create-list.scss'

import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'

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

const intent = DOM => {
	const input_value$ = DOM.select('input').events('input')
		.map(ev => ev.target.value)
	const save_click$ = DOM.select('button').events('click')
		.mapTo(true)

	const name$ = xs.merge(input_value$, save_click$.mapTo('')).startWith('')
	const save_list$ = save_click$.compose(sampleCombine(input_value$))
		.map(([_, name]) => name)
		.map(name => $put('lists', { name, created_on: Date.now() }))

	return {
		name$,
		save_list$,
	}
}

export default sources => isolate(({ DOM, IDB }) => {
	const is_first_list$ = IDB.store('lists').count()
		.map(x => x === 0)
	
	const intents = intent(DOM)

	return {
		DOM: view({...intents, is_first_list$}),
		IDB: intents.save_list$,
	}
})(sources)
