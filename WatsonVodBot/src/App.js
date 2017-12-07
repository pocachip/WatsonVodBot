import React, { Component } from 'react';
import './App.css';
import Conversation from './Conversation.js';
import DiscoveryResult from './DiscoveryResult.js';


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      context: {},
      // A Message Object consists of a message[, intent, date, isUser]
      messageObjectList: [],
      discoveryNumber: 0,
      toneNumber: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.callWatson('hello');

  }
 
  callTone(message) {
    const ToneGetTokenUrl ="https://openwhisk.ng.bluemix.net/api/v1/web/pocachip1_pocachip/conversation-with-discovery-openwhisk/toneanalyzer.json";

    const requestJson = JSON.stringify({
      text: message,
      tones: 'emotion'
    });

    return fetch(ToneGetTokenUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: requestJson
      }
    ).then((response) => {
      if(!response.ok) {
        throw response;
      }
      return(response.json());
    })
      .then((responseJson) => {
        responseJson.date = new Date();
        this.handleTone(responseJson);
      }).catch(function(error) {
        throw error;
      });
  }

  callWatson(message) {
    const watsonApiUrl = process.env.REACT_APP_API_URL;
    const requestJson = JSON.stringify({
      input: {
        text: message
      },
      context: this.state.context
    });

    return fetch(watsonApiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: requestJson
      }
    ).then((response) => {
      if(!response.ok) {
        throw response;
      }
      return(response.json());
    })
      .then((responseJson) => {
        responseJson.date = new Date();
        this.handleResponse(responseJson);
      }).catch(function(error) {
        throw error;
      });
  }

  handleTone(responseJson) {
      var toneName = responseJson.document_tone.tones[0].tone_name;
      var toneScore = responseJson.document_tone.tones[0].score;
      this.addMessage( { label: 'Tone Analyzer Result:', message: '당신의 감정:'+toneName+'('+toneScore+')', date: (new Date()).toLocaleTimeString()});
  }

  handleResponse(responseJson) {
    if(responseJson.hasOwnProperty('output') && responseJson.output.hasOwnProperty('action') && responseJson.output.action.hasOwnProperty('call_discovery')) {
      this.addMessage( { label: 'Discovery Result:', message: 'Great question. Here\'s what I found:', date: (new Date()).toLocaleTimeString()});
      this.formatDiscovery(responseJson.output.discoveryResults);
            
    } else {
      const outputMessage = responseJson.output.text.filter(text => text).join('\n');
      const outputIntent = responseJson.intents[0] ? responseJson.intents[0]['intent'] : '';
      const outputDate = responseJson.date.toLocaleTimeString();
      const outputContext = responseJson.context;
      this.setState({
        context: outputContext
      });
      const msgObj = {
        position: 'left',
        label: outputIntent,
        message: outputMessage,
        date: outputDate,
        hasTail: true
      };
      this.addMessage(msgObj);
    }
  }

  addMessage(msgObj) {
    this.setState({
      messageObjectList: [ ...this.state.messageObjectList , msgObj]
    });
  }

  handleSubmit(e) {
    const inputMessage = e.target.value;
    const inputDate = new Date();
    const formattedDate = inputDate.toLocaleTimeString();
    const msgObj = {
      position: 'right',
      message: inputMessage,
      date: formattedDate,
      hasTail: true
    };
    this.addMessage(msgObj);
    e.target.value = '';
    console.log('%s', inputMessage);

    this.callTone(inputMessage);
    this.callWatson(inputMessage);
  }

  formatDiscovery(resultArr) {
    resultArr.map(function(result, index) {
      const formattedResult = <DiscoveryResult key={'d' + this.state.discoveryNumber + index} movieNm={result.movieNm} movieNmEn={result.movieNmEn} nationAlt={result.nationAlt} genreAlt={result.genreAlt} directors={result.directors} companyNm={result.companyNm} openDt={result.openDt} url={'http://www.imdb.com/find?ref_=nv_sr_fn&q=The+Battleship+Island&s=all'+result.movieNmEn} />;
      this.addMessage({ message: formattedResult });
    }.bind(this));
        
    this.setState({
      discoveryNumber: this.state.discoveryNumber + 1
    });
    return(true);
  }

  scrollToBottom() {
    const element = document.getElementsByClassName('conversation__messages')[0];
    element.scrollTop = element.scrollHeight;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }


  render() {
    return(
      <div className="app-wrapper">
        <p className="conversation__intro">
         VOD Recommandation Bot by 서강MOT, IBM Watson Conversation Discovery Tone Analyzer 
        </p>

        <Conversation
          onSubmit={this.handleSubmit}
          messageObjectList={this.state.messageObjectList}
        />
      </div>
    );
  }
}

export default App;
