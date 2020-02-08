import { useState } from 'preact/hooks';

import style from './style.css';
import hamburger from './hamburger.css';
import Logo from '../../assets/logo_00.png'

const Header = (props) => {
  const [isActive, setActive] = useState(false);
  const toggleMenu = () => {
    setActive(!isActive);
  };
  return (
    <header class={style.header}>
      <img src={Logo} height={72} />
      <button type='button'
        class={
          hamburger.hamburger + " " +
          hamburger.hamburgerSlider + " " +
          (isActive ? hamburger.isActive : '')
        }
        onClick={toggleMenu}
      >
        <span class={hamburger.hamburgerBox}>
          <span class={hamburger.hamburgerInner}></span>
        </span>
      </button>
    </header>
  );
};

export default Header;
