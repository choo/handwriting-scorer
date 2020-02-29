import { useState, useRef, useEffect } from 'preact/hooks';
import style from './style.css';

const Hamburger = (props) => {
  const [isActive, setActive] = useState(false);
  const popupRef = useRef();
  const docRef = useRef();

  useEffect(() => {
    docRef.current = e => {
      if (!popupRef.current.contains(e.target)) {
        closeMenu();
      }
    }
  }, []);

  const toggleMenu = () => {
    if (!isActive) {
      setActive(true);
      setTimeout(() => {
        document.addEventListener('click', docRef.current);
      }, 30);
    }
  }

  const closeMenu = () => {
    setActive(false);
    document.removeEventListener('click', docRef.current);
  }

  return (
    <div class={style.wrapper}>
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
        style={{
          top: props.height,
        }}
        onClick={closeMenu}
        ref={popupRef}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Hamburger;
