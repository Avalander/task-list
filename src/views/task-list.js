import './task-list.scss'

import xs from 'xstream'

import {
	div,
	input,
	button,
	span,
} from '@cycle/dom'
import isolate from '@cycle/isolate'


const view = () => xs.of(div('.vertical', [
	div([
		span('Twilight Sparkle'),
		input({ props: { type: 'checkbox' }}),
	]),
	div([
		span('Fluttershy'),
		input({ props: { type: 'checkbox' }}),
	]),
	div([
		span('Rainbow Dash'),
		input({ props: { type: 'checkbox' }}),
	]),
]))

export default sources => isolate(({ DOM }) => {
	return {
		DOM: view(),
	}
})(sources)