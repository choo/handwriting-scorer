import Menu from '../../atoms/menu';

import Wording   from '../../../utils/lang';
import {getActiveColor} from '../../../utils/layout';

const LANG = 'ja'
const WEIGHT_OPTIONS = [2,5,10,15,20,25,30];
const options = WEIGHT_OPTIONS.map(val => val + 'px');

const SelectLineWeight = (props) => {
  const handleClickItem = val => {
    props.onChangeWeight(val);
  };

  /* buttonText=<LineWeightIcon /> */
  return (
    <>
      <Menu
        listStyle={{
          bottom: '2.0rem',
          transformOrigin: 'bottom left',
          minWidth: '160px',
        }}
        buttonText={Wording.lineWeightButton[LANG]}
        items={options}
        current={props.weight}
        onSelect={(val) => handleClickItem(val.replace('px', '') - 0)}
        makeItemStyle={(val) => {
          return {backgroundColor: getActiveColor(val, props.weight + 'px')}
        }}
      />
    </>
  );
};

export default SelectLineWeight;
