import { useState, useRef, useEffect } from 'preact/hooks';
import style from './style';
import Button from '../button';

/**
 * props:
 *    buttonText: (required) string: display text for on button
 *    menu  : (required) menu contents
 *    keepDisplay : (optional, default: false)
 *      keep menu displayed when menu item is clicked
 *    items :
 *    width :
 *    current :
 *    onSelect:
 *    listStyle : (optional) style settings such as menu position
 *      ex.) list should be display on upper right, the following should be given
 *        style={{
 *          bottom: '2.0rem',
 *          transformOrigin: 'bottom left',
 *        }}
 */
const Menu = (props) => {
  const [isShown, setIsShown] = useState(false);
  const popupRef = useRef();
  const documentClickHandler = useRef();

  useEffect(() => {
    documentClickHandler.current = e => {
      if (!props.keepDisplay || !popupRef.current.contains(e.target)) {
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

  return (
    <div class={style.wrapper} style={props.width ? {width: props.width} : {}}>
      <Button outlined onClick={handleToggleButtonClick}>
        {props.buttonText}
      </Button>
      <div
        class={`${style.menu} ${isShown ? style.shown : ''}`}
        style={props.listStyle} // bottom: OOpx...
        ref={popupRef}
      >
        <div class={style.itemsWrapper}>
          {
            props.items.map((val, idx) => {
              return (
                <a key={idx}
                  class={style.item}
                  onClick={() => props.onSelect(val)}
                  style={props.makeItemStyle(val)}
                >
                  {val}
                </a>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Menu;
