import style from './style.css';
import {CHAR_TYPES, CHAR_DISPLAYS, CHARS} from '../../utils/const';
import {clearAllBodyScrollLocks } from 'body-scroll-lock';


const Record = (props) => {
  clearAllBodyScrollLocks();
  const res = props.achivements || {};
  return (
    <>
      <RecordTable
        title={'総合'}
        achivements={props.achivements || {}} />
      {CHAR_TYPES.map(type => {
        const res = props.achivements ? props.achivements.byType[type] : {};
        return (
          <RecordTable
            title={CHAR_DISPLAYS[type]}
            achivements={res} />
        );
      })}
    <div>
      <span>{JSON.stringify(res)}</span>
    </div>
    </>
  );
};


const RecordTable = (props) => {
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
            <td class={style.last}>（のべ {res.totalNum}）</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Record;
