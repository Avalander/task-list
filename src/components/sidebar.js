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
			button('.dismiss', { dataset: { show: 'small' }}, i('.fa.fa-arrow-left')),
			div('.sidebar-header', h3('Ponies')),
			ul('.list-unstyled.list-group.components', [
				li('.active', a('Home')),
				li(a({ props: { href: '#' }}, 'Ponyville')),
				li(a({ props: { href: '#' }}, 'Canterlot')),
				li(a({ props: { href: '#' }}, 'Manehattan')),
			])
		]),
		div('.overlay', { class: { invisible: !overlay, appear: active, disappear: !active }}),
	]))

const makeSidebar = sources => isolate(({ DOM, open$ }) => {
	const show$ = open$
		.mapTo(state.show)

	const hide$ = xs.merge(
		DOM.select('.dismiss').events('click'),
		DOM.select('.overlay.appear').events('click'))
		.mapTo(state.hide)
	
	const remove_overlay$ = DOM.select('.overlay.disappear').events('transitionend')
		.mapTo(state.remove_overlay)
	
	const state$ = xs.merge(show$, hide$, remove_overlay$)
		.startWith(state.remove_overlay)

	return {
		DOM: view(state$)
	}
})(sources)

export default makeSidebar
