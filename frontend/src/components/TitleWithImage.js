import React from 'react';
import Grid           from '@material-ui/core/Grid';
import Typography     from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

const TitleWithImage = props => {
  const imgRef = React.useRef(null)
  React.useEffect(() => {
    if (props.imageBlob) {
      imgRef.current.src = window.URL.createObjectURL(props.imageBlob);
    }
  });
  return (
      <Grid
        container
        direction="row"
        //justify="flex-end"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={props.leftWidth}>
          <Typography>{props.left}</Typography>
        </Grid>
        <Grid item xs={10 - props.leftWidth}>
          <img
            width={80}
            height={80}
            border={'1'}
            ref={imgRef}
            alt={'canvas content'}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography>{props.right}</Typography>
        </Grid>
      </Grid>
  )
};

TitleWithImage.propTypes = {
  left: PropTypes.string.isRequired,
  right: PropTypes.string.isRequired,
  imageBlob: PropTypes.instanceOf(Blob),
};

export default TitleWithImage;
