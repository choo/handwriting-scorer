import React from 'react';
import AppBar     from '@material-ui/core/AppBar';
import Toolbar    from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    'display' : 'flex',
    'justify-content': 'center',
  },
}));

//class Header extends React.Component {
const Header = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            {process.env.REACT_APP_WEBSITE_NAME}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
