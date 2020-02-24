import {CHAR_TYPES} from './const';

const shuffleArray = ary => {
  const ret = [...ary]
  ret.sort(() => Math.random() - 0.5);
  return ret;
};

const summarizeAchivements = (writtenInfo) => {
  const ret = {
    numChars: Object.keys(writtenInfo).length,
    totalScore: 0,
    totalNum: 0,
    averageScore: 0,
    byType: {},
  };
  for (const type of CHAR_TYPES) {
    ret.byType[type] = {
      numChars: 0,
      totalNum: 0,
      totalScore: 0,
      averageScore: 0,
      byChar: {},
    };
  }
  for (const [charCode, info] of Object.entries(writtenInfo)) {
    ret.totalScore += info.total;
    ret.totalNum   += info.num;
    const c = String.fromCharCode(parseInt(charCode, 16));
    const type = _classifyChar(c);
    ret.byType[type].numChars += 1;
    ret.byType[type].totalNum += info.num;
    ret.byType[type].totalScore += info.total;
    ret.byType[type].byChar[c] = info; // {max: x, num: x, total: x}
  }
  if (ret.totalNum > 0) {
    ret.averageScore = ret.totalScore / ret.totalNum;
  }
  for (const info of Object.values(ret.byType)) {
    if (info.totalNum > 0) {
      info.averageScore = info.totalScore / info.totalNum;
    }
  }
  return ret;
};

const updateAchivements = (current, charCode, score) => {
  const cur  = current;
  const s = parseInt(score);
  const c = String.fromCharCode(parseInt(charCode, 16));
  const t = _classifyChar(c);
  cur.totalNum   += 1;
  cur.totalScore += s;
  cur.byType[t].totalNum   += 1;
  cur.byType[t].totalScore += s;
  if (cur.byType[t].byChar[c]) {
    const charInfo = cur.byType[t].byChar[c];
    charInfo.num += 1;
    charInfo.max = Math.max(charInfo.max, s);
    charInfo.total += s;
  } else {
    cur.numChars += 1;
    cur.byType[t].numChars += 1;
    cur.byType[t].byChar[c] = {
      num: 1,
      max: s,
      total: s,
    };
  }
  cur.averageScore = cur.totalScore / cur.totalNum;
  cur.byType[t].averageScore = (cur.byType[t].totalScore /
      cur.byType[t].totalNum);
  return cur;
};

/* TODO: extract utility module as char-utils.js */
const NUM_MIN  = '0' // '\u0030'
const NUM_MAX  = '9' // '\u0039'
const LATIN_UPPER_MIN = 'A' // '\u0041'
const LATIN_UPPER_MAX = 'Z' // '\u005a'
const LATIN_LOWER_MIN = 'a' // '\u0061'
const LATIN_LOWER_MAX = 'z' // '\u007a'
const HIRA_MIN = 'ぁ'; // '\u3041'
const HIRA_MAX = 'ゖ'; // '\u3096'
const KATA_MIN = 'ァ'; // '\u30a1'
const KATA_MAX = 'ヺ'; // '\u30fa'
const KANJI_MIN = '\u4e00' // 一(ichi)
const KANJI_MAX = '\u9fff' //

const _classifyChar = c => {
  if (_isAlphaNum(c)) {
    return 'alpha';
  } else if (_isHira(c)) {
    return 'hira';
  } else if (_isKata(c)) {
    return 'kata';
  } else if (_isKanji(c)) {
    return 'kanji';
  }
  return null;
};

const _isAlphaNum = c => {
  return (NUM_MIN <= c && c <= NUM_MAX) ||
         (LATIN_UPPER_MIN <= c && c <= LATIN_UPPER_MAX) ||
         (LATIN_LOWER_MIN <= c && c <= LATIN_LOWER_MAX);
};

const _isHira = c => {
  return (HIRA_MIN <= c && c <= HIRA_MAX);
};

const _isKata = c => {
  return (KATA_MIN <= c && c <= KATA_MAX);
};

const _isKanji = c => {
  return (KANJI_MIN <= c && c <= KANJI_MAX);
};

const classifyChars = chars => {
  const ret = {
    'hira' : [],
    'kata' : [],
    'kanji': [],
    'alpha': [],
  };

  for (const [charCode, _] of chars) {
    const c = String.fromCharCode(parseInt(charCode, 16))
    const type = _classifyChar(c);
    if (type) {
      ret[type].push([charCode, _]);
    }
  }
  return Object.entries(ret);
};

export {shuffleArray, classifyChars, summarizeAchivements, updateAchivements};
