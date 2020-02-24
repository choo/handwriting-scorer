import { Component } from 'preact';
import Router from 'preact-router';

import Header from './molecules/header';
import Container from './atoms/container';
import Main from './pages/main';
import init from '../utils/init';
import {STATUS} from '../utils/const';
import Record from './pages/record';
import DetailRecord from './pages/detail-record';
import {updateAchivements, summarizeAchivements} from '../utils/utils';
import {doAjax} from '../utils/ajax';
import {MAX_WIDTH, WINDOW_PADDING} from '../utils/layout';

export default class App extends Component {
  constructor() {
    super();
    init();
    this.state = {
      achivements: null,
      mainStatus: 1,
    };
    this.currentAchivements = {};
    this.updateScores  = this.updateScores.bind(this);
    this.setMainStatus = this.setMainStatus.bind(this);
    this.goToMain = this.goToMain.bind(this);
  }

  componentDidMount() {
    doAjax('/api/achivements', {}, (result) => {
      const achieve = summarizeAchivements(result.achivements);
      this.setState({
        achivements: achieve,
      });
      this.currentAchivements = achieve;
    });
  }

  updateScores(charCode, score) {
    this.currentAchivements = updateAchivements(
        this.currentAchivements, charCode, score);
    this.setState({achivements: this.currentAchivements});
  }

  setMainStatus(status) {
    this.setState({mainStatus: status});
  }
  goToMain() {
    this.setMainStatus(STATUS.WRITING);
  }

  render() {
    return (
      <Container style={{
        padding: `0 ${WINDOW_PADDING}px`,
        maxWidth: `${MAX_WIDTH}px`}}
      >
        <Header goToMain={this.goToMain} />
        <Router>
          <Main path="/"
            achivements={this.state.achivements}
            updateScores={this.updateScores}
            status={this.state.mainStatus}
            setStatus={this.setMainStatus}
          />
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
