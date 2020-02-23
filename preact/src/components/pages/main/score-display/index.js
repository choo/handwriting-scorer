import Grid from '../../../atoms/grid';
import Button from '../../../atoms/button';
import AnimationCounter from '../../../atoms/animation-counter'

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
          <Grid flex={5/12}>
            <img style={{width: '100%'}}
              src={URL.createObjectURL(props.imageBlob)}
              border={'1'}
              alt={'canvas content'}
            />
          </Grid>
          <Grid flex={1/12}>
            <span>⇒</span>
          </Grid>
          <Grid flex={5/12}>
            <span style={{fontSize: '96px'}}>
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
          <Grid flex={1/2}>
            <Button outlined
              onClick={props.onClickBack}
              disabled // TODO: add function
            >「{props.chara}」の満点の例を見る</Button>
          </Grid>
        </Grid>
        <Grid m='12px 0 16px'>
          <Button outlined onClick={props.onClickBack}>戻る</Button>
        </Grid>
      </>
  )
};

export default ScoreDisplay;
