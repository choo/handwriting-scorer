import Grid from '../../atoms/grid';
import Button from '../../atoms/button';
import {CHAR_TYPES, CHAR_DISPLAYS, CHARS} from '../../../utils/const';

const BUCKET_URL = 'https://storage.googleapis.com/letters-sample-images';
const IMAGE_DIR = 'pickup';

const makeUrl = (charCode, filename) => {
  return `${BUCKET_URL}/${IMAGE_DIR}/${charCode}/${filename}`;
};

const CharInfo = (props) => {
  const imageInfo = props.sampleImageInfo;
  const sampleUrls = (imageInfo && imageInfo[props.charCode]) || [];
  const c = String.fromCharCode(parseInt(props.charCode, 16));
  const samples = [];
  for (const imgUrl of sampleUrls) {
    samples.push({
      url: makeUrl(props.charCode, imgUrl),
      score: 100
    });
  }
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
          {samples.length ? samples.map(img => (
            <Grid p='2px' style={{width: '100px'}}>
              <img style={{width: '100%'}}
                src={img.url}
                border={'1'}
              />
              <div style={{textAlign: 'center'}}>
                <span>{img.score} 点</span>
              </div>
            </Grid>
          )) : (
            <span>まだ高得点の例はありません</span>
          )}
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
