import { useState, useRef, useEffect } from 'preact/hooks';
import style from './style';
import Button from '../button';

/**
 * props:
 *    buttonText: (required) string: display text for on button
 *    menu  : (required) menu contents
 *    style : (optional) style settings such as menu position
 */
const Popup = (props) => {
  const [isShown, setIsShown] = useState(false);
  const popupRef = useRef();
  const documentClickHandler = useRef();

  useEffect(() => {
    documentClickHandler.current = e => {
      if (!popupRef.current.contains(e.target)) {
        setIsShown(false);
        document.removeEventListener('click', documentClickHandler.current);
      }
    }
  }, []);

  const handleToggleButtonClick = () => {
    if (!isShown) {
      setIsShown(true);
      /* without setTimeout, popup menu won't open
       * becuase documentClickHandler.current will be executed */
      setTimeout(() => {
        document.addEventListener('click', documentClickHandler.current);
      }, 30);
    }
  }

  const handleCloseButtonClick = () => {
    setIsShown(false);
    removeDocumentClickHandler();
  }

  return (
    <div class={style.wrapper}>
      <Button outlined onClick={handleToggleButtonClick}>
        {props.buttonText}
      </Button>
      <div
        class={`${style.menu} ${isShown ? style.shown : ''}`}
        style={{
          transformOrigin: 'top left',
          ...props.style || {}, // bottom: OOpx...
        }}
        ref={popupRef}
      >
        {props.menu}
        {/*
        <button onClick={handleCloseButtonClick}>
          Close
        </button>
        */}
      </div>
    </div>
  );
};

export default Popup;
