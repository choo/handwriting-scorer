import { h } from 'preact';
import { useState, useRef, useEffect } from 'preact/hooks';
import style from './style';

import Button from '../button';

//import CancelIcon from '@material-ui/icons/Cancel';
//import CheckIcon from '@material-ui/icons/Check';

//import { disableBodyScroll } from 'body-scroll-lock';

import Wording   from '../../utils/lang';
//import LineWeightButton from './LineWeightButton';

const LANG = 'ja'
const canvasBorder = 2;

const pathConf = {
  weight: 9,
  color: '#000'
};


const HandwritingCanvas = (props) => {

  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWeight, setLineWeight] = useState(pathConf.weight);

  // initialization of canvas DOM
  const [hasStarted, setHasStarted] = useState(false);
  useEffect(() => {
    if (!hasStarted) {
      const canvas = canvasRef.current;
      const wrapper = canvas.parentElement;
      const size = wrapper.offsetWidth - (canvasBorder) * 2;
      canvas.width  = size;
      canvas.height = size;
      resetCanvas();

      //disableBodyScroll(canvas);
    }
    setHasStarted(true);
  }, [hasStarted]);


  const getContext = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    return ctx;
  };

  const getPosition = e => {
    /* cf.) 
     * https://note.kiriukun.com/entry/20180415-mouse-and-touch-event-coordinates
     **/
    let x, y;
    const bounds = e.target.getBoundingClientRect();
    if (e.type.startsWith('touch')) {
      const touch = e.nativeEvent.touches[0] || e.nativeEvent.changedTouches[0];
      [x, y] = [touch.clientX - bounds.left, touch.clientY - bounds.top];
    } else {
      [x, y] = [e.clientX - bounds.left, e.clientY - bounds.top];
      //[x, y] = [e.pageX - bounds.left, e.pageY - bounds.top];
      //[x, y] = [e.nativeEvent.offsetX, e.nativeEvent.offsetY]; // -> OK
      //[x, y] = [e.nativeEvent.layerX, e.nativeEvent.layerY];  // -> OK
    }
    return [x, y];
  };

  /* functions related canvas drawing */
  const startDrawing = e => {
    setIsDrawing(true);
    const ctx = getContext();
    const [x, y] = getPosition(e);
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(x, y);
  }

  const endDrawing = e => {
    setIsDrawing(false);
  }
  const draw = e => {
    if (!isDrawing) {
      return;
    }
    const ctx = getContext();
    const [x, y] = getPosition(e);
    ctx.lineTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineWidth = lineWeight;
    ctx.strokeStyle = pathConf.color;
    ctx.stroke();
  }

  const updateCanvas = () => {
    const canvas = canvasRef.current;
    canvas.toBlob(blob => {
      resetCanvas();
      props.onScore(blob);
    });
  };
  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // /* write dash line */
    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.setLineDash([2, 2]);
    // ctx.moveTo(0, canvasSize / 2);
    // ctx.lineTo(canvasSize, canvasSize / 2);
    // ctx.stroke();

    // ctx.beginPath();
    // ctx.setLineDash([2, 2]);
    // ctx.moveTo(canvasSize / 2, 0);
    // ctx.lineTo(canvasSize / 2, canvasSize);
    // ctx.stroke();

  };

  return (
    <>
      <p>
        {Wording.aboveCanvas[LANG]}
      </p>

      <canvas
        ref={canvasRef}
        class={style.canvas}

        /* events for PCs */
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onMouseMove={draw}

        /* events for SPs */
        onTouchStart={startDrawing}
        onTouchEnd={endDrawing}
        onTouchCancel={endDrawing}
        onTouchMove={draw}
      />

      <div style={{
        marginTop: '4px',
        display: 'flex',
      }}>
        <div style={{
          paddingRight: '6px',
          flex: 1,
        }}>
          <Button outlined>
            線の太さ
          </Button>
        </div>
        <div style={{
          flex: 2,
        }}>
          <Button outlined onClick={resetCanvas}>
            {Wording.resetButton[LANG]}
          </Button>
        </div>
      </div>

      <div style={{
        marginTop: '6px',
      }}>
        <Button outlined onClick={updateCanvas}>
          {Wording.scoreButton[LANG]}
        </Button>
      </div>
    </>
  );
};


export default HandwritingCanvas;
