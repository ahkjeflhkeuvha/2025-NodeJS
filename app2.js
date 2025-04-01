const express = require("express");
const path = require("path");
const swagRoute = require("./Routes/swagRoute");
const mysql2 = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

console.log(__dirname);

const db = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("fail : " + err);
  }
  console.log("success");
});

app.get("/", (req, res) => {});

app.get("/travel", (req, res) => {
  let travelList;
  const query = "SELECT id, name FROM travelList";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: "error" });
      return;
    }
    travelList = results;
    console.log(travelList);
    res.render("travel", { travelList });
  });
  // res.status(200).json({ message : 'success'});
});

app.get("/travel/:id", (req, res) => {
  const travelId = req.params.id;
  const _query = "SELECT * FROM travelList WHERE id = ?";
  db.query(_query, [travelId], (err, results) => {
    if (err) {
      res.status(500).send("Internal SErver Error");
    }
    if (results.length == 0) {
      res.status(404).send("No Data");
    }
    const travel = results[0];
    res.render("travelDetail", { travel });
  });
});

app.use("/swag", swagRoute);

app.listen(3000, () => {
  console.log(__dirname); // __dirname은 현재 디렉토리에 해당하는 절대경로 - path.join(__dirname, 'views')를 사용하면 경로 지정자에 상관없이 폴더를 만들어줌
  console.log("conntected!");
});
