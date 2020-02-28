import { useState, useRef, useEffect } from 'preact/hooks';
import style from './style.css';

const Hamburger = (props) => {
  const [isActive, setActive] = useState(false);
  const popupRef = useRef();
  const documentClickHandler = useRef();

  useEffect(() => {
    documentClickHandler.current = e => {
      if (!popupRef.current.contains(e.target)) {
        setActive(false);
        document.removeEventListener('click', documentClickHandler.current);
      }
    }
  }, []);

  const handleToggleButtonClick = () => {
    if (!isActive) {
      setActive(true);
      setTimeout(() => {
        document.addEventListener('click', documentClickHandler.current);
      }, 30);
    }
  }

  const removeDocumentClickHandler = () => {
    document.removeEventListener('click', documentClickHandler)
  }
  const handleClose = () => {
    setActive(false);
    removeDocumentClickHandler();
  }

  return (
    <>
      <button type='button'
        class={
          style.hamburger + " " +
          style.hamburgerSlider + " " +
          (isActive ? style.isActive : '')
        }
        onClick={handleToggleButtonClick}
      >
        <span class={style.hamburgerBox}>
          <span class={style.hamburgerInner}></span>
        </span>
      </button>
      <div
        class={`${style.menuWrapper} ${isActive ? style.isActive : ''}`}
        style={{
          top: props.height,
          width: props.width,
        }}
        onClick={handleClose}
        ref={popupRef}
      >
        {props.children}
      </div>
    </>
  );
};

export default Hamburger;
