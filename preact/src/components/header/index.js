import Logo from '../../assets/logo_00.png'
import Hambuger from '../hamburger';
import {HEADER_HEIGHT, MAX_WIDTH} from '../../utils/layout';

const Header = (props) => {
  const height = `${HEADER_HEIGHT}px`
  return (
    <header style={{
      height: height,
      paddingBottom: '8px',
      display: 'flex',
      justifyContent: 'space-between',
    }}>
      <img src={Logo} height={64} />

      <Hambuger width={MAX_WIDTH} height={height}>
        <div style={{
          minWidth: '100%',
          overflow: 'auto',
          boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        }}>
          <a href="#" style={{
            color: '#000',
            display: 'block',
            padding: '20px',
            textDecoration: 'none',
            cursor: 'pointer',
            borderBottom: '1px solid #bbb',
          }}>
            Link 1
          </a>
          <a href="#" style={{
            color: '#000',
            display: 'block',
            padding: '20px',
            textDecoration: 'none',
            cursor: 'pointer',
          }}>
            Link 2
          </a>
        </div>
      </Hambuger>
    </header>
  );
};

export default Header;
