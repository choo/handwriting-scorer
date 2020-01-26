import { h } from 'preact';
import { useState } from 'preact/hooks';
import style from './style';

import HandwritingCanvas from '../handwriting-canvas';

const Main = () => {
  return (
    <div class={style.main}>
      <HandwritingCanvas
        onScore={(score) => {console.log(score)}}
      />
    </div>
  );
};

export default Main;
