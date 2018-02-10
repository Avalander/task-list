import 'index.scss'

import xs from 'xstream'

import { run } from '@cycle/run'
import {
	makeDOMDriver,
	div,
	p,
	main,
} from '@cycle/dom'

import makeSidebar from 'components/sidebar'
import makeToolbar from 'components/toolbar'

import makeCreateListView from 'views/create-list'


const view = (sidebar$, toolbar$, create_list$) => xs.combine(sidebar$, toolbar$, create_list$)
	.map(([sidebar, toolbar, create_list]) => div('.wrapper', [
		sidebar,
		toolbar,
		main('#content', create_list
		/*[
			div([
				p('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id dolor id est viverra placerat. Ut pulvinar est eget est tristique, ut sollicitudin quam finibus. Sed tristique iaculis justo sed porttitor. Donec mollis libero ac sem viverra congue. Nulla pretium ac dolor egestas vehicula. Pellentesque interdum mollis libero, sit amet facilisis ipsum interdum a. Sed lacinia elementum odio, vitae molestie quam aliquam at. Fusce euismod nunc sapien, sed rutrum nisl vehicula at. Maecenas sed sem felis.'),
				p('Etiam sagittis ut mi vitae cursus. Mauris sollicitudin congue tellus vel placerat. Ut nunc turpis, mattis vitae hendrerit sit amet, sagittis nec dui. Vestibulum blandit risus metus, at sollicitudin risus tincidunt id. Integer rhoncus tortor sed felis tempus pharetra. Cras auctor, metus et dictum scelerisque, magna sem aliquet urna, nec ornare nunc sapien quis dui. Mauris a scelerisque magna.'),
				p('Pellentesque sed efficitur orci. Donec sed tellus ac purus aliquet ornare. Phasellus hendrerit turpis in fringilla tincidunt. Sed accumsan augue lectus, a gravida metus pretium sit amet. Fusce eu aliquam lacus. Ut feugiat mi non massa sodales placerat. Fusce id rhoncus mi. Sed et facilisis nibh, in sodales erat. Curabitur non mi vel nisi ultricies pulvinar id eget nulla. Donec a mattis elit, ac mattis odio. Praesent sit amet nibh iaculis, congue turpis id, ultricies quam. Duis odio nisi, scelerisque non iaculis vitae, imperdiet et quam. Aliquam et tempus elit.'),
				p('Pellentesque lacinia quis lectus eu commodo. Nam vel quam id massa pharetra suscipit. Quisque eget pretium ex, fermentum porta odio. In eu lacinia ex, vel condimentum risus. Nunc consequat aliquet odio, sit amet varius quam ullamcorper in. Maecenas euismod laoreet mauris, quis lobortis ex cursus a. Phasellus eget mauris egestas, interdum lorem sit amet, consectetur sapien. Vivamus et finibus urna. Suspendisse pharetra tellus ut lacus posuere, eget euismod eros ornare. Integer placerat molestie mi ut fringilla. Curabitur ut convallis odio, efficitur aliquam nibh. Sed at ante finibus, iaculis velit vel, feugiat ex. Proin finibus ornare velit a imperdiet. Integer volutpat malesuada tellus fringilla aliquet.'),
				p('Mauris tellus ipsum, fringilla quis fringilla vitae, pulvinar eu diam. Vivamus vestibulum vulputate augue, id placerat nisi luctus nec. Donec laoreet libero at augue vestibulum, vitae egestas erat luctus. Suspendisse potenti. Quisque nec lorem sapien. Sed quis fermentum tortor. Donec id ante mollis, sollicitudin risus ac, tempus dolor. Sed eu enim nibh.'),
				p('Integer mollis tempus justo, ac pretium elit convallis sed. Praesent ullamcorper neque nisl, vel scelerisque tortor blandit vitae. Nullam pellentesque leo non finibus porttitor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis in convallis risus, a luctus tortor. Proin et dictum massa. Suspendisse orci nibh, semper sodales erat eget, tempus consequat orci. Etiam ac fermentum nulla, in consectetur diam. Pellentesque blandit sed odio sit amet aliquam. Nullam laoreet ultricies purus, nec venenatis ex vulputate quis. Etiam iaculis felis eget aliquet ultrices. Fusce rhoncus enim vitae lorem posuere, quis vulputate purus consequat. Quisque risus libero, mollis vitae justo in, aliquet pulvinar arcu. Aliquam id ex elementum, elementum arcu eu, rutrum mi. Ut tempor odio porttitor velit pulvinar viverra.'),
				p('Vestibulum pulvinar nibh quis augue egestas, tincidunt commodo risus egestas. Sed ac leo nec nunc mattis euismod. Nulla sit amet justo ut ex volutpat mattis ac ac diam. Quisque pretium massa nec ex semper, vitae faucibus tellus volutpat. Donec placerat ornare libero nec dignissim. Vestibulum quis interdum est. Vestibulum ut placerat mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris suscipit magna ipsum, nec luctus mi porta vel. Vestibulum id lectus et nisi luctus ultrices sed in tortor. Aliquam convallis sem tellus. Aenean pellentesque sit amet leo in vestibulum. Mauris consequat, nibh a viverra pretium, eros libero imperdiet neque, non posuere lectus neque in ante. Donec non metus ut lectus pellentesque molestie.'),
				p('Pellentesque vel luctus arcu. Nunc volutpat lacus libero, et vulputate tellus efficitur eget. Maecenas a lobortis nulla. Vivamus risus dolor, scelerisque vitae auctor ut, cursus at nisl. Duis maximus quis urna nec tincidunt. In vel pellentesque mauris. Nullam dolor ante, consequat a ullamcorper non, consequat a quam. Proin id nibh et massa sollicitudin cursus non in justo. Donec purus est, convallis at faucibus a, elementum non urna. Quisque efficitur risus eu velit tristique, in interdum velit scelerisque. Nulla tincidunt tellus a quam interdum lobortis. Sed et nulla finibus, sollicitudin lacus quis, blandit dolor. Praesent dolor eros, gravida at venenatis sed, tristique id augue. Nulla in auctor metus. Sed laoreet, tellus ac finibus consectetur, tortor nulla faucibus sem, a posuere arcu lectus in magna.'),
				p('Cras feugiat massa metus, id maximus tellus mattis eu. Proin id augue lacinia, tempus diam vel, fermentum nisi. Vestibulum non metus ut tortor rutrum efficitur. Sed ac viverra velit. Sed vestibulum est at mollis volutpat. Morbi sed enim eu ex commodo ultrices a ac tellus. Donec nibh neque, volutpat a vehicula nec, dapibus et felis. Donec eleifend, neque vel fermentum luctus, felis quam maximus lectus, quis malesuada ligula neque hendrerit tellus. Quisque consequat tortor eget turpis placerat, mattis aliquet arcu lacinia. Aliquam quis ante eu augue ornare vehicula. Suspendisse eu hendrerit eros. Vestibulum pellentesque turpis sed dolor molestie accumsan vel in nunc. Quisque at justo sed magna tristique pharetra.'),
				p('Etiam sed arcu euismod, tincidunt massa ut, ornare arcu. Etiam volutpat, nunc sit amet tristique condimentum, ligula massa rutrum urna, sed mattis lorem lorem vitae ex. Duis pretium a neque vel laoreet. Donec id felis placerat, pellentesque orci ac, elementum tortor. Nullam egestas odio eget eleifend lobortis. Nulla auctor aliquam odio, ut placerat ligula fermentum nec. Nullam ornare ut elit luctus egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id scelerisque massa. Aenean aliquam tempor nisl et euismod. Pellentesque feugiat viverra nunc, eu pulvinar ligula efficitur nec. Maecenas aliquet neque id augue commodo blandit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc tincidunt consectetur ligula. Nulla ut eros et dui facilisis iaculis. Sed fringilla auctor sapien vel sodales.'),
			])
		]*/
		),
	]))

const app = sources => {
	const toolbar = makeToolbar({...sources, text$: xs.of('Ponies')})
	const open$ = toolbar.open_sidebar$
	const sidebar = makeSidebar({...sources, open$})

	const create_list = makeCreateListView(sources)

	const sinks = {
		DOM: view(sidebar.DOM, toolbar.DOM, create_list.DOM),
	}
	return sinks
}

const drivers = {
	DOM: makeDOMDriver('#root'),
}

run(app, drivers)