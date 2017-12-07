import React from 'react';
import './DiscoveryResult.css';

function DiscoveryResult(props) {
  return (
    <div className="result">
      <div className="result__title">{props.movieNm}({props.movieNmEn})</div>
      <div className="result__preview">제작국가:{props.nationAlt} 장르:{props.genreAlt}</div>
      <div className="result__preview">감독:{props.directors} 제작사:{props.companyNm} 오픈일:{props.openDt}</div>
      <div><a href={props.Url}>상세보기</a></div>
    </div> 
  );
}

export default DiscoveryResult;
