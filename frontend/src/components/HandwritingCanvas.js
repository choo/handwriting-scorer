import React from 'react';
import Button         from '@material-ui/core/Button';
import Grid           from '@material-ui/core/Grid';
import { makeStyles }   from '@material-ui/core/styles';
import Typography     from '@material-ui/core/Typography';

import LineWeightIcon from '@material-ui/icons/LineWeight';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';

import { disableBodyScroll } from 'body-scroll-lock';

import PropTypes from 'prop-types';

import Wording   from '../lang';

const LANG = 'en'
const canvasBorder = 2;

const pathConf = {
  weight: 10,
  color: '#000'
};

const useStyles = makeStyles(theme => ({
  canvas: {
    border: `${canvasBorder}px solid #000`,
    /* could not control width/height with this hook */
    /* the result of drawing is stretched */
  },
}));

//class Header extends React.Component {
const HandwritingCanvas = (props) => {

  if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value: function (callback, type, quality) {
        var canvas = this;
        setTimeout(function() {
          var binStr = atob( canvas.toDataURL(type, quality).split(',')[1] ),
              len = binStr.length,
              arr = new Uint8Array(len);
          for (var i = 0; i < len; i++ ) {
            arr[i] = binStr.charCodeAt(i);
          }
          callback( new Blob( [arr], {type: type || 'image/png'} ) );
        });
      }
    });
  }


  const classes = useStyles();
  const canvasRef = React.useRef(null)
  const [isDrawing, setIsDrawing] = React.useState(false);

  // initialization of canvas DOM
  const [hasStarted, setHasStarted] = React.useState(false);
  React.useEffect(() => {
    if (!hasStarted) {
      const canvas = canvasRef.current;
      const wrapper = canvas.parentElement;
      const size = wrapper.offsetWidth - (canvasBorder) * 2;
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
    ctx.lineWidth = pathConf.weight;
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
      <Typography variant="subtitle1">
        {Wording.aboveCanvas[LANG]}
      </Typography>
      <Typography variant="subtitle2">
        {Wording.aboveCanvas2[LANG]}
      </Typography>

      <canvas
        ref={canvasRef}
        className={classes.canvas}

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

      <Grid
        container
        direction="row"
        //justify="space-between"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={resetCanvas}>
              <LineWeightIcon />
              {Wording.lineWeightButton[LANG]}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={resetCanvas}>
              <CancelIcon />
              {Wording.resetButton[LANG]}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={updateCanvas}
          >
            <CheckIcon />
            {Wording.scoreButton[LANG]}
          </Button>
        </Grid>
      </Grid>

    </>
  );
};

HandwritingCanvas.propTypes = {
  onScore: PropTypes.func.isRequired,
};



export default HandwritingCanvas;
