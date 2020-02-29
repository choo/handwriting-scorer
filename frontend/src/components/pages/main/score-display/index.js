import style from './style.css';
import Grid from '../../../atoms/grid';
import Button from '../../../atoms/button';
import AnimationCounter from '../../../atoms/animation-counter'
import {CHAR_COUNTS} from '../../../../utils/const'

/*
ScoreDisplay.propTypes = {
  chara: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  imageBlob: PropTypes.instanceOf(Blob),
  onClickBack: PropTypes.func.isRequired,
};
*/

const ScoreDisplay = props => {
  return (
      <>
        <Grid container
          justify="space-evenly"
          alignItems="center"
        >
          <Grid flex={4/12}>
            <img style={{width: '100%'}}
              src={URL.createObjectURL(props.imageBlob)}
              border={'1'}
              alt={'canvas content'}
            />
          </Grid>
          <Grid flex={1/12} style={{textAlign: 'center'}}>
            <span>⇒</span>
          </Grid>
          <Grid flex={4/12}>
            <span style={{
              fontSize: '128px',
              fontFamily: "'Noto Serif JP', 'M PLUS Rounded 1c'",
            }}>
              {props.chara}
            </span>
          </Grid>
        </Grid>

        <Grid container
          //justify="flex-end"
          justify="space-evenly"
          alignItems="flex-end"
        >
          <Grid flex={1/4}>
          </Grid>
          <Grid flex={2/4} style={{textAlign: 'center'}}>
            <AnimationCounter
              initial={0}
              target={props.score}
              style={{fontSize: '96px', color: '#ff0000'}}
            />
          </Grid>
          <Grid flex={1/4}>
            <span style={{
              bottom: '30px',
              position: 'relative',
            }}>点 / 100</span>
          </Grid>
        </Grid>

        <Grid container justify="flex-end">
          <Button outlined
            onClick={props.onClickBack}
            disabled // TODO: add function
          >「{props.chara}」の満点の例を見る</Button>
        </Grid>

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
            <a href="/record" style={{textDecoration: 'none'}}>
              <Button outlined>現在の実績</Button>
            </a>
          </Grid>
        </Grid>

        <Grid m='24px 0 32px'>
          <Button outlined onClick={props.onClickBack}>戻る</Button>
        </Grid>
      </>
  )
};

export default ScoreDisplay;
