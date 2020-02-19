import { Component } from 'preact';

import Header from './header';
import Container from './container';
import Main from './main';
import init from '../utils/init';
import {MAX_WIDTH, WINDOW_PADDING} from '../utils/layout';

export default class App extends Component {
  constructor() {
    super();
    init();
  }

  render() {
    return (
      <Container style={{
        padding: `0 ${WINDOW_PADDING}px`,
        maxWidth: `${MAX_WIDTH}px`}}
      >
        <Header />
        <Main />
      </Container>
    );
  }
}
