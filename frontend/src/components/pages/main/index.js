import { useState } from 'preact/hooks';

import {postImage} from '../../../utils/ajax';
import {classifyChars} from '../../../utils/utils';
import {STATUS} from '../../../utils/const';

import HandwritingCanvas from './handwriting-canvas';
import ResultsSelection from './results-selection';
import ScoreDisplay from './score-display';

const Main = (props) => {
  const [imageBlob, setImageBlob] = useState(null);
  const [predicted, setPredicted] = useState([]);
  const [selected, setSelected] = useState({});

  const submitImage = async (imgBlob) => {
    props.setStatus(STATUS.SELECTING);
    setImageBlob(imgBlob);
    const result = await postImage('/api/predict', {uploadfile: imgBlob});
    if (result && result.predicted) {
      setPredicted(result.predicted);
    }
  };
  const goBackHome = () => {
    props.setStatus(STATUS.WRITING);
    setPredicted([]);
  };

  const selectChar = async (charCode) => {
    let prob = 0.0;
    for (const [code, p] of predicted) {
      if (code === charCode) {
        prob = p;
        break;
      }
    }
    const score = (-((1.0 - prob) ** (1 / 3) - 1)) * 100.0;
    props.setStatus(STATUS.SHOWING_SCORE);
    setSelected({
      char: String.fromCharCode(parseInt(charCode, 16)),
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
      {props.status === STATUS.WRITING ? (
        <HandwritingCanvas
          onScore={submitImage}
          lineWeight={props.lineWeight}
          setLineWeight={props.setLineWeight}
        />
      ) : props.status === STATUS.SELECTING ? (
        <ResultsSelection
          predicted={classifyChars(predicted)}
          imageBlob={imageBlob}
          onSelectChar={selectChar}
          onClickBack={goBackHome}
          kanjiInfo={props.kanjiInfo}
        />
      ) : (
        <ScoreDisplay
          chara={selected.char}
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
