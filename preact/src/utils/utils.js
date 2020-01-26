const shuffleArray = ary => {
  const ret = [...ary]
  ret.sort(() => Math.random() - 0.5);
  return ret;
};


const isKana = c => {
  const minHira = 'ぁ'; // '\u3041'
  const maxHira = 'ゖ'; // '\u3096'
  const minKata = 'ァ'; // '\u30a1'
  const maxKata = 'ヺ'; // '\u30fa'
  return (minHira <= c && c <= maxHira) || (minKata <= c && c <= maxKata);
};

export {shuffleArray, isKana};
