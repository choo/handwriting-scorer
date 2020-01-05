import React from 'react';
import Box            from '@material-ui/core/Box';
import Button         from '@material-ui/core/Button';
import Grid           from '@material-ui/core/Grid';
import TextField      from '@material-ui/core/TextField';
import Typography     from '@material-ui/core/Typography';

import {isKana, shuffleArray} from '../utils';

const ResultsSelection = props => {
  const imgRef = React.useRef(null)
  React.useEffect(() => {
    if (props.imageBlob) {
      imgRef.current.src = window.URL.createObjectURL(props.imageBlob);
    }
  });
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
          <Typography>{'あなたの書いた左の文字は…'}</Typography>
        </Grid>
      </Grid>

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
          <Grid item xs={2}>
            <Button
              fullWidth
              key={kanaCode}
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
            onClick={props.onClickBack}
            disabled
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


const InputCustom = props => {
  const [isError, setIsError] = React.useState(false);
  const [customChar, setCustomChar] = React.useState('');
  const onChangeText = (text) => {
    console.log('on change text')
    setCustomChar(text);
  };
  const submitCustomChar = () => {
    console.log(' submit hogheoge');
    if (!customChar.length) {
      setIsError(false);
    } else {
      if (customChar.length === 1 && isKana(customChar)) {
        const code = '0x' + customChar.charCodeAt(0).toString(16)
        props.onSelectKana(code)
        setIsError(false);
      } else {
        setIsError(true);
      }
    }
  };
  return (
    <Grid container direction="row" justify="flex-end" alignItems="baseline">
      <Typography>{' or ...  '}</Typography>
      {/*<Typography>{Wording.otherLetter[LANG]}</Typography>*/}
      <TextField
        placeholder=""
        margin="normal"
        variant="outlined"
        // TODO: should use makeStyles 
        style={{width: 120, textAlign: 'center'}} 
        helperText={isError ? 'かな一字を入力': ''}
        onChange={e => onChangeText(e.target.value)}
        inputProps={{maxLength: 4}}
      />
      <Button
        variant="contained"
        onClick={e => submitCustomChar()}
      >{'submit this char'}</Button>
    </Grid>
  );
};

export default ResultsSelection;
