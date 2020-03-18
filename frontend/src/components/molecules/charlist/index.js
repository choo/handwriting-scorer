import { useState } from 'preact/hooks';

import {CHAR_TYPES, CHAR_DISPLAYS, CHARS} from '../../../utils/const';
import {getActiveColor} from '../../../utils/layout';

import Grid from '../../atoms/grid';
import KanjiTable from '../kanji-table'


const CharList = props => {
  const [charType, setCharType] = useState('hira');
  return (
    <>
      <Grid container style={{
        //boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), ' +
        //           '0 3px 1px -2px rgba(0,0,0,0.12), ' +
        //           '0 1px 5px 0 rgba(0,0,0,0.2)',
        border: '1px solid',
      }}>
        {CHAR_TYPES.map(t => (
          <Grid flex={1}>
            <button onClick={() => setCharType(t)}
              style={{
                width: '100%',
                height: '70px',
                backgroundColor: getActiveColor(charType, t),
                fontSize: '12px',
              }}
            >
              {CHAR_DISPLAYS[t]}
            </button>
          </Grid>
        ))}
      </Grid>

      <Grid p='4px 12px 4px' m='0 0 24px'>
        {charType === 'kanji' ? (
          <KanjiTable
            charType={'kanji'}
            kanjiInfo={props.kanjiInfo}
            makeButton={props.makeButton}
          />
        ) : (
          <CharTable
            charInfo={CHARS[charType]}
            charType={charType}
            makeButton={props.makeButton}
          />
        )}
      </Grid>

      {props.ScoreLegend || null }
    </>
  );
};


/**
 * char table for other than kanji
 */
const CharTable = props => {
  return (
    <>
      {props.charInfo.map((row, i) => (
        <Grid container key={i} justify='space-between'>
          {row.map((c, j) => {
            const charCode = '0x' + c.charCodeAt(0).toString(16).padStart(4, '0');
            return (
              <Grid flex={1/5} p={'2px'} key={props.key}>
                {c && props.makeButton(charCode, props.charType, c)}
              </Grid>
            )
          })}
        </Grid>
      ))}
    </>
  );
};

export default CharList;
