import Grid from '../../atoms/grid';
import Button from '../../atoms/button';
import {CHAR_TYPES, CHAR_DISPLAYS, CHARS} from '../../../utils/const';


const CharInfo = (props) => {
  console.log(props.charCode);
  const c = String.fromCharCode(parseInt(props.charCode, 16));
  return (
    <>
      <Grid container m='20px 0 8px'>
        <Grid flex={4/12}>
          <span style={{
            fontSize: '128px',
            fontFamily: "'Noto Serif JP', 'M PLUS Rounded 1c'",
          }}>
            {c}
          </span>
        </Grid>
      </Grid>

      <Grid container m='20px 0 32px'>
        <Grid flex={1}>
          <a href="/" onClick={props.goToMain} style={{textDecoration: 'none'}}>
            <Button outlined>トップに戻る</Button>
          </a>
        </Grid>
      </Grid>
    </>
  );
};

export default CharInfo;
