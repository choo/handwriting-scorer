import { useState } from 'preact/hooks';
import {isKana, shuffleArray} from '../../utils/utils';
import {CHAR_TYPES, CHAR_DISPLAYS, CHARS} from '../../utils/const';

import Grid from '../grid';
import Button from '../button';

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
          onClickBack={props.onClickBack}
          onSelectCustom={setCustom}
        />
      ) : (
        <SelectCustom
          onSelectKana={props.onSelectKana}
          onClickBack={props.onClickBack}
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
      <Grid container alignItems='center'>
      {shuffleArray(props.predicted).map(result => {
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

      <Grid container justify='flex-end'  alignItems="flex-end" m='4px 0'>
        <Button outlined
          onClick={props.onSelectCustom}
        >他の文字から選ぶ</Button>
      </Grid>
    </>
  );
};


const SelectCustom = props => {
  const [charType, setCharType] = useState('hira');
  return (
    <>
      <Grid container style={{
        //boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), ' +
        //           '0 3px 1px -2px rgba(0,0,0,0.12), ' +
        //           '0 1px 5px 0 rgba(0,0,0,0.2)',
        border: '1px solid',
        height: '36px',
      }}>
        {CHAR_TYPES.map(t => (
          <Grid flex={1}>
            <button onClick={() => setCharType(t)}
              style={{
                width: '100%',
                height: '100%',
                //border: '1px solid',
                backgroundColor: charType === t ? '#ffc2e3' : '#fff',
                fontSize: '14px',
              }}
            >
              {CHAR_DISPLAYS[t]}
            </button>
          </Grid>
        ))}
      </Grid>

      <Grid p='4px 12px 4px'>
        {CHARS[charType].map((row, i) => {
          return (
          <Grid container key={i} justify='space-between'>
            {row.map((c, j) => {
              const kanaCode = '0x' + c.charCodeAt(0).toString(16)
              return (
                <Grid flex={1/6} p='2px 3px' key={j}>
                  {c ? (
                    <Button outlined
                      style={{minWidth:'48px'}}
                      onClick={(e) => props.onSelectKana(kanaCode)}
                    >
                      <span>{c}</span>
                    </Button>
                  ) : null}
                </Grid>
              )
            })}
          </Grid>
          )
        })}
      </Grid>
    </>
  );
};

export default ResultsSelection;
