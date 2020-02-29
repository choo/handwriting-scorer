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
            charType={charType}
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


const KANJI_TYPES = [
  {title: '小学１年生', eduYear: 1},
  {title: '小学２年生', eduYear: 2},
  {title: '小学３年生', eduYear: 3},
  {title: '小学４年生', eduYear: 4},
  {title: '小学５年生', eduYear: 5},
  {title: '小学６年生', eduYear: 6},
  {title: '中学生', eduYear: 7},
  {title: '常用外漢字', eduYear: 0},
];

const KanjiTable = props => {
  console.log(props.kanjiInfo);

  const [kanjiType, setKanjiType] = useState(0);
  const selected = KANJI_TYPES[kanjiType];
  const chars = [];
  for (const info of props.kanjiInfo) {
    if (info.edu_year === selected.eduYear) {
      chars.push(info);
    }
  }
  const p = {blockTitle: selected.title, chars: chars, ...props};
  return (
    <>
      <Grid container style={{
        border: '1px solid',
        flexWrap: 'wrap',
      }}>
        {KANJI_TYPES.map((kanjiTypeInfo, idx) => (
          <Grid flex={1/3}>
            <button onClick={() => setKanjiType(idx)}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: kanjiType === idx ? '#fff826' : '#fff',
                fontSize: '14px',
              }}
            >
              {kanjiTypeInfo.title}
            </button>
          </Grid>
        ))}
      </Grid>
      <KanjiTableBlock {...p} />
    </>
  );
};


const KanjiTableBlock = props => {
  const SIZE = 5;
  const nRows = Math.ceil(props.chars.length / SIZE);
  return (
    <>
      {[...Array(nRows).keys()].map(i => {
        const rowChars = props.chars.slice(i * SIZE, (i + 1) * SIZE);
        for (let i = 0; i < SIZE - rowChars.length; i++) {
          rowChars.push({title: ''});
        }
        return (
          <Grid container key={i} justify='space-between'>
            <Grid flex={1/12}></Grid>
              {rowChars.map((info, j) => {
                const c = info.title;
                const charCode = '0x' + c.charCodeAt(0).toString(16)
                const p = {c: c, j: j, charCode: charCode, ...props};
                return (
                  <CharTableCell {...p} />
                )
              })}
            <Grid flex={1/12}></Grid>
          </Grid>
        )
      })}
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
            const p = {c: c, j: j, charCode: charCode, ...props};
            return (
              <CharTableCell {...p} />
            )
          })}
          <Grid flex={1/12}></Grid>
        </Grid>
      ))}
    </>
  );
};


const CharTableCell = props => {
  return (
    <Grid flex={1/6} p='2px 2px' key={props.j}>
      {props.c && (
        props.makeButton ? (
          props.makeButton(props.charCode, props.charType, props.c)
        ) : (
          <Button outlined
            onClick={(e) => props.onSelectChar(props.charCode)}
            style={{
              minWidth: '48px',
              fontSize: '16px',
              fontFamily: "Noto Serif JP",
            }}
          >
            {props.c}
          </Button>
        )
      )}
    </Grid>
  )
};


export default CharList;
