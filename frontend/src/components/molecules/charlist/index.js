import { useState } from 'preact/hooks';

import {CHAR_TYPES, CHAR_DISPLAYS, CHARS} from '../../../utils/const';

import Grid from '../../atoms/grid';
import Button from '../../atoms/button';


const CharList = props => {
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
                backgroundColor: charType === t ? '#fff826' : '#fff',
                fontSize: '14px',
              }}
            >
              {CHAR_DISPLAYS[t]}
            </button>
          </Grid>
        ))}
      </Grid>

      <Grid p='4px 12px 4px'>
        {charType === 'kanji' ? (
          <KanjiTable
            kanjiInfo={props.kanjiInfo}
            makeButton={props.makeButton}
            onSelectChar={props.onSelectChar}
          />
        ) : (
          <CharTable
            charInfo={CHARS[charType]}
            charType={charType}
            makeButton={props.makeButton}
            onSelectChar={props.onSelectChar}
          />
        )}
      </Grid>
    </>
  );
};


const KanjiTable = props => {
  const SIZE = 5;
  const numDisplay = 200;
  const chars = props.kanjiInfo.slice(0, numDisplay);
  const nRows = Math.ceil(chars.length / SIZE);
  return (
    <>
      {[...Array(nRows).keys()].map(i => (
        <Grid container key={i} justify='space-between'>
          <Grid flex={1/12}></Grid>
            {chars.slice(i * SIZE, (i + 1) * SIZE).map((info, j) => {
              const c = info.title;
              const charCode = '0x' + c.charCodeAt(0).toString(16)
              return (
                <Grid flex={1/6} p='2px' key={j}>
                  {c && (
                    props.makeButton ? (
                      props.makeButton(charCode, 'kanji', c)
                    ) : (
                      <Button outlined
                        onClick={(e) => props.onSelectChar(charCode)}
                        style={{
                          minWidth: '48px',
                          fontSize: '16px',
                          fontFamily: 'Noto Serif JP',
                        }}
                      >
                        {c}
                      </Button>
                    )
                  )}
                </Grid>
              )
            })}
          <Grid flex={1/12}></Grid>
        </Grid>
      ))}
    </>
  );
};


const CharTable = props => {
  return (
    <>
      {props.charInfo.map((row, i) => (
        <Grid container key={i} justify='space-between'>
          <Grid flex={1/12}></Grid>
          {row.map((c, j) => {
            const charCode = '0x' + c.charCodeAt(0).toString(16)
            return (
              <Grid flex={1/6} p='2px 2px' key={j}>
                {c && (
                  props.makeButton ? (
                    props.makeButton(charCode, props.charType, c)
                  ) : (
                    <Button outlined
                      onClick={(e) => props.onSelectChar(charCode)}
                      style={{
                        minWidth: '48px',
                        fontSize: '16px',
                        fontFamily: "Noto Serif JP",
                      }}
                    >
                      {c}
                    </Button>
                  )
                )}
              </Grid>
            )
          })}
          <Grid flex={1/12}></Grid>
        </Grid>
      ))}
    </>
  );
};


export default CharList;
