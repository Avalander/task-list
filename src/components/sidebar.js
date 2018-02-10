import './sidebar.scss'

import xs from 'xstream'

import {
	div,
	nav,
	h3,
	ul,
	li,
	a,
	button,
	i,
	span,
} from '@cycle/dom'
import isolate from '@cycle/isolate'


const state = {
	show: { active: true, overlay: true },
	hide: { active: false, overlay: true },
	remove_overlay: { active: false, overlay: false },
}

const view = (state$, items$, active_id$) => xs.combine(state$, items$, active_id$)
	.map(([{ active, overlay }, items, active_id]) => div([
		nav('.sidebar', { class: { active }}, [
			div([
				button('.dismiss', { dataset: { show: 'small', hide: true }}, i('.fa.fa-arrow-left')),
				div('.sidebar-header', h3('Task Lists')),
				ul('.list-unstyled.list-group.components',
					items.map(({ name, id }) =>
						li({ class: { active: active_id == id }}, 
							a({ dataset: { id }}, name)))
				),
			]),
			div('.sidebar-footer', [
				a('.btn', { dataset: { action: 'create', hide: true }}, [
					i('.fa.fa-plus'),
					span('Add list'),
				])
			]),
		]),
		div('.overlay', {
			class: { invisible: !overlay, appear: active, disappear: !active },
			dataset: { hide: true },
		}),
	]))

const makeSidebar = sources => isolate(({ DOM, open$, items$, active_id$ }) => {
	const list_click$ = DOM.select('li:not(.active) a').events('click')
		.map(ev => ({ path: '/list', params: { id: parseInt(ev.target.dataset.id) }}))
	
	const show$ = open$
		.mapTo(state.show)
	const hide$ = xs.merge(DOM.select('[data-hide]').events('click'), list_click$)
		.mapTo(state.hide)
	
	const remove_overlay$ = DOM.select('.overlay.disappear').events('transitionend')
		.mapTo(state.remove_overlay)
	
	const state$ = xs.merge(show$, hide$, remove_overlay$)
		.startWith(state.remove_overlay)
	
	const create$ = DOM.select('[data-action="create"]').events('click')
		.mapTo('/create')
	const route$ = xs.merge(list_click$, create$)

	return {
		DOM: view(state$, items$, active_id$),
		router: route$,
	}
})(sources)

export default makeSidebar
