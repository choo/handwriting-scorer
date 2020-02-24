import { useState } from 'preact/hooks';
import { enableBodyScroll, disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import {postImage} from '../../../utils/ajax';
import {classifyChars} from '../../../utils/utils';

import HandwritingCanvas from './handwriting-canvas';
import ResultsSelection from './results-selection';
import ScoreDisplay from './score-display';

const STATUS = {
  WRITING: 0,
  SELECTING: 1,
  SHOWING_SCORE: 2,
};

if (typeof window !== "undefined") {
  disableBodyScroll(window.document.body);
}

const Main = (props) => {
  const [status, setStatus] = useState(STATUS.WRITING);
  const [imageBlob, setImageBlob] = useState(null);
  const [predicted, setPredicted] = useState([]);
  const [selected, setSelected] = useState({});

  const submitImage = async (imgBlob) => {
    if (typeof window !== "undefined") {
      enableBodyScroll(window.document.body);
    }
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
    setPredicted([]);
    if (typeof window !== "undefined") {
      disableBodyScroll(window.document.body);
    }
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
    props.updateScores(charCode, score);
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
          predicted={classifyChars(predicted)}
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
