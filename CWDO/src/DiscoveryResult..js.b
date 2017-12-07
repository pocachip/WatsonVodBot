import React from 'react';
import './DiscoveryResult.css';

function DiscoveryResult(props) {

  return (
    <div className="result">
      <div className="result__title">{props.movieNm}({props.movieNmEn})</div>
      <div className="result__title">{props.nationAlt}</div>
      <div className="result__title">장르: {props.genreAlt}</div>
      <div className="result__title">제작자: {props.directors}</div>
      <div className="result__preview">오픈일: {props.openDt}</div>
    </div>
  );
}

export default DiscoveryResult;
