import { useState } from 'preact/hooks';
import { enableBodyScroll, disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import {postImage} from '../../utils/ajax';

import HandwritingCanvas from '../handwriting-canvas';
import ResultsSelection from '../results-selection';
import ScoreDisplay from '../score-display';
import {NUM_DISPLAY} from '../../utils/const';

const STATUS = {
  WRITING: 0,
  SELECTING: 1,
  SHOWING_SCORE: 2,
};

disableBodyScroll(window.document.body);

const Main = () => {
  const [status, setStatus] = useState(STATUS.WRITING);
  const [imageBlob, setImageBlob] = useState(null);
  const [predicted, setPredicted] = useState([]);
  const [selected, setSelected] = useState({});

  const submitImage = async (imgBlob) => {
    enableBodyScroll(window.document.body);
    clearAllBodyScrollLocks();
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

  const selectKana = async (charCode) => {
    let prob = 0.0;
    for (const [kana, p] of predicted) {
      if (kana === charCode) {
        prob = p;
        break;
      }
    }
    const score = (-((1.0 - prob) ** (1 / 3) - 1)) * 100.0;
    setStatus(STATUS.SHOWING_SCORE);
    setSelected({
      kana: String.fromCharCode(parseInt(charCode, 16)),
      prob: prob,
      score: parseInt(score),
    });
    const result = await postImage('/api/upload', {
      uploadfile: imageBlob,
      charcode: charCode,
      prob: prob,
      score: score,
    });
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
        <ScoreDisplay
          chara={selected.kana}
          score={selected.score}
          imageBlob={imageBlob}
          onClickBack={goBackHome}
        />
      )}
    </div>
  );
};

export default Main;
