import Grid from '../../atoms/grid';
import Button from '../../atoms/button';
import CharList from '../../molecules/charlist';
import style from './style.css'

import Circle from '../../../assets/score/circle.png'
import DoubleCircle from '../../../assets/score/double_circle.png'
import Triangle from '../../../assets/score/triangle.png'
//import Hanamaru from '../../../assets/score/hanamaru.png'
import FullScore from '../../../assets/score/fullscore.png'


const IconDef = [
  {min: 100, icon: FullScore},
  //{min:  90, icon: Hanamaru},
  {min:  80, icon: DoubleCircle},
  {min:  50, icon: Circle},
  {min:   0, icon: Triangle},
];

const DetailRecord = (props) => {
  const achivements = props.achivements || {};
  const getIcon = (charType, c) => {
    if (achivements.byType &&
        achivements.byType[charType].byChar[c]) {
      const props = achivements.byType[charType].byChar[c];
      for (const def of IconDef) {
        if (props.max >= def.min) {
          return (
            <img src={def.icon} class={` ${style.btn} ${style.scoreImage}`} />
          );
        }
      }
    }
    return null;
  };
  const selectChar = (charCode) => {
    location.href = `/charinfo/${charCode}`;
  };
  return (
    <>
      <Grid container alignItems='center' m='20px 0 24px'>
        <Grid flex={1}>
          <h3 style={{margin: 0}}>書いた文字詳細</h3>
        </Grid>
        <Grid flex={1}>
          <a href="/" onClick={props.goToMain} style={{textDecoration: 'none'}}>
            <Button outlined>トップに戻る</Button>
          </a>
        </Grid>
      </Grid>

      <CharList
        kanjiInfo={props.kanjiInfo}
        makeButton={(charCode, charType, c) => (
            <div class={style.charBox} onClick={() => selectChar(charCode)}>
              {c}
              {getIcon(charType, c)}
            </div>
        )}
        ScoreLegend={<ScoreLegend />}
      />

    </>
  );
};

const ScoreLegend = props => {
  return (
    <Grid container m={'16px 0 4px'}>
      {IconDef.map((def, idx) => (
        <Grid flex={1/2} key={idx}>
          <div style={{
              padding: '4px',
              textAlign: 'center',
          }}>
            <div>{`${def.min}点〜`}</div>
            <img src={def.icon} />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default DetailRecord;
