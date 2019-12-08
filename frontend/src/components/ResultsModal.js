import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal          from '@material-ui/core/Modal';
import Backdrop       from '@material-ui/core/Backdrop';
import Fade           from '@material-ui/core/Fade';
import Box            from '@material-ui/core/Box';
import Typography     from '@material-ui/core/Typography';

import ResultsSelection from './ResultsSelection';
import TitleWithImage from './TitleWithImage';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const ResultsModal = props => {
  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.currentStatus > 0}
        onClose={props.close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
      >
        <Fade in={props.currentStatus > 0}>
          <Box
            width={340}
            pt={2} px={4} pb={3}
            bgcolor={'#fff'}
            //backgroundColor: theme.palette.background.paper,
            style={props.predicted.length ? {} : { display: 'none' }}
          >
            {props.currentStatus === 1 ?
              (
                <ResultsSelection
                  predicted={props.predicted}
                  imageBlob={props.imageBlob}
                  onSelectKana={props.onSelectKana}
                />
              ) : (
                <>
                  <TitleWithImage
                    //left=Wording.predicted[LANG]
                    left={`score of "${props.selected.kana}" for `}
                    right={'is ...'}
                    imageBlob={props.imageBlob}
                    leftWidth={6}
                  />
                  <Typography>score: {props.selected.score} / 100</Typography>
                  <Typography>prob: {props.selected.prob}</Typography>
                </>
              )
            }

          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ResultsModal;
