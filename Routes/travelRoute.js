const express = require("express");
const router = express.Router();
const db = require("../database");
const path = require("path");
const Travel = require("../travelModel");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

router.get("/", async (req, res) => {
  try {
    const results = await Travel.findAll();
    const travelList = results;
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
    const results = await Travel.findByPk(travelId);
    console.log(results.dataValues)
    if (results.length === 0) {
      res.status(404).send("No data");
      return;
    }
    const travel = results.dataValues;
    res.render("travelDetail", { travel });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internet Server Error")
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    await Travel.create({
      name: name,
    });

    res.redirect("/travel");
  } catch (e) {
    console.log(e);
    res.status(500).send("Internet Server Error")

  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const travelId = req.params.id;
    const results = await Travel.findByPk(travelId);
    const travel = results.dataValues
    res.render("editTravel", { travel })
  } catch (e) {
    console.log(e);
    res.status(500).send("Internet Server Error")

  }
});

router.put("/:id/edit", async (req, res) => {
  try {
    const travelId = req.params.id;
    const { name } = req.body;

    await Travel.update(
      {name:name},
      { where: { id: travelId } }
    );
    res.render("updateSuccess");
  } catch (e) {
    console.log(e);
    res.status(500).send("Internet Server Error")

  }
});

router.delete("/:id", async (req, res) => {
  try {
    const travelId = req.params.id;
    const travel = await Travel.findByPk(travelId);
    await travel.destroy();
    res.render("deleteSuccess");
  } catch(e) {
    console.log(e)
    res.status(500).send("Internet Server Error")

  }
});

module.exports = router;
