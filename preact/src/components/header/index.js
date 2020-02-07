import style from './style.css';
import Logo from '../../assets/logo_00.png'

const Header = (props) => (
  <header class={style.header}>
    <img src={Logo} height={72} />
  </header>
);

export default Header;
