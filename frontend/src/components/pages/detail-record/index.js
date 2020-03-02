import Grid from '../../atoms/grid';
import Button from '../../atoms/button';
import CharList from '../../molecules/charlist';
import style from './style.css'


const colorDef = [
  {min: 90, color: '#ff6d6d'},
  {min: 50, color: '#ff9191'},
  {min: 10, color: '#ffb6b6'},
  {min:  0, color: '#ffdada'},
];

const DetailRecord = (props) => {
  const achivements = props.achivements || {};
  const getButtonColor = (charType, c) => {
    let color = '#fff';
    if (achivements.byType &&
        achivements.byType[charType].byChar[c]) {
      const props = achivements.byType[charType].byChar[c];
      for (const def of colorDef) {
        if (props.max >= def.min) {
          color = def.color;
          break;
        }
      }
    }
    return color;
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
        makeButton={(charCode, charType, c) => 
          <div class={style.charBox} style={{
              backgroundColor: getButtonColor(charType, c),
          }}>
            {c}
          </div>
        }
        ScoreLegend={<ScoreLegend />}
      />

    </>
  );
};

const ScoreLegend = props => {
  return (
    <Grid container m={'16px 0 4px'}>
      {colorDef.map((def, idx) => (
        <Grid flex={1/2} key={idx}>
          <div style={{
              backgroundColor: def.color,
              padding: '4px',
              textAlign: 'center',
          }}>
            <span>{`${def.min}点〜`}</span>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default DetailRecord;
