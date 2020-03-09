import { Component } from 'preact';
import Router from 'preact-router';

import Header from './molecules/header';
import Container from './atoms/container';
import Main from './pages/main';
import init from '../utils/init';
import {DEFAULT_LINE_WEIGHT, STATUS} from '../utils/const';
import Record from './pages/record';
import DetailRecord from './pages/detail-record';
import CharInfo from './pages/charinfo';
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
      lineWeight: DEFAULT_LINE_WEIGHT,
      kanjiInfo: null,
      sampleImageInfo: null,
    };
    this.currentAchivements = {};
    this.updateScores  = this.updateScores.bind(this);
    this.setMainStatus = this.setMainStatus.bind(this);
    this.setLineWeight = this.setLineWeight.bind(this);
    this.goToMain = this.goToMain.bind(this);
  }

  componentDidMount() {
    doAjax('/api/init', {}, (result) => {
      const achieve = summarizeAchivements(result.achivements);
      this.setState({
        achivements: achieve,
        kanjiInfo: result.kanjiInfo,
      });
      this.currentAchivements = achieve;
    });
    import('../assets/sample_images.json').then(module => {
      this.setState({sampleImageInfo: module.default});
    });
  }

  updateScores(charCode, score) {
    this.currentAchivements = updateAchivements(
        this.currentAchivements, charCode, score);
    this.setState({achivements: this.currentAchivements});
  }

  setLineWeight(weight) {
    this.setState({lineWeight: weight});
  }
  setMainStatus(mainStatus) {
    this.setState({mainStatus: mainStatus});
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
            kanjiInfo={this.state.kanjiInfo}
            updateScores={this.updateScores}
            mainStatus={this.state.mainStatus}
            setMainStatus={this.setMainStatus}
            lineWeight={this.state.lineWeight}
            setLineWeight={this.setLineWeight}
          />
          <Record path="/record"
            achivements={this.state.achivements}
            goToMain={this.goToMain}
          />
          <DetailRecord
            path="/record/detail"
            achivements={this.state.achivements}
            kanjiInfo={this.state.kanjiInfo}
            goToMain={this.goToMain}
          />
          <CharInfo
            path="/charinfo/:charCode"
            sampleImageInfo={this.state.sampleImageInfo}
            achivements={this.state.achivements}
            kanjiInfo={this.state.kanjiInfo}
            goToMain={this.goToMain}
          />
        </Router>
      </Container>
    );
  }
}
