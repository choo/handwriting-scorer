import { h, Component } from 'preact';

import Header from './header';
import Container from './container';
import Main from './main';

const init = () => {
  if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value: function (callback, type, quality) {
        var canvas = this;
        setTimeout(function() {
          var binStr = atob( canvas.toDataURL(type, quality).split(',')[1] ),
              len = binStr.length,
              arr = new Uint8Array(len);
          for (var i = 0; i < len; i++ ) {
            arr[i] = binStr.charCodeAt(i);
          }
          callback( new Blob( [arr], {type: type || 'image/png'} ) );
        });
      }
    });
  }
};

export default class App extends Component {
  constructor() {
    super();
    init();
  }

  render() {
    return (
      <div id="app">
        <Header title='Letters' />
        <Container style={{
          marginTop: '42px',
          padding: '0 15px',
          maxWidth: '480px'}}
        >
          <Main />
        </Container>
      </div>
    );
  }
}
