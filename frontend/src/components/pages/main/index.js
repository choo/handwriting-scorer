import { useState } from 'preact/hooks';

import {postImage} from '../../../utils/ajax';
import {classifyChars} from '../../../utils/utils';
import {STATUS, NUM_DISPLAY} from '../../../utils/const';

import HandwritingCanvas from './handwriting-canvas';
import ResultsSelection from './results-selection';
import ScoreDisplay from './score-display';

const Main = (props) => {
  const [imageBlob, setImageBlob] = useState(null);
  const [predicted, setPredicted] = useState([]);
  const [selected, setSelected] = useState({});

  const submitImage = async (imgBlob) => {
    setImageBlob(imgBlob);
    props.setMainStatus(STATUS.SELECTING);
    const result = await postImage('/api/predict', {uploadfile: imgBlob});
    if (result && result.predicted) {
      setPredicted(result.predicted);
    }
  };
  const goBackHome = () => {
    props.setMainStatus(STATUS.WRITING);
    setPredicted([]);
  };

  const selectChar = async (charCode) => {
    let prob = 0.0, score = 1;
    for (const [code, p, s] of predicted) {
      if (code === charCode) {
        prob = p;
        score = s;
        break;
      }
    }
    props.setMainStatus(STATUS.SHOWING_SCORE);
    setSelected({
      char: String.fromCharCode(parseInt(charCode, 16)),
      charCode: charCode,
      prob: prob,
      score: score,
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
      {props.mainStatus === STATUS.WRITING ? (
        <HandwritingCanvas
          onScore={submitImage}
          lineWeight={props.lineWeight}
          setLineWeight={props.setLineWeight}
        />
      ) : props.mainStatus === STATUS.SELECTING ? (
        <ResultsSelection
          predicted={
            classifyChars(predicted.slice(0, NUM_DISPLAY))
          }
          imageBlob={imageBlob}
          onSelectChar={selectChar}
          onClickBack={goBackHome}
          kanjiInfo={props.kanjiInfo}
        />
      ) : (
        <ScoreDisplay
          char={selected.char}
          charCode={selected.charCode}
          score={selected.score}
          imageBlob={imageBlob}
          onClickBack={goBackHome}
          achivements={props.achivements}
        />
      )}
    </div>
  );
};

export default Main;
