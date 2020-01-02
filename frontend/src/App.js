import React from 'react';

/* import material UI components */
import { Container }  from '@material-ui/core';
import Box            from '@material-ui/core/Box';

/* import third party libraries */
import axios from 'axios';

/* import components */
import Header from './components/Header';
import HandwritingCanvas from './components/HandwritingCanvas';

import ResultsSelection from './components/ResultsSelection';
import ScoreDisplay from './components/ScoreDisplay';



const AJAX_URL = '/api/predict';
const NUM_DISP = 6;


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentStatus: 0, // 0: writing, 1: selecting, 2: showing score
      ajaxResults: {
        predicted: [],
      },
      imageBlob: null,
      selected: {
        kana: '',
        score: '',
        prob: '',
      },
    }
    this.onScore = this.onScore.bind(this);
    this.goBackHome = this.goBackHome.bind(this);
    this.selectKana = this.selectKana.bind(this);

  }

  onScore(image_blob) {
    this.setState({
      currentStatus: 1,
      imageBlob: image_blob
    });
    const form = new FormData();
    form.append('uploadfile', image_blob)
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    };
    axios.post(AJAX_URL, form, config)
      .then(response => {
        const resData = response.data;
        this.setState({
          ajaxResults: {
            predicted: resData.predicted,
          },
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  goBackHome() {
    this.setState({currentStatus: 0, ajaxResults: {predicted: []}});
  }

  selectKana(kanaCode) {
    let prob = 0.0;
    for (const [kana, p] of this.state.ajaxResults.predicted) {
      if (kana === kanaCode) {
        prob = p;
        break;
      }
    }
    // 1 - ( x - 1)**4
    // 1 - (-x + 1)**3
    // 1 - ( x - 1)**2
    //const score = (1.0 -  (prob - 1) ** 4) * 100.0;
    //const score = (1.0 - (-prob + 1) ** 3) * 100.0;
    //const score =  (- ((1.0 - prob) ** (1 / 3) - 1)) * 100.0
    //const score = (-((1.0 - prob) ** (1 / 2)) + 1) * 100.0;
    console.log((1.0 -  (prob - 1) ** 4) * 100.0);
    console.log((1.0 - (-prob + 1) ** 3) * 100.0);
    console.log( (- ((1.0 - prob) ** (1 / 2) - 1)) * 100.0);
    console.log( (- ((1.0 - prob) ** (1 / 3) - 1)) * 100.0);
    const score = (-((1.0 - prob) ** (1 / 3) - 1)) * 100.0;
    this.setState({
      currentStatus: 2,
      selected: {
        kana: String.fromCharCode(parseInt(kanaCode, 16)),
        prob: prob,
        score: parseInt(score),
      },
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Container
          maxWidth='xs'
        >
          <Box>
            {this.state.currentStatus === 0 ? (
              <HandwritingCanvas
                onScore={this.onScore}
              />
            ) : this.state.currentStatus === 1 ? (
              <ResultsSelection
                predicted={this.state.ajaxResults.predicted.slice(0, NUM_DISP)}
                imageBlob={this.state.imageBlob}
                onSelectKana={this.selectKana}
              />
            ) : (
              <ScoreDisplay
                chara={this.state.selected.kana}
                score={this.state.selected.score}
                imageBlob={this.state.imageBlob}
                onClickBack={this.goBackHome}
              />
            )}
          </Box>
        </Container>
      </div>
    );
  }
}


export default App;
