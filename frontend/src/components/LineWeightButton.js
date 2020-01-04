import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LineWeightIcon from '@material-ui/icons/LineWeight';

import Wording   from '../lang';
const LANG = 'ja'
const WEIGHT_OPTIONS = [2,4,6,9,12,15,20,25,30];

const LineWeightButton = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickItem = val => {
    props.onChangeWeight(val);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleClick}>
          <LineWeightIcon />
          {Wording.lineWeightButton[LANG]}
      </Button>
      <Menu
        id="lineweight-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {
          WEIGHT_OPTIONS.map(val => {
            return (
              <MenuItem
                key={val}
                selected={val === props.weight}
                onClick={() => handleClickItem(val)}
              >
                {val}px
              </MenuItem>
            )
          })
        }
      </Menu>
    </>
  );
};

export default LineWeightButton;
