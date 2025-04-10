const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2')
const path = require("path");
const dotenv = require("dotenv");
dotenv.config()

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

const db = mysql2.createConnection({
    host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
    console.log('db connected!')
})

router.get("/", (req, res) => {
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

  router.get('/add', (req, res) => {
    res.render("addTravel");
  })
  
router.get("/:id", (req, res) => {
    const travelId = req.params.id;
    const _query = "SELECT * FROM travelList WHERE id = ?";
    db.query(_query, [travelId], (err, results) => { // 물음표의 값은 []로 대체됨
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
  
router.post('/', (req, res) => {
    const { name } = req.body;
    const query = "INSERT INTO travelList (name) VALUES (?)";
  
    db.query(query, [name], (err, results) => { // 물음표의 값은 []로 대체됨
      if (err) {
        res.status(500).json("Cannot insert data");
        return;
      } else {
        res.redirect('/travel');
      }
    })
  })
  
router.get("/:id/edit", (req, res) => {
    const travelId = req.params.id;
    const _query = "SELECT * FROM travelList WHERE id = ?";
    db.query(_query, [travelId], (err, results) => { // 물음표의 값은 []로 대체됨
      if (err) {
        res.status(500).send("Internal SErver Error");
      }
      if (results.length == 0) {
        res.status(404).send("No Data");
      }
      const travel = results[0];
      res.render("editTravel", { travel });
    });
  });
  
router.put("/:id/edit", (req, res) => {
    const travelId = req.params.id;
    const { name } = req.body;
    const _query = "UPDATE travelList SET name = ? WHERE id = ?";
    db.query(_query, [name, travelId], (err, results) => { // 물음표의 값은 []로 대체됨
      if (err) {
        console.log(err);
        res.status(500).send("Internal SErver Error");
      }
      const travel = results[0];
      res.render("updateSuccess");
    });
  });
  
router.delete("/:id", (req, res) => {
    const travelId = req.params.id;
    const _query = "DELETE FROM travelList WHERE id = ?";
    db.query(_query, [travelId], (err, results) => { // 물음표의 값은 []로 대체됨
      if (err) {
        console.log(err);
        res.status(500).send("Internal SErver Error");
      }
      const travel = results[0];
      res.render("deleteSuccess");
    });
  });
  


module.exports = router;