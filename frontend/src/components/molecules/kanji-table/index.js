import { useState } from 'preact/hooks';

import Grid from '../../atoms/grid';
import GridList from '../../atoms/gridlist';

import {getActiveColor} from '../../../utils/layout';

const ROW_SIZE = 5;
const KANJI_TYPE_WIDTH = 4;
const PAGE_SIZE = 100;
const PAGE_BUTTON_WIDTH = 6;

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
const SORT_TYPES = [
  {name: '総画数順', param: 'sokaku'},
  //{name: '部首', param: 'busyu'},
  {name: '文字コード順', param: 'code'},
]

const KanjiTable = props => {
  const [kanjiType, setKanjiType] = useState(0);
  const [sort, setSort] = useState('sokaku');
  const [page, setPage] = useState(1);

  const updateType = type => {
    setKanjiType(type);
    setPage(1);
  };
  const updateSort = selected => {
    setSort(selected);
    setPage(1);
  };

  const selectedType = KANJI_TYPES[kanjiType];
  let dispChars = [];
  for (const info of props.kanjiInfo) {
    if (info.edu_year === selectedType.eduYear) {
      dispChars.push(info);
    }
  }

  /* sort */
  if (sort === 'sokaku') {
    dispChars.sort((a, b) => a.sokaku - b.sokaku);
  } else if (sort === 'busyu') {
    dispChars.sort((a, b) => {
      if (a.busyu === b.busyu) {
        return a.busyu_kaku - b.busyu_kaku;
      }
      return a.busyu.charCodeAt(0) - b.busyu.charCodeAt(0);
    });
  } else {
    /* unicode */
    dispChars.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
  }

  const pageNum = Math.ceil(dispChars.length / PAGE_SIZE);
  dispChars = dispChars.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const p = {blockTitle: selectedType.title, chars: dispChars, ...props};
  const pagination = (
    <SimplePagination
      page={page}
      pageNum={pageNum}
      setPage={setPage}
    />
  );
  return (
    <>

      <KanjiTypeButtons
        kanjiType={kanjiType}
        elms={KANJI_TYPES}
        updateType={updateType}
      />

      <SortButtons
        sort={sort}
        elms={SORT_TYPES}
        updateSort={updateSort}
      />

      {pagination}
      <KanjiTableBlock {...p} />
      {pagination}
    </>
  );
};

const range = (start, end) => {
  const ret = [];
  for (let i = start; i < end; i++) {
    ret.push(i);
  }
  return ret;
};


const KanjiTypeButtons = props => (
  <GridList
    elms={props.elms}
    width={KANJI_TYPE_WIDTH}
    makeCell={(info, key) => (
      <button onClick={() => props.updateType(key)}
        style={{
          width: '100%',
          height: '60px',
          backgroundColor: getActiveColor(props.kanjiType, key),
          fontSize: '12px',
        }}
      >
        {info.title}
      </button>
    )}
  />
);


const SortButtons = props => (
  <div style={{margin: '8px 0 8px'}}>
    <GridList
      elms={props.elms}
      width={props.elms.length}
      makeCell={(info, key) => (
        <button onClick={() => props.updateSort(info.param)}
          style={{
            width: '100%',
            height: '48px',
            backgroundColor: getActiveColor(props.sort, info.param),
            fontSize: '14px',
          }}
        >
          {info.name}
        </button>
      )}
    />
  </div>
);


const SimplePagination = props => {
  const pages = range(1, props.pageNum + 1);
  return (
    <div style={{margin: '8px 0 8px'}}>
      <GridList
        elms={pages}
        width={PAGE_BUTTON_WIDTH}
        makeCell={(p, key) => (
          <button onClick={() => props.setPage(p)}
            style={{
              width: '100%',
              backgroundColor: getActiveColor(props.page, p),
              fontSize: '14px',
            }}
          >
            {p}
          </button>
        )}
      />
    </div>
  );
};


const KanjiTableBlock = props => (
  <GridList
    elms={props.chars}
    width={ROW_SIZE}
    p={'2px'}
    makeCell={(info, key) => {
      const c = info.title;
      const charCode = '0x' + c.charCodeAt(0).toString(16).padStart(4, '0');
      return props.makeButton(charCode, props.charType, c);
    }}
  />
);


export default KanjiTable;
