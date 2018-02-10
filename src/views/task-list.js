import './task-list.scss'

import xs from 'xstream'
import sampleCombine from 'xstream/extra/sampleCombine'

import {
	div,
	input,
	button,
	span,
	i,
} from '@cycle/dom'
import isolate from '@cycle/isolate'


const ponies = [
	'Twilight Sparkle',
	'Fluttershy',
	'Rainbow Dash',
]
const view = (tasks$, new_task_text$) => xs.combine(tasks$, new_task_text$)
	.map(([tasks, text]) => [
		div('.column', tasks.map(x => div('.row', [
			span(x),
			input({ props: { type: 'checkbox' }}),
		]))),
		div('.bottom-bar', [
			input('.new-task.dark', { props: { placeholder: 'Text', value: text }}),
			button('.add-task', i('.fa.fa-plus'))
		])
	])

export default /*sources => isolate(*/({ DOM }) => {
	const text_input$ = DOM.select('.new-task').events('input')
		.map(ev => ev.target.value)
	const add_task_click$ = DOM.select('.add-task').events('click')

	const new_task = {
		text$: xs.merge(text_input$, add_task_click$.mapTo('')).startWith(''),
	}

	const tasks$ = add_task_click$.compose(sampleCombine(text_input$))
		.map(([_, task]) => task)
		.fold((acc, x) => ([...acc, x]), ponies)

	return {
		DOM: view(tasks$, new_task.text$),
		title$: xs.of('Ponies'),
	}
}
//)(sources)