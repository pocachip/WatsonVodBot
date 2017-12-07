const action = require('../../actions/discovery');
const assert = require('assert');
const nock = require('nock');

const environment_id = '68c3a2d0-5a83-4220-9c9f-d4b6ed7d9ea0';
const collection_id = 'd140b749-1a90-4500-9f09-c2cfcbfb84e8';
const username = 'ad429bc5-b289-42fa-92b3-5d2b97eba269';
const password = 'ShpOzMunNqQs';
const query_string = '군함도';
var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

var discovery = new DiscoveryV1({
  username: 'ad429bc5-b289-42fa-92b3-5d2b97eba269',
  password: 'ShpOzMunNqQs',
  version_date: '2017-11-07'
});


discovery.query({
	'environment_id': '68c3a2d0-5a83-4220-9c9f-d4b6ed7d9ea0',
        'collection_id' : 'd140b749-1a90-4500-9f09-c2cfcbfb84e8',
        'query' : '군함도'}, function(error, data){
        if(error) {
	  console.log(error);
        } else {
console.log(data.results);
console.log('---------------------');
console.log(data.results[0]);
console.log('---------------------');
console.log(data.results[0].movieListResult);
console.log('---------------------');
console.log(data.results[0].movieListResult.movieList);
console.log('---------------------');
console.log(data.results[0].movieListResult.movieList[0]);
console.log('---------------------');
console.log(data.results[0].movieListResult.movieList[0].movieNm);
console.log('---------------------');
        }
        });
