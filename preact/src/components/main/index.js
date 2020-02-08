import { useState } from 'preact/hooks';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';

import {postImage} from '../../utils/ajax';

import HandwritingCanvas from '../handwriting-canvas';
import ResultsSelection from '../results-selection';
import {NUM_DISPLAY} from '../../utils/const';

const STATUS = {
  WRITING: 0,
  SELECTING: 1,
  SCORING: 2,
};

disableBodyScroll(window.document.body);

const Main = () => {
  const [status, setStatus] = useState(STATUS.WRITING);
  const [imageBlob, setImageBlob] = useState(null);
  const [predicted, setPredicted] = useState([]);
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
  const goBackHome = () => {
    setStatus(STATUS.WRITING);
    disableBodyScroll(window.document.body);
    setPredicted([]);
  };


  return (
    <div>
      {status === STATUS.WRITING ? (
        <HandwritingCanvas
          onScore={submitImage}
        />
      ) : status === STATUS.SELECTING ? (
        <ResultsSelection
          predicted={predicted.slice(0, NUM_DISPLAY)}
          imageBlob={imageBlob}
          onSelectKana={selectKana}
          onClickBack={goBackHome}
        />
      ) : (
      )}
    </div>
  );
};

export default Main;
