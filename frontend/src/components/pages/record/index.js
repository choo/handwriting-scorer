import Grid from '../../atoms/grid';
import Button from '../../atoms/button';
import style from './style.css';
import {CHAR_TYPES, CHAR_DISPLAYS, CHARS} from '../../../utils/const';
import {clearAllBodyScrollLocks } from 'body-scroll-lock';
import RecordTable from '../../molecules/record-table'


const Record = (props) => {
  clearAllBodyScrollLocks();
  if (!props.achivements) {
    return null;
  }
  return (
    <>
      <h2 class={style.tableTitle}>総合実績</h2>
      <RecordTable achivements={props.achivements} />

      <Grid container justify="flex-end" m='20px 0 0'>
        <Grid flex={2/3}>
          <a href="/record/detail" style={{textDecoration: 'none'}}>
            <Button outlined>書いた文字の一覧</Button>
          </a>
        </Grid>
      </Grid>
    </>
  );
};


const TypeRecordTable = (props) => {
  const res = props.achivements || {};
  const ave = res.averageScore ? res.averageScore.toFixed(1) : 0.0;
  return (
    <>
      <h3 class={style.tableTitle}>{props.title}</h3>
      <table class={style.recTable}>
        <tbody>
          <tr>
            <td class={style.head}>合計得点</td>
            <td class={style.mid}>{res.totalScore}</td>
            <td class={style.last}>（平均 {ave}）</td>
          </tr>
          <tr>
            <td class={style.head}>書いた文字数</td>
            <td class={style.mid}>{res.numChars} / 文字数</td>
            <td class={style.last}>（採点回数 {res.totalNum}）</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Record;
