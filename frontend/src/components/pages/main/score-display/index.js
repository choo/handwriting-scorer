import style from './style.css';
import Grid from '../../../atoms/grid';
import Button from '../../../atoms/button';
import AnimationCounter from '../../../atoms/animation-counter'
import RecordTable from '../../../molecules/record-table'

/*
ScoreDisplay.propTypes = {
  char: PropTypes.string.isRequired,
  charCode: PropTypes.string.isRequired,
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
              {props.char}
            </span>
          </Grid>
        </Grid>

        <div style={{position: 'relative', margin: '-56px 0 0'}}>
          <div style={{textAlign: 'center'}}>
            <AnimationCounter
              initial={0}
              target={props.score}
              style={{fontSize: '128px', color: '#ff0000'}}
            />
          </div>
          <div style={{
            position: 'absolute',
            bottom: '30px',
            right: 0,
          }}>
            <span>点 / 100</span>
          </div>
        </div>

        <Grid container m='4px 0 6px'>
          <Grid flex={2/3} p='0 6px 0 0'>
            <a href={`/charinfo/${props.charCode}`}
              style={{textDecoration: 'none'}}
            >
              <Button outlined >「{props.char}」の高得点の例</Button>
            </a>
          </Grid>
          <Grid flex={1/3}>
            <Button outlined onClick={props.onClickBack}>戻る</Button>
          </Grid>
        </Grid>

        <RecordTable achivements={props.achivements} />

      </>
  )
};

export default ScoreDisplay;
