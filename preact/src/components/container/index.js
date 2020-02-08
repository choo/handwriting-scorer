import style from './style';

/**
 * component only for centering
 */
const Container = (props) => (
  <div class={style.container} style={props.style}>
    {props.children}
  </div>
);

export default Container;
