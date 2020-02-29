import Popup from '../../atoms/popup';

import Wording   from '../../../utils/lang';

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
                    selected={val === props.weight}
                    onClick={() => handleClickItem(val)}
                    style={{
                    color: '#000',
                    display: 'block',
                    padding: '10px',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    borderBottom: '1px solid #bbb',
                    backgroundColor: val === props.weight ? '#fffb74' : '',
                    textAlign: 'center',
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
