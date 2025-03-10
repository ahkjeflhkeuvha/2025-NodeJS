// http 모듈을 가져옵니다.
const http = require('http');

// 서버를 생성합니다.
const server = http.createServer((req, res) => {
  // HTTP 응답 헤더를 설정합니다.
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  // 응답 본문을 작성합니다.
  res.end('Hello, World!\n');
});

// 서버가 포트 3000에서 요청을 기다리게 합니다.
server.listen(3000, 'localhost', () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
