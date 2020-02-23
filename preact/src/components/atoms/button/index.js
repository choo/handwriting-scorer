import style from './style';

/**
 *
 */
const Button = (props) => {
  let classes = `${style.button_root} ${style.ripple} `;
  if (props.outlined) {
    classes += style.button_outlined;
  } else {
    classes += style.button_contained;
  }
  return (
    <button
      class={classes}
      style={{...props.style}}
      onClick={props.onClick}
      disabled={props.disabled ? true : false}
    >
      {props.children}
    </button>
  );
};

export default Button;
