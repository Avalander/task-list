import './task-list.scss'

import xs from 'xstream'

import {
	div,
	input,
	button,
	span,
	i,
} from '@cycle/dom'
import isolate from '@cycle/isolate'


const view = () => xs.of([
	div('.column', [
		div('.row', [
			span('Twilight Sparkle'),
			input({ props: { type: 'checkbox' }}),
		]),
		div('.row', [
			span('Fluttershy'),
			input({ props: { type: 'checkbox' }}),
		]),
		div('.row', [
			span('Rainbow Dash'),
			input({ props: { type: 'checkbox' }}),
		]),
	]),
	div('.bottom-bar', [
		input('.dark', { props: { placeholder: 'Text' }}),
		button(i('.fa.fa-plus'))
	])
])

export default sources => isolate(({ DOM }) => {
	return {
		DOM: view(),
		title$: xs.of('Ponies'),
	}
})(sources)