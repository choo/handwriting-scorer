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
        <div class={`${hamburger.menuWrapper} ${isActive ? hamburger.isActive : ''}`}
            style={{top: `${HEADER_HEIGHT}px`}}
        >
          <div style={{
            minWidth: '100%',
            overflow: 'auto',
            boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
          }}>
            <a href="#" style={{
              color: '#000',
              display: 'block',
              padding: '20px',
              textDecoration: 'none',
              cursor: 'pointer',
              borderBottom: '1px solid #bbb',
            }}>
              Link 1
            </a>
            <a href="#" style={{
              color: '#000',
              display: 'block',
              padding: '20px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}>
              Link 2
            </a>
          </div>
        </div>
    </header>
  );
};

export default Header;
