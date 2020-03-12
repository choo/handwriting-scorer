import Grid from '../../atoms/grid';
import Button from '../../atoms/button';
import style from './style.css';


const About = (props) => (
  <>
    <Grid container m='20px 0 8px'>
      <Grid flex={1}>
        <h3 style={{margin: 0}}>このアプリケーションについて</h3>
      </Grid>
    </Grid>
    <div>
      <p>
        このアプリケーション <strong>Letters</strong> は、ディープラーニング(深層学習) と呼ばれる、最も代表的な AI の技術を用いて字の読みやすさを判定し、採点するものです。
      </p>

    <Grid container m='20px 0 8px'>
      <Grid flex={1}>
        <h3 style={{margin: 0}}>採点基準について</h3>
      </Grid>
    </Grid>
      <p>
        採点の基準は「字が正確がどうか」ではなく、「どれだけ読みやすいか」「どれだけ他の文字との区別が付くか」「どれだけ『その文字である』と判断可能か」「どれだけ確信を持って判断できるか」という点です。
      </p>
      <p>
        他の字との区別ができる場合であれば高い点数が付き、区別がつきにくい場合は低い点数が付く、という仕組みになっています。
      </p>
      <p>
        例えば、「準」「書」という字などは他に似ている字が少ないことから、字が歪んでいたりしても高い点数がつきやすくなっています。
      </p>
      <p>
        また「線」という字は右下の「水」の部分が誤っていても、他の文字との判別誤りの可能性は低いため（似ている「縁」とも誤りにくい）、点数が高く出たりします。
      </p>
      <p>
        逆に、例えば、カタカナの「エ」（え、e）と、漢字の「工」（工事、工場、斎藤工の工）は元来、非常に区別がつきにくいため、どちらも高い点数が付きにくくなっています。
      </p>
      <p>
        この現象は、人間による判断に置き換えても同様で、「エ」という文字だけが表示された状況でそれがカタカナなのか漢字なのかを判断せよ、と言われたとき、多くの人は判断ができないのと同様です。
      </p>
    </div>

    <Grid container m='20px 0 8px'>
      <Grid flex={1}>
        <h3 style={{margin: 0}}>使用データについて</h3>
      </Grid>
    </Grid>
    <div>
      <p>
        字の判定に用いるために機械学習の学習データとして用いたものは ETLCDB 及び emnist です。
      </p>
    </div>

    <Grid container m='20px 0 8px'>
      <Grid flex={1}>
        <h3 style={{margin: 0}}>作者について</h3>
      </Grid>
    </Grid>
    <div>
      <p>
        Twitter
      </p>
      <p>
        GitHub
      </p>
    </div>

    <Grid container m='20px 0 32px'>
      <Grid flex={1}>
        <a href="/" onClick={props.goToMain} style={{textDecoration: 'none'}}>
          <Button outlined>トップに戻る</Button>
        </a>
      </Grid>
    </Grid>
  </>
);


export default About;
