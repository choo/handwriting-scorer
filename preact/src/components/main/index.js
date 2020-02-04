import { h } from 'preact';
import { useState } from 'preact/hooks';

import HandwritingCanvas from '../handwriting-canvas';

const Main = () => {
  return (
    <div>
      <HandwritingCanvas
        onScore={(score) => {console.log(score)}}
      />
    </div>
  );
};

export default Main;
