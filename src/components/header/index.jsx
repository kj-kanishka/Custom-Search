import {
	h,
	Component
} from 'preact';
import {
	Link
} from 'preact-router';
import style from './style.less';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1>Custom Search </h1>	
			</header>
		);
	}
}