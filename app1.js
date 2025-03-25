// express 모듈을 불러옵니다.
const express = require('express');
const swagRoute = require('./Routes/swagRoute');

// express 애플리케이션을 생성합니다.
const app = express();
app.use(express.json()); // json 요청을 받을 수 있도록 설정
app.use('/swag', swagRoute);

// 서버가 리스닝할 포트를 설정합니다.
const port = 3000;
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
