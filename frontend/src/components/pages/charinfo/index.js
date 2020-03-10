import Grid from '../../atoms/grid';
import GridList from '../../atoms/gridlist';
import Button from '../../atoms/button';
import {CHAR_TYPES, CHAR_DISPLAYS, CHARS} from '../../../utils/const';
import style from './style.css'

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

      {samples.length ? (
        <GridList
          elms={samples}
          width={3}
          p={'2px'}
          makeCell={(info, key) => (
            <>
              <img class={style.image}
                src={info.url}
              />
              <div class={style.score}>
                <span>{info.score} 点</span>
              </div>
            </>
          )}
        />
      ) : (
        <span>まだ高得点の例はありません</span>
      )}

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
