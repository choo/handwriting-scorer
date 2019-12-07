import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper     from '@material-ui/core/Paper';
import MenuItem  from '@material-ui/core/MenuItem';

const inputBoxHeight = 70;

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    top: inputBoxHeight,
    left: 0,
    right: 0,
  },
}));

export default function KeywordSuggest(props) {
  const classes = useStyles();
  const handleChange = event => {
    const keyword = event.target.value;
    props.onChange(keyword);
  };

  const isHighlighted = false;
  const isSelected = false;

  return (
    <div className={classes.container}>
      <TextField
        id="outlined-full-width"
        label="keyword"
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={handleChange}
        value={props.keyword}
      />
      {props.suggests && props.suggests.length > 0 ? (
        <Paper className={classes.paper} square>
          {props.suggests.slice(0, 15).map((suggest, idx) => {
            return (
              <MenuItem
                key={idx}
                selected={isHighlighted}
                component="div"
                style={{
                  fontWeight: isSelected ? 500 : 400,
                }}
              >
                {suggest}
              </MenuItem>
            )
          })}
        </Paper>
      ) : null}
    </div>
  );
}
