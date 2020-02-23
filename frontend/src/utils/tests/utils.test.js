import {isKana} from '../utils';

it('kana judgement', () => {
  expect(isKana('あ')).toEqual(true);
  expect(isKana('ぁ')).toEqual(true);
  expect(isKana('ヲ')).toEqual(true);

  expect(isKana('a')).toEqual(false);
  expect(isKana('0')).toEqual(false);
});
