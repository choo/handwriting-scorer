import React from 'react';
import Grid           from '@material-ui/core/Grid';
import Button         from '@material-ui/core/Button';
import Typography     from '@material-ui/core/Typography';
import TitleWithImage from './TitleWithImage';

import PropTypes from 'prop-types';

const ScoreDisplay = props => {
  const imgRef = React.useRef(null)
  React.useEffect(() => {
    if (props.imageBlob) {
      imgRef.current.src = window.URL.createObjectURL(props.imageBlob);
    }
  });
  return (
      <>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={5}>
            <img
              width={'100%'}
              border={'1'}
              ref={imgRef}
              alt={'canvas content'}
            />
          </Grid>
          <Grid item xs={1}
            style={{textAlign: "center"}}
          >
            <Typography>⇒</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h1">{props.chara}</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
          spacing={1}
        >
          <Grid item xs={5}>
            <Typography variant="h3" color="error">
              {props.score}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>点 / 100</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          //justify="flex-end"
          justify="space-around"
          alignItems="flex-end"
          spacing={1}
        >
          <Grid item xs={8}>
            <Button
              fullWidth
              variant="contained"
              onClick={props.onClickBack}
              disabled
            >「{props.chara}」の満点の例を見る</Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={props.onClickBack}
            >戻る</Button>
          </Grid>
        </Grid>
      </>
  )
};

ScoreDisplay.propTypes = {
  chara: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  imageBlob: PropTypes.instanceOf(Blob),
  onClickBack: PropTypes.func.isRequired,
};

export default ScoreDisplay;
