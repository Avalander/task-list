import 'index.scss'

import xs from 'xstream'

import { run } from '@cycle/run'
import {
	makeDOMDriver,
	div,
	p,
	main,
} from '@cycle/dom'

import makeRouterDriver from 'drivers/router'

import makeSidebar from 'components/sidebar'
import makeToolbar from 'components/toolbar'

import makeCreateListView from 'views/create-list'
import makeLoremIpsumView from 'views/lorem-ipsum'
import makeTaskListView from 'views/task-list'


const routes = {
	'/create': makeCreateListView,
	'/lorem': makeLoremIpsumView,
	'/list': makeTaskListView,
}

const view = (sidebar$, toolbar$, view$) => xs.combine(sidebar$, toolbar$, view$)
	.map(([sidebar, toolbar, view]) => div('.wrapper', [
		sidebar,
		toolbar,
		main('#content', view),
	]))

const app = sources => {
	const toolbar = makeToolbar({...sources, text$: xs.of('Ponies')})
	const open$ = toolbar.open_sidebar$
	const sidebar = makeSidebar({...sources, open$})

	const view$ = sources.router.define(routes)
		.map(({ path, view }) => view(sources))
	const view_route$ = view$.filter(x => 'router' in x)
		.map(x => x.router)
		.flatten()
	const route$ = xs.merge(view_route$, sidebar.router)
		.startWith('/lorem')

	return {
		DOM: view(sidebar.DOM, toolbar.DOM, view$.map(x => x.DOM).flatten()),
		router: route$,
	}
}

const drivers = {
	DOM: makeDOMDriver('#root'),
	router: makeRouterDriver(),
}

run(app, drivers)