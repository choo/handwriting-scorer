import { useState } from 'preact/hooks';

import hamburger from './hamburger.css';
import Logo from '../../assets/logo_00.png'
import {HEADER_HEIGHT} from '../../utils/layout';

const Header = (props) => {
  const [isActive, setActive] = useState(false);
  const toggleMenu = () => {
    setActive(!isActive);
  };
  return (
    <header style={{
      height: `${HEADER_HEIGHT}px`,
      paddingBottom: '8px',
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <img src={Logo} height={64} />
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
