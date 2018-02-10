import xs from 'xstream'
import { adapt } from '@cycle/run/lib/adapt'


const getView = value => Array.isArray(value) ? value[0] : value
const getOptions = value => Array.isArray(value) ? value[1] : {}

export default () => write$ => {
	const define = routes => write$
		.filter(x => x in routes)
		.map(x => ({ path: x, view: getView(routes[x]), options: getOptions(routes[x]) }))
	
	return {
		define,
	}
}
