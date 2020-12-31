var http = require('http');
var fs = require('fs');
var url = require('url');
var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url,true).query;
  console.log(queryData.id);
  if(_url== '/'){

  }
  response.writeHead(200);
  var template = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>게시판-강의평가</title>
      <style>
        body{
          display:grid;
          grid-template-areas:
        }
        a{
          color:black;
          text-decoration:none;
        }
        h2{
          text-align: center;
        }
        header{
          border:3px gray solid;
          margin:20px
          padding:20px;
          float:left,right;
          height:100px;
        }
        header ul li{
          float:left;
          list-style-type: none;
          margin:20px;
          padding:5px;
          border:3px solid hotpink;
          font-size:25px;
        }
        article{
          font-size: 15px;
          border:3px solid hotpink;
          background-color: white;
          padding-left: 10px
        }
        .boardSec{
          background-color:pink;
          border:3px solid gray;
          margin:10px;
          padding:10px;
          font-size:20px;
          height:500px;
        }
        .selectSec{
          background-color:pink;
          border:3px solid gray;
          margin:10px;
          padding:10px;
          font-size:20px;
        }
        .selectSec li{
          list-style-type:none;
          margin-bottom: 10px;
        }
        .mainSec{
          display:grid;
          grid-template-columns:300px 2fr;
        }
        .write{
          border:3px solid hotpink;
          margin: 10px;
          background-color: white;
        }

      </style>
    </head>
    <body>
      <header>
        <ul>
          <li style="margin-right:150px;">IT TIME</li>
          <li>
            <a href="">시간표</a>
          </li>
          <li>
            <a href="">과제관리</a>
          </li>
          <li>
            <a href="">게시판</a>
          </li>
          <li>
            <a href="">학점관리</a>
          </li>
          <li>
            <a href="">공지사항</a>
          </li>
        </ul>
      </header>
      <div class="mainSec">
        <div class="selectSec">
          <h2>게시판</h2>
          <ol>
            <li><a href="LectureEvaluationBoard.html">강의 평가 게시판</a></br></li>
            <li><a href="QABoard.html">질문 게시판</a></li>
          </ol>
        </div>
        <div class="boardSec">
          <h2>강의 평가 게시판</h2>
          <form class="search">
            <input type="search" name="keyword" placeholder="과목명, 교수명으로 검색" class="keyword" autocomplete="off" style="width:90%; height:35px; margin:10px;">
            <input type="submit" class="submit" value="검색" style="width:5%;height:35px;margin-right:10px">
          </form>
          <p><span class="write"><a href="">글쓰기</a></span></p>
          <div class="board">
            <article>
              <a href="">
                <h3>컴퓨터프로그래밍의기초 : 홍득조</h3>
                <p class="rate">
                  <span class="star">⭐⭐⭐⭐⭐</span>
                </p>
                <p class="info">
                  <span class="semester">18년 1학기 수강자</span>
                </p>
                <p class="text">책 읽어주는 남자</p>
              </a>
            </article>
          </div>
        </div>
      </div>
    </body>
  </html>
`
  console.log(__dirname+url);
  response.end(template);
})
app.listen(3000);
