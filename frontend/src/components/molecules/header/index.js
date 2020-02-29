import Logo from '../../../assets/logotype_01.png'
import Hambuger from '../../atoms/hamburger';
import {HEADER_HEIGHT, MAX_WIDTH} from '../../../utils/layout';

const Header = (props) => {
  const height = `${HEADER_HEIGHT}px`
  return (
    <header style={{
      height: height,
      paddingBottom: '8px',
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <a href="/" native>
        <img src={Logo} height={56} />
      </a>

      <Hambuger width={MAX_WIDTH} height={height}>
        <div style={{
          minWidth: '100%',
          overflow: 'auto',
          boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        }}>
          <a href="/" onClick={props.goToMain} style={{
            color: '#000',
            display: 'block',
            padding: '20px',
            textDecoration: 'none',
            cursor: 'pointer',
            borderBottom: '1px solid #bbb',
          }}>
            Top
          </a>
          <a href="/record" style={{
            color: '#000',
            display: 'block',
            padding: '20px',
            textDecoration: 'none',
            cursor: 'pointer',
            borderBottom: '1px solid #bbb',
          }}>
            My Records
          </a>
          <a href="#" style={{
            color: '#000',
            display: 'block',
            padding: '20px',
            textDecoration: 'none',
            cursor: 'pointer',
          }}>
            About
          </a>
        </div>
      </Hambuger>
    </header>
  );
};

export default Header;
