/**
  *
  * Format and send request to Watson Discovery service if marked as necessary.
  *
  * @param {object} params - the parameters.
  * @param {string} params.username - default parameter, must be set. The username for Discovery service.
  * @param {string} params.password - default parameter, must be set. The password for Discovery service.
  * @param {string} params.environment_id - default parameter, must be set. The environment_id for Discovery service.
  * @param {string} params.collection_id - default parameter, must be set. The collection_id for Discovery service
  * @param {string} params.input - input text to be sent to Discovery service.
  * @param {string} params.output - the output of the Conversation service results
  *
  * @return {object} the JSON of Discovery's response, or the original JSON if discovery was not called.
  *
  */
const assert = require('assert');
const DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

function main(params) {
  return new Promise(function (resolve, reject) {
    assert(params, 'params cannot be null');
    assert(params.username, 'params.username cannot be null');
    assert(params.password, 'params.password cannot be null');
    assert(params.environment_id, 'params.environment_id cannot be null');
    assert(params.collection_id, 'params.collection_id cannot be null');
    assert(params.input, 'params.input cannot be null');
    assert(params.output, 'params.output cannot be null');

    //Make Discovery request only if Conversation output includes a "call discovery" property
    if(params.output.hasOwnProperty('action') && params.output.action.hasOwnProperty('call_discovery')) {

      var discovery = new DiscoveryV1({
        username: params.username,
        password: params.password,
        version_date: '2016-12-01'
      });
            
      console.log('DiscoveryV! Call!');
      console.log(params.input);

      discovery.query({environment_id: params.environment_id,
        collection_id: params.collection_id,
        query: params.input.text
      }, function(err, data) {
        if (err) {
          return reject(err);
        }

        var i = 0;
        var discoveryResults = [];

        while (data.results[i] && i < 4 ) {
	  let Base = data.results[i].movieListResult.movieList[0];
	  let directors = '';
	  let companyNm = '';
	  if (Base.directors[0]) {
	     directors = Base.directors[0].peopleNm;
          }
	  if (Base.companys[0]) {
	     companyNm = Base.companys[0].companyNm;
          }
          discoveryResults[i] = {
            movieNm: Base.movieNm,
            movieNmEn:Base.movieNmEn,
            nationAlt: Base.nationAlt,
            genreAlt: Base.genreAlt,
            directors: directors,
            companyNm: companyNm,
            openDt: Base.openDt
          };
          
          i++;
        }
        params.output.discoveryResults = discoveryResults;
        var conversationWithData = params;
        delete conversationWithData.username;
        delete conversationWithData.password;
        return resolve(conversationWithData);
      });
    } else {
      let returnJson = params;
      delete returnJson.environment_id;
      delete returnJson.collection_id;
      delete returnJson.username;
      delete returnJson.password;
      return resolve(params);
    }
  });
}

module.exports.main = main;
