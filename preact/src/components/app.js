import { Component } from 'preact';
import Router from 'preact-router';

import Header from './molecules/header';
import Container from './atoms/container';
import Main from './pages/main';
import init from '../utils/init';
import Record from './pages/record';
import DetailRecord from './pages/detail-record';
import {summarizeAchivements} from '../utils/utils';
import {doAjax} from '../utils/ajax';
import {MAX_WIDTH, WINDOW_PADDING} from '../utils/layout';

export default class App extends Component {
  constructor() {
    super();
    init();
    this.state = {
      achivements: null,
    };
  }

  componentDidMount() {
    doAjax('/api/achivements', {}, (result) => {
      this.setState({
        achivements: summarizeAchivements(result.achivements),
      });
    });
  }

  render() {
    return (
      <Container style={{
        padding: `0 ${WINDOW_PADDING}px`,
        maxWidth: `${MAX_WIDTH}px`}}
      >
        <Header />
        <Router>
          <Main path="/" />
          <Record path="/record" achivements={this.state.achivements} />
          <DetailRecord
            path="/record/detail"
            achivements={this.state.achivements}
          />
        </Router>
      </Container>
    );
  }
}
