/**
  *
  * Format and send request to Watson Conversation service
  *
  * @param {object} params - the parameters.
  * @param {string} params.username - default parameter, must be set. The username for Conversation service.
  * @param {string} params.password - default parameter, must be set. The password for Conversation service.
  * @param {string} params.workspace_id - default parameter, must be set. The workspace_id for Conversation service.
  * @param {string} params.input - input text to be sent to Conversation service.
  * @param {string} params.context - context to be sent with input to Converastion service.
  *
  * @return {object} the JSON of Conversation's response.
  *
  */
const assert = require('assert');
const watson = require('watson-developer-cloud');
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

function main(params) {
  return new Promise(function(resolve, reject){
    assert(params, 'params cannot be null');
    assert(params.text, 'params.text cannot be null');
    assert(params.tones, 'params.tones cannot be null');

    var toneAnalyzer = new ToneAnalyzerV3({
      username: '3d039a11-6b3e-4b7e-8c08-d602e9fe9c7d', 
      password: 'YcPLqF6uspga', 
      version_date: '2017-09-21'
    });        

    toneAnalyzer.tone({
      text: params.text,
      tones: params.tones
    }, function(err, data) {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

module.exports.main = main;
