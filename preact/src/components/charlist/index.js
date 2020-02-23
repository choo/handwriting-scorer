import { useState } from 'preact/hooks';

import {CHAR_TYPES, CHAR_DISPLAYS, CHARS} from '../../utils/const';

import Grid from '../grid';
import Button from '../button';


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

export default CharList;