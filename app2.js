const express = require("express");
const path = require("path");
const swagRoute = require("./Routes/swagRoute");
const travelRoute = require('./Routes/travelRoute');
const mysql2 = require("mysql2");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride("_method"))
app.set("views", path.join(__dirname, "views"));

app.use("/swag", swagRoute);
app.use("/travel", travelRoute);

// use : 모든 method 요청에 대해서
// 라우트 X : 모든 경로 (위에 해당하지 않는 경로)
app.use((req, res) => {
  res.status(404).send("404 Not Found");
})

app.listen(3000, () => {
  console.log(__dirname); // __dirname은 현재 디렉토리에 해당하는 절대경로 - path.join(__dirname, 'views')를 사용하면 경로 지정자에 상관없이 폴더를 만들어줌
  console.log("conntected!");
});
