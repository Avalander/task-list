import xs from 'xstream'
import { adapt } from '@cycle/run/lib/adapt'


export default () => write$ => {
	const define = routes => write$
		.filter(x => x in routes)
		.map(x => ({ path: x, view: routes[x] }))
	
	return {
		define,
	}
}
