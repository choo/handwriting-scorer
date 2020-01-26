import { h } from 'preact';
import style from './style';

const Container = (props) => (
  <div class={style.container} style={props.style}>
    {props.children}
  </div>
);

export default Container;
