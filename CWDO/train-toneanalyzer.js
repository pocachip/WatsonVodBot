#! /usr/bin/env node

'use strict';

require('dotenv');
const fs = require('fs');
const replace = require('replace');
const watson = require('watson-developer-cloud');
const async = require('async');

/**
 * Update the .env file to add workspace Id
 * @param  {Object} params
 * @param  {String} params.regexText
 * @param  {String} params.replacement
 */
var updateEnvProperties= function(params) {
  replace({
    regex: params.regexText,
    replacement: params.replacement,
    paths: ['./.env'],
    recursive: true,
    silent: true
  });
};

process.env.VCAP_SERVICES = process.env.VCAP_SERVICES || fs.readFileSync('./credentials.json', 'utf-8');

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
  username: '3d039a11-6b3e-4b7e-8c08-d602e9fe9c7d', 
  password: 'YcPLqF6uspga', 
  version_date: '2017-09-21'
});

var params = {
  text: 'hello! my name pocahcip! I am so happy now',
  tones: 'emotion'
};

tone_analyzer.tone(params, function(error, response) {
  if (error)
    console.log('error:', error);
  else
    console.log(JSON.stringify(response, null, 2));
  }
);



