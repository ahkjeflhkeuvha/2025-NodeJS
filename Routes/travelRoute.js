const express = require("express");
const router = express.Router();
const db = require("../database");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

router.get("/", async (req, res) => {
  try {
    const query = "SELECT id, name FROM travelList";
    const results = await db.query(query);
    const travelList = results[0];
    console.log(travelList)
    res.render("travel", { travelList });
  } catch(e) {
    console.log(e)
  }
  // res.status(200).json({ message : 'success'});
});

router.get("/add", (req, res) => {
  res.render("addTravel");
});

router.get("/:id", async (req, res) => {
  try {
    const travelId = req.params.id;
    const _query = "SELECT * FROM travelList WHERE id = ?";
    const results = await db.query(_query, [travelId]);
    const travel = results[0];
    res.render("travelDetail", { travel });
  } catch (e) {
    console.log(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const query = "INSERT INTO travelList (name) VALUES (?)";

    await db.query(query, [name]);
    res.redirect("/travel");
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const travelId = req.params.id;
    const _query = "SELECT * FROM travelList WHERE id = ?";
    const results = await db.query(_query, [travelId]);
    const travel = results[0][0]
    console.log(travel)
    res.render("editTravel", { travel })
  } catch (e) {
    console.log(e);
  }
});

router.put("/:id/edit", async (req, res) => {
  try {
    const travelId = req.params.id;
    const { name } = req.body;
    const _query = "UPDATE travelList SET name = ? WHERE id = ?";
    await db.query(_query, [name, travelId]);
    res.render("updateSuccess");
  } catch (e) {
    console.log(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const travelId = req.params.id;
    const _query = "DELETE FROM travelList WHERE id = ?";
    await db.query(_query, [travelId]);
    res.render("deleteSuccess");
  } catch(e) {
    console.log(e)
  }
});

module.exports = router;
