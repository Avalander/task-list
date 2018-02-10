import './create-list.scss'

import xs from 'xstream'

import {
	div,
	input,
	button,
	span,
} from '@cycle/dom'
import isolate from '@cycle/isolate'


const view = () => xs.of(div('.vertical', [
	span('.handwriting', 'Start by creating your first task list!'),
	input({ props: { placeholder: 'Title' }}),
	button('.btn.btn-primary', 'Save'),
]))

export default sources => isolate(({ DOM }) => {
	return {
		DOM: view(),
	}
})(sources)