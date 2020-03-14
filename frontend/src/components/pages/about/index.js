import Grid from '../../atoms/grid';
import Button from '../../atoms/button';
import style from './style.css';
import Logo from '../../../assets/logo_symbol_white_bg.png'
import GitHubLogo from '../../../assets/about/GitHub-Mark-64px.png'
import TwitterLogo from '../../../assets/about/Twitter_Social_Icon_Rounded_Square_Color.png'

const About = (props) => (
  <>
    <Grid container m='20px 0 8px'>
      <Grid flex={1}>
        <h3 style={{margin: 0}}>このサービスについて</h3>
      </Grid>
    </Grid>

    <Grid container m='20px 0 8px'>
      <Grid flex={1/3}>
        <img src={Logo} style={{width:'100%'}} />
      </Grid>
      <Grid flex={2/3}>
      <p>
        この web サービス <strong>Letters</strong> は、深層学習（ディープラーニング） と呼ばれる、AI の技術の中で最も代表的な手法を用いて手書き文字の読みやすさを判定し、採点するものです。
      </p>
      </Grid>
    </Grid>

    <Grid container m='20px 0 8px'>
      <Grid flex={1}>
        <h3 style={{margin: 0}}>採点可能な文字</h3>
      </Grid>
    </Grid>
    <div>
      <p>
        採点可能な文字は、日本語において多く用いられる、ひらがな・カタカナ・漢字・ローマ字・数字の合計 3175 文字です。
      </p>
      <p>
        内訳は、ひらがな 75 文字、カタカナ 71 文字、漢字 2967 文字、ローマ字が 52 文字、数字が 10 文字です。
      </p>
{/*
      <p>
        ひらがな・カタカナの小書き文字（「っ」「ゃ」などの小さい文字）は除外してありますが、濁音・半濁音の文字（「が」「ぱ」）などは含まれます。
      </p>
*/}
    </div>

    <Grid container m='20px 0 8px'>
      <Grid flex={1}>
        <h3 style={{margin: 0}}>採点基準について</h3>
      </Grid>
    </Grid>
    <div>
      <p>
        採点の基準は<strong>「字が正確がどうか」</strong>ではなく、<strong>「どれだけ読みやすいか」「どれだけ他の文字との区別が付くか」</strong>という点です。
      </p>
{/*
      <p>
        採点の基準は「字が正確がどうか」ではなく、「どれだけ読みやすいか」「どれだけ他の文字との区別が付くか」「どれだけ『その文字である』と判断可能か」「どれだけ確信を持って判断できるか」という点です。
      </p>
*/}
      <p>
        他の字との区別ができる場合であれば高い点数が付き、区別がつきにくい場合は低い点数が付く、という仕組みになっています。
      </p>
      <p>
        例えば、「準」「書」という字などは他に似ている字が少ないことから、字が歪んでいたりしても高い点数がつきやすくなっています。
      </p>
{/*
      <p>
        また「線」という字は右下の「水」の部分が誤っていても、他の文字との判別誤りの可能性は低いため（似ている「縁」とも誤りにくい）、点数が高く出たりします。
      </p>
*/}
      <p>
        逆に、例えば、カタカナの「エ」（え、e）と、漢字の「工」（工事、工場、斎藤工の工）は元来、非常に区別がつきにくいため、どちらも高い点数が付きにくくなっています。
      </p>
{/*
      <p>
      <p>
        この現象は、人間による判断に置き換えても同様で、「エ」という文字だけが表示された状況でそれがカタカナなのか漢字なのかを判断せよ、と言われたとき、多くの人は判断ができないのと同様です。
      </p>
*/}
      <p>
        この問題に関しては目下解決策を検討中です。
      </p>
    </div>

{/*
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
*/}

    <Grid container m='20px 0 8px'>
      <Grid flex={1}>
        <h3 style={{margin: 0}}>作者</h3>
      </Grid>
    </Grid>
    <div>
      <Grid container m='20px 0 8px' alignItems='center'>
        <a target='_blank' rel="noopener noreferrer"
          href='https://twitter.com/choo_s'>
          <img style={{width: 48, marginRight: 8}} src={TwitterLogo} alt={'twitter Link'} />
        </a>
        <a target='_blank' rel="noopener noreferrer"
          href='https://github.com/choo/'>
          <img style={{width: 48}} src={GitHubLogo} alt={'GitHub Link'} />
        </a>
      </Grid>
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
