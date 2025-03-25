const express = require("express");
const path = require("path");
const swagRoute = require("./Routes/swagRoute");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

const travelList = ["뉴욕", "빠리", "내집", "도쿄"];

app.get('/', (req, res) => {
    
});

app.get('/travel', (req, res) => {
    res.render('travel', {travelList});
})

app.use('/swag',  swagRoute);

app.listen(3000, () => {
    console.log(__dirname); // __dirname은 현재 디렉토리에 해당하는 절대경로 - path.join(__dirname, 'views')를 사용하면 경로 지정자에 상관없이 폴더를 만들어줌
    console.log("conntected!")
})