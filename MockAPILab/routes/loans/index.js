const express = require("express");
const router = express.Router();
const loanModel = require("../../models/loan");

// GET all loan objects
router.get("/", (req, res) => {
  loanModel
    .find()
    .then((loanObjects) => res.json(loanObjects))
    .catch((err) => res.status(400).json("Error: " + err));
});

// GET one loan object
router.get("/:id", (req, res) => {
  loanModel
    .findById(req.params.id)
    .then((loanObject) => res.json(loanObject))
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST a loan object
router.post("/", (req, res) => {
  const { borrowers } = req.body;
  const loanObject = new loanModel({ borrowers });

  loanObject
    .save()
    .then(() => res.json("Loan Object added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE a loan object
router.delete("/:id", (req, res) => {
  loanModel
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Loan Object deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
