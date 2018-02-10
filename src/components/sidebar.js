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

const view = state$ => state$
	.map(({ active, overlay }) => div([
		nav('.sidebar', { class: { active }}, [
			div([
				button('.dismiss', { dataset: { show: 'small', hide: true }}, i('.fa.fa-arrow-left')),
				div('.sidebar-header', h3('Task Lists')),
				ul('.list-unstyled.list-group.components', [
					li('.active', a('Home')),
					li(a({ props: { href: '#' }}, 'Ponyville')),
					li(a({ props: { href: '#' }}, 'Canterlot')),
					li(a({ props: { href: '#' }}, 'Manehattan')),
				]),
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

const makeSidebar = sources => isolate(({ DOM, open$ }) => {
	const link_click$ = DOM.select('a:not(.active)').events('click')
		.map(ev => {
			ev.preventDefault()
			return ev
		})
	
	const show$ = open$
		.mapTo(state.show)
	const hide$ = xs.merge(DOM.select('[data-hide]').events('click'), link_click$)
		.mapTo(state.hide)
	
	const remove_overlay$ = DOM.select('.overlay.disappear').events('transitionend')
		.mapTo(state.remove_overlay)
	
	const state$ = xs.merge(show$, hide$, remove_overlay$)
		.startWith(state.remove_overlay)
	
	const list$ = link_click$.mapTo('/list')
	const create$ = DOM.select('[data-action="create"]').events('click')
		.mapTo('/create')
	const route$ = xs.merge(list$, create$)

	return {
		DOM: view(state$),
		router: route$,
	}
})(sources)

export default makeSidebar
