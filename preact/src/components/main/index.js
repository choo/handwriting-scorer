import { useState } from 'preact/hooks';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';

import {postImage} from '../../utils/ajax';

import HandwritingCanvas from '../handwriting-canvas';

const STATUS = {
  WRITING: 0,
  SELECTING: 1,
  SCORING: 2,
};

disableBodyScroll(window.document.body);

const Main = () => {
  const [status, setStatus] = useState(STATUS.WRITING);
  const [imageBlob, setImageBlob] = useState(null);
  const [predicted, setPredicted] = useState(null);
  const [selected, setSelected] = useState({});

  const submitImage = async (imgBlob) => {
    enableBodyScroll(window.document.body);
    setStatus(STATUS.SELECTING);
    setImageBlob(imgBlob);
    const result = await postImage('/api/predict', {uploadfile: imgBlob});
    if (result && result.predicted) {
      setPredicted(result.predicted);
    }
  };

  return (
    <div>
      <HandwritingCanvas
        onScore={submitImage}
      />
    </div>
  );
};

export default Main;
