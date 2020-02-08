import { Component } from 'preact';

import Header from './header';
import Container from './container';
import Main from './main';
import init from '../utils/init';

export default class App extends Component {
  constructor() {
    super();
    init();
  }

  render() {
    return (
      <Container style={{
        padding: '0 15px',
        maxWidth: '480px'}}
      >
        <Header />
        <Main />
      </Container>
    );
  }
}
