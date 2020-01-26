import style from './style.css';

const Header = (props) => (
	<header class={style.header}>
		<h1>{props.title}</h1>
	</header>
);

export default Header;
