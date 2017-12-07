#!/bin/bash
for i in {1..2000}
do
   curl -o $i.json 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=a31b5a02d9b87ec3591054850f601a5f&curPage='$i'&itemPerPage=1&openStartDt=2016&openEndDt=2017'
done
