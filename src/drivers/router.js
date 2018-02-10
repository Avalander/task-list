import xs from 'xstream'
import { adapt } from '@cycle/run/lib/adapt'


const toRouteObj = value => typeof value === 'string' ? { path: value } : {...value }

const getView = value => Array.isArray(value) ? value[0] : value
const getOptions = value => Array.isArray(value) ? value[1] : {}

export default () => write$ => {
	const define = routes => write$
		.map(toRouteObj)
		.filter(({ path }) => path in routes)
		.map(({ path, params }) => ({ path, params, view: getView(routes[path]), options: getOptions(routes[path]) }))
	
	return {
		define,
	}
}
