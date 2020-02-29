import { useState, useRef, useEffect } from 'preact/hooks';

import Grid from '../../../atoms/grid';
import Button from '../../../atoms/button';
import SelectLineWeight from '../../../molecules/select-lineweight';
import { disableBodyScroll } from 'body-scroll-lock';
import {CANVAS_BORDER} from '../../../../utils/layout';
import {CANVAS_STROKE_COLOR} from '../../../../utils/const';

//import CancelIcon from '@material-ui/icons/Cancel';
//import CheckIcon from '@material-ui/icons/Check';

import Wording   from '../../../../utils/lang';

const LANG = 'ja'


const HandwritingCanvas = (props) => {

  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasInitialText, setHasInitialText] = useState(null);

  // initialization of canvas DOM
  const [hasStarted, setHasStarted] = useState(false);
  useEffect(() => {
    if (!hasStarted) {
      const canvas = canvasRef.current;
      const wrapper = canvas.parentElement;
      const size = wrapper.offsetWidth - (CANVAS_BORDER) * 2;
      canvas.width  = size;
      canvas.height = size;
      resetCanvas();
      disableBodyScroll(canvas);
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
      const touch = e.touches[0] || e.changedTouches[0];
      [x, y] = [touch.clientX - bounds.left, touch.clientY - bounds.top];
    } else {
      [x, y] = [e.clientX - bounds.left, e.clientY - bounds.top];
      //[x, y] = [e.pageX - bounds.left, e.pageY - bounds.top];
      //[x, y] = [e.offsetX, e.offsetY]; // -> OK
      //[x, y] = [e.layerX, e.layerY];  // -> OK
    }
    return [x, y];
  };

  /* functions related canvas drawing */
  const startDrawing = e => {
    const canvas = canvasRef.current;
    const ctx = getContext();
    const [x, y] = getPosition(e);
    if (hasInitialText) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setHasInitialText(false);
    }
    setIsDrawing(true);
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
    ctx.lineWidth = props.lineWeight;
    ctx.strokeStyle = CANVAS_STROKE_COLOR;
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

    if (hasInitialText === null) {
      const texts = ['文字をこの枠内に書いて', '採点ボタンをクリック！']
      const x = (canvas.width  / 2);
      const y = (canvas.height / 2);
      ctx.font = "18px 'M PLUS Rounded 1c'";
      ctx.fillStyle = '#aaa';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'center';
      ctx.fillText(texts[0], x, y - 20);
      ctx.fillText(texts[1], x, y + 20);
      setHasInitialText(true);
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{border: '2px solid #000',}}

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

      <Grid container m='4px 0 6px'>
        <Grid flex={1} p='0 6px 0 0'>
          <SelectLineWeight
            onChangeWeight={props.setLineWeight}
            weight={props.lineWeight}
          />
        </Grid>
        <Grid flex={2}>
          <Button outlined onClick={resetCanvas}>
            {Wording.resetButton[LANG]}
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Button outlined onClick={updateCanvas}>
          {Wording.scoreButton[LANG]}
        </Button>
      </Grid>
    </>
  );
};


export default HandwritingCanvas;
