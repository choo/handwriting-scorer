import React from 'react';
import Box            from '@material-ui/core/Box';
import Button         from '@material-ui/core/Button';
import Grid           from '@material-ui/core/Grid';
import TextField      from '@material-ui/core/TextField';
import Typography     from '@material-ui/core/Typography';

import {isKana, shuffleArray} from '../utils';
import {hiragana} from '../const';

const ResultsSelection = props => {
  const imgRef = React.useRef(null)
  React.useEffect(() => {
    if (props.imageBlob) {
      imgRef.current.src = window.URL.createObjectURL(props.imageBlob);
    }
  });
  const [isCustom, setIsCustom] = React.useState(false);
  const setCustom = () => {
    setIsCustom(true);
  }
  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={4}>
          <img
            width={'100%'}
            border={'1'}
            ref={imgRef}
            alt={'canvas content'}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography>{'あなたの書いた文字は…'}</Typography>
        </Grid>
      </Grid>

      {!isCustom ? (
        <SelectCandidate
          predicted={props.predicted}
          onSelectKana={props.onSelectKana}
          onClickBack={props.onClickBack}
          onSelectCustom={setCustom}
        />
      ) : (
        <SelectCustom
          onSelectKana={props.onSelectKana}
          onClickBack={props.onClickBack}
        />
      )}

    </>
  );
};


const SelectCandidate = props => {
  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        spacing={1}
      >
      {shuffleArray(props.predicted).map(result => {
        const kanaCode = result[0];
        return (
          <Grid item xs={2} key={kanaCode}>
            <Button
              fullWidth
              variant="outlined"
              style={{minWidth: '50px'}}
              onClick={(e) => props.onSelectKana(kanaCode)}
            >
              <Typography variant="h6">
              {String.fromCharCode(parseInt(kanaCode, 16))}
              {/* {' ' + result[1].toFixed(4)} {/* probablity */}
              </Typography>
            </Button>
          </Grid>
        )
      })}
      </Grid>

      <Grid
        container
        direction="row"
        justify="flex-end"
        //alignItems="flex-end"
        spacing={1}
      >
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={props.onSelectCustom}
          >他の文字から選ぶ</Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={props.onClickBack}
          >戻る</Button>
        </Grid>
      </Grid>
    </>
  );
};


const SelectCustom = props => {
  return (
    <>
    {hiragana.map((row, i) => {
      return (
      <Grid
        key={i}
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        {row.map((c, j) => {
          const kanaCode = '0x' + c.charCodeAt(0).toString(16)
          return (
            <Grid item xs={2} key={j}>
              {c ? (
              <Button
                fullWidth
                variant="outlined"
                style={{minWidth: '50px'}}
                onClick={(e) => props.onSelectKana(kanaCode)}
              >
                <Typography variant="h6">
                  {c}
                </Typography>
              </Button>
              ) : null}
            </Grid>
          )
        })}
      </Grid>
      )
    })}

      <Grid
        container
        direction="row"
        justify="flex-end"
        //alignItems="flex-end"
        spacing={1}
      >
        <Grid item xs={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={props.onClickBack}
          >戻る</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ResultsSelection;
