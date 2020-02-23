import { useState } from 'preact/hooks';
import style from './style.css';

const Hamburger = (props) => {
  const [isActive, setActive] = useState(false);
  const toggleMenu = () => {
    setActive(!isActive);
  };
  return (
    <>
      <button type='button'
        class={
          style.hamburger + " " +
          style.hamburgerSlider + " " +
          (isActive ? style.isActive : '')
        }
        onClick={toggleMenu}
      >
        <span class={style.hamburgerBox}>
          <span class={style.hamburgerInner}></span>
        </span>
      </button>
      <div
        class={`${style.menuWrapper} ${isActive ? style.isActive : ''}`}
        style={{top: props.height, width: props.width}}
        onClick={toggleMenu}
      >
        {props.children}
      </div>
    </>
  );
};

export default Hamburger;
