import { useState } from 'preact/hooks';
import {shuffleArray} from '../../../../utils/utils';
import {CHAR_DISPLAYS} from '../../../../utils/const';
import {NUM_DISPLAY} from '../../../../utils/const';

import CharList from '../../../molecules/charlist';

import Grid from '../../../atoms/grid';
import Button from '../../../atoms/button';

const ResultsSelection = props => {
  const [isSuggesting, setSuggesting] = useState(true);
  const setCustom = () => {
    setSuggesting(false);
  }
  return (
    <>
      <Grid container m='4px 0 0' alignItems='center'>
        <Grid p='0 6px 0 0' flex={1}>
          <img style={{width: '100%'}}
            src={window.URL.createObjectURL(props.imageBlob)}
            border={'1'}
            alt={'canvas content'}
          />
        </Grid>
        <Grid flex={2}>
          <span>{'書いた文字は…'}</span>
        </Grid>
      </Grid>

      {isSuggesting ? (
        <SelectSuggestion
          predicted={props.predicted}
          onSelectKana={props.onSelectKana}
          onSelectCustom={setCustom}
        />
      ) : (
        <CharList
          onSelectKana={props.onSelectKana}
        />
      )}
      <Grid m='12px 0 16px'>
        <Button outlined onClick={props.onClickBack}>戻る</Button>
      </Grid>
    </>
  );
};


const SelectSuggestion = props => {
  return (
    <>
      {props.predicted.map((obj, idx) => {
        const charType = obj[0];
        const chars = obj[1];
        return chars.length > 0 && (
          <Grid container key={idx}>
            <Grid flex={1/4}>
              <span>{CHAR_DISPLAYS[charType]}</span>
            </Grid>
            <Grid container flex={3/4}  flexWrap={'wrap'}>
            {shuffleArray(chars.slice(0, NUM_DISPLAY)).map(result => {
              const kanaCode = result[0];
              return (
                <Grid flex={1/6} m='2px' key={kanaCode}>
                  <Button
                    outlined
                    style={{minWidth: '50px'}}
                    onClick={(e) => props.onSelectKana(kanaCode)}
                  >
                    <span>
                    {String.fromCharCode(parseInt(kanaCode, 16))}
                    {/* {' ' + result[1].toFixed(4)} {/* probablity */}
                    </span>
                  </Button>
                </Grid>
              )
            })}
            </Grid>
          </Grid>
        )
      })}

      <Grid container justify='flex-end'  alignItems="flex-end" m='4px 0'>
        <Button outlined
          onClick={props.onSelectCustom}
        >他の文字から選ぶ</Button>
      </Grid>
    </>
  );
};


export default ResultsSelection;
