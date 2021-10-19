import { h } from 'preact';

import { Link } from 'preact-router';

import { FaGithub } from 'react-icons/fa'

import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<h1>{process.env.APPLICATION_TITLE}</h1>

		<nav class='flex h-full justify-center items-center'>
			<a target='_blank' href='https://github.com/fleyer/tres-fute' class='flex h-full cursor-pointer flex items-center'><FaGithub></FaGithub></a>
		</nav>
	</header>
);

export default Header;
