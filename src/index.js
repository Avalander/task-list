import 'index.scss'

import xs from 'xstream'

import { run } from '@cycle/run'
import {
	makeDOMDriver,
	div,
	p,
	main,
} from '@cycle/dom'

import makeIdbDriver from 'cycle-idb'
import * as db from 'database'
import makeRouterDriver from 'drivers/router'

import makeSidebar from 'components/sidebar'
import makeToolbar from 'components/toolbar'

import makeCreateListView from 'views/create-list'
import makeLoremIpsumView from 'views/lorem-ipsum'
import makeTaskListView from 'views/task-list'


const routes = {
	'/create': [makeCreateListView, { title: 'Add List' }],
	'/lorem': [makeLoremIpsumView, { title: 'Lorem Ipsum' }],
	'/list': [makeTaskListView, { title: 'Task List' }],
}

const view = (sidebar$, toolbar$, view$) => xs.combine(sidebar$, toolbar$, view$)
	.map(([sidebar, toolbar, view]) => div('.wrapper', [
		sidebar,
		toolbar,
		main('#content', view),
	]))

const app = sources => {
	const current_route$ = sources.router.define(routes)
	const route_title$ = current_route$.map(({ options }) => options.title)

	const view$ = current_route$.map(({ path, view, params }) => view({...sources, params$: xs.of(params) }))
	const view_route$ = view$.filter(x => 'router' in x)
		.map(x => x.router)
		.flatten()
	const view_title$ = view$.filter(x => 'title$' in x)
		.map(x => x.title$)
		.flatten()
	const view_idb$ = view$.filter(x => 'IDB' in x)
		.map(x => x.IDB)
		.flatten()
	const current_route_id$ = current_route$
		.map(({ params }) => params ? params.id : undefined)
	const title$ = xs.merge(route_title$, view_title$)

	const task_lists$ = sources.IDB.store('lists').getAll()

	const toolbar = makeToolbar({...sources, text$: title$})
	const open$ = toolbar.open_sidebar$
	const sidebar = makeSidebar({...sources, open$, items$: task_lists$, active_id$: current_route_id$})

	const route$ = xs.merge(view_route$, sidebar.router)
		.startWith('/create')
		//.startWith({ path: '/create', params: { id: 1 }})

	return {
		DOM: view(sidebar.DOM, toolbar.DOM, view$.map(x => x.DOM).flatten()),
		IDB: view_idb$,
		router: route$,
	}
}

const drivers = {
	DOM: makeDOMDriver('#root'),
	router: makeRouterDriver(),
	IDB: makeIdbDriver(db.name, db.version, db.upgrade)
}

run(app, drivers)
