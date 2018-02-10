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

import { $put } from 'cycle-idb'


const scrollDown = () => window.scrollTo(0,document.body.scrollHeight)

const view = (tasks$, new_task_text$) => xs.combine(tasks$, new_task_text$)
	.map(([tasks, text]) => [
		div('.column', tasks.map(({ name }) => div('.row', { hook: { insert: scrollDown }}, [
			span(name),
			button('.btn.fa.fa-check', { dataset: { type: 'check' }}),
		]))),
		div('.bottom-bar', [
			input('.new-task.dark', { props: { placeholder: 'Text', value: text }}),
			button('.add-task.btn', i('.fa.fa-plus'))
		])
	])

export default /*sources => isolate(*/({ DOM, IDB, params$ }) => {
	const text_input$ = DOM.select('.new-task').events('input')
		.map(ev => ev.target.value)
	const add_task_click$ = DOM.select('.add-task').events('click')

	const list$ = params$.map(({ id }) => IDB.store('lists').get(id))
		.flatten()
	const list_name$ = list$.map(({ name }) => name)
	const list_id$ = list$.map(({ id }) => id)
	const tasks$ = list_id$.map(id => IDB.store('tasks').index('list_id').getAll(id))
		.flatten()

	const new_task = {
		text$: xs.merge(text_input$, add_task_click$.mapTo('')).startWith(''),
	}

	const add_task$ = add_task_click$.compose(sampleCombine(xs.combine(text_input$, list_id$)))
		.map(([_, [ name, list_id ]]) => $put('tasks', { list_id, name, created_on: Date.now() }))
	
	DOM.select('[data-type="check"]').events('click')
		.addListener({
			next: x => console.log(x)
		})

	return {
		DOM: view(tasks$, new_task.text$),
		IDB: add_task$,
		title$: list_name$,
	}
}
//)(sources)