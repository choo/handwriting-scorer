import Grid from '../../atoms/grid';
import Button from '../../atoms/button';
import {CHAR_TYPES, CHAR_DISPLAYS, CHARS} from '../../../utils/const';

const BUCKET_URL = 'https://storage.googleapis.com/letters-sample-images';

// for test
const sample = {
  path: BUCKET_URL + '/test/ETL9G_001420.png',
  score: 100,
};
const IMAGES = [sample, sample, sample, sample];

const CharInfo = (props) => {
  const c = String.fromCharCode(parseInt(props.charCode, 16));
  const samples = IMAGES;
  return (
    <>
      <Grid container m='20px 0 8px' alignItems='baseline'>
          <span style={{
            fontSize: '96px',
            fontFamily: "'Noto Serif JP', 'M PLUS Rounded 1c'",
          }}>
            {c}
          </span>
          <h2>の高得点の例</h2>
      </Grid>

        <Grid container
          flexWrap="wrap"
          alignItems="center"
        >
          {samples.map(img => (
            <Grid p='2px' style={{minWidth: '100px'}}>
              <img style={{width: '100%'}}
                src={img.path}
                border={'1'}
              />
              <div style={{textAlign: 'center'}}>
                <span>{img.score} 点</span>
              </div>
            </Grid>
          ))}
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
