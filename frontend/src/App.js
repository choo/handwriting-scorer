import React from 'react';

/* import material UI components */
import { Container }  from '@material-ui/core';
import Grid           from '@material-ui/core/Grid';

/* import third party libraries */
import axios from 'axios';

/* import components */
import Header from './components/Header';
import HandwritingCanvas from './components/HandwritingCanvas';
import ResultsModal  from './components/ResultsModal';



const AJAX_URL = '/api/predict';
const NUM_DISPLAY = 4;


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
    this.showResults = this.showResults.bind(this);
    this.closeResults = this.closeResults.bind(this);
    this.selectKana = this.selectKana.bind(this);

  }

  showResults(image_blob) {
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

  closeResults() {
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
    const score =  (-((1.0 - prob) ** (1/2)) + 1) * 100.0
    this.setState({
      currentStatus: 2,
      selected: {
        kana: String.fromCharCode(parseInt(kanaCode, 16)),
        //prob: prob.toFixed(4),
        prob: prob,
        score: score.toFixed(2),
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
          <Grid container justify = "center">
            <HandwritingCanvas
              onUpdateCanvas={this.showResults}
            />
            <ResultsModal
              currentStatus={this.state.currentStatus}
              close={this.closeResults}
              predicted={this.state.ajaxResults.predicted.slice(0, NUM_DISPLAY)}
              imageBlob={this.state.imageBlob}
              onSelectKana={this.selectKana}
              selected={this.state.selected}
            />
          </Grid>
        </Container>
      </div>
    );
  }
}


export default App;
