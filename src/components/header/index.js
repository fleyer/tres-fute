import { h } from 'preact';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<h1>{process.env.APPLICATION_TITLE}</h1>
	</header>
);

export default Header;
