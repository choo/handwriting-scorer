import React from 'react';
import Box            from '@material-ui/core/Box';
import Button         from '@material-ui/core/Button';
import Grid           from '@material-ui/core/Grid';
import TextField      from '@material-ui/core/TextField';
import Typography     from '@material-ui/core/Typography';

import TitleWithImage from './TitleWithImage';
import {isKana, shuffleArray} from '../utils';

const ResultsSelection = props => {
  return (
    <>
      <TitleWithImage
        //left=Wording.predicted[LANG]
        left={'written letter '}
        right={'is ...'}
        imageBlob={props.imageBlob}
        leftWidth={5}
      />

      <Box>
      {shuffleArray(props.predicted).map(result => {
        const kanaCode = result[0];
        return (
          <Button
            key={kanaCode}
            variant="contained"
            onClick={(e) => props.onSelectKana(kanaCode)}
          >
            {String.fromCharCode(parseInt(kanaCode, 16))}
            {' ' + result[1].toFixed(4)} {/* probablity */}
          </Button>
        )
      })}
      </Box>

      <InputCustom
        onSelectKana={props.onSelectKana}
      />
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
