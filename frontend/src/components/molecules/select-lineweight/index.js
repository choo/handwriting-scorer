import Popup from '../../atoms/popup';

import Wording   from '../../../utils/lang';
import style from './style.css'

const LANG = 'ja'
const WEIGHT_OPTIONS = [2,5,10,15,20,25,30];

const SelectLineWeight = (props) => {
  const handleClickItem = val => {
    props.onChangeWeight(val);
  };

  /* buttonText=<LineWeightIcon /> */
  return (
    <>
      <Popup
        style={{
          bottom: '2.0rem',
          transformOrigin: 'bottom left',
        }}
        onClickClose={true}
        buttonText={Wording.lineWeightButton[LANG]}
        menu={
          <div style={{
            minWidth: '160px',
            overflow: 'auto',
            boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
            backgroundColor: '#fff',
            margin: '4px 0px',
          }}>
            {
              WEIGHT_OPTIONS.map(val => {
                // FIXME: add checked icon
                return (
                  <a key={val}
                    class={style.selection}
                    selected={val === props.weight}
                    onClick={() => handleClickItem(val)}
                    style={{
                      backgroundColor: val === props.weight ? '#ffb6b6' : '',
                  }}>
                    {val}px
                  </a>
                )
              })
            }
          </div>
        }
      />
    </>
  );
};

export default SelectLineWeight;
