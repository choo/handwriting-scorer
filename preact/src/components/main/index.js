import { useState } from 'preact/hooks';

import {postImage} from '../../utils/ajax';

import HandwritingCanvas from '../handwriting-canvas';

const STATUS = {
  WRITING: 0,
  SELECTING: 1,
  SCORING: 2,
};

const Main = () => {
  const [status, setStatus] = useState(STATUS.WRITING);
  const [imageBlob, setImageBlob] = useState(null);
  const [predicted, setPredicted] = useState(null);
  const [selected, setSelected] = useState({});

  const submitImage = async (imgBlob) => {
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
