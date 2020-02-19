const shuffleArray = ary => {
  const ret = [...ary]
  ret.sort(() => Math.random() - 0.5);
  return ret;
};

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

export {shuffleArray, classifyChars};
