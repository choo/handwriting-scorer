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
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
