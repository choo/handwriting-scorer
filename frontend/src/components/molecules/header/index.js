import Logo from '../../../assets/logotype_01.png'
import Hambuger from '../../atoms/hamburger';
import {HEADER_HEIGHT, MAX_WIDTH} from '../../../utils/layout';
import style from './style.css';

const Header = (props) => {
  const height = `${HEADER_HEIGHT}px`
  return (
    <header style={{
      height: height,
      paddingBottom: '8px',
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <a href="/" onClick={props.goToMain}>
        <img src={Logo} height={56} />
      </a>

      <Hambuger width={MAX_WIDTH} height={height}>
        <div style={{
          minWidth: '100%',
          overflow: 'auto',
          boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        }}>
          <a href="/" onClick={props.goToMain} class={style.item}>トップ</a>
          <a href="/record" class={style.item}>採点実績</a>
          <a href="/about" class={style.item}>サービスについて</a>
        </div>
      </Hambuger>
    </header>
  );
};

export default Header;
