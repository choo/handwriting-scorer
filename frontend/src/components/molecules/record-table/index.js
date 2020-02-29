import style from './style.css';
import Grid from '../../atoms/grid';
import Button from '../../atoms/button';
import {CHAR_COUNTS} from '../../../utils/const'


const RecordTable = props => {
  return (
    <>
      <Grid container justify="flex-end" m="12px 0 0">
        <table class={style.recTable}>
          <tbody>
            <tr>
              <td class={style.head}>書いた文字数</td>
              <td class={style.last}>{props.achivements.numChars} / {CHAR_COUNTS.total}</td>
            </tr>
            <tr>
              <td class={style.head}>採点回数</td>
              <td class={style.last}>{props.achivements.totalNum} 回</td>
            </tr>
            <tr>
              <td class={style.head}>合計得点</td>
              <td class={style.last}>{props.achivements.totalScore} 点</td>
            </tr>
          </tbody>
        </table>
      </Grid>

      <Grid container justify="flex-end">
        <Grid flex={1/2}>
          <a href="/record/detail" style={{textDecoration: 'none'}}>
            <Button outlined>実績の詳細</Button>
          </a>
        </Grid>
      </Grid>
    </>
  )
};

export default RecordTable;
