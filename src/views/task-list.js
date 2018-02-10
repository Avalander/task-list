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

const scrollDown = () => window.scrollTo(0,document.body.scrollHeight)

const view = (tasks$, new_task_text$) => xs.combine(tasks$, new_task_text$)
	.map(([tasks, text]) => [
		div('.column', tasks.map(x => div('.row', { hook: { insert: scrollDown }}, [
			span(x),
			button('.btn.fa.fa-check', { dataset: { type: 'check' }}),
		]))),
		div('.bottom-bar', [
			input('.new-task.dark', { props: { placeholder: 'Text', value: text }}),
			button('.add-task.btn', i('.fa.fa-plus'))
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
	
	DOM.select('[data-type="check"]').events('click')
		.addListener({
			next: x => console.log(x)
		})

	return {
		DOM: view(tasks$, new_task.text$),
		title$: xs.of('Ponies'),
	}
}
//)(sources)