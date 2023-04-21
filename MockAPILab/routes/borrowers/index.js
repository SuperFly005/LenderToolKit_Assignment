const express = require("express");
const router = express.Router();
const loanModel = require("../../models/loan");

// PATCH a borrower
router.patch("/:loanId/:pairId", (req, res) => {
  loanModel
    .findById(req.params.loanId)
    .then((loanObject) => {
      // Find the borrower to update
      const borrowerToUpdate = loanObject.borrowers.find(
        (borrower) => borrower.pairId === parseInt(req.params.pairId)
      );

      // Update the borrower
      borrowerToUpdate.firstName = req.body.firstName;
      borrowerToUpdate.lastName = req.body.lastName;
      borrowerToUpdate.phone = req.body.phone;

      // Save the loan object
      loanObject
        .save()
        .then(() => res.json("Borrower updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE a borrower
router.delete("/:loanId/:pairId", (req, res) => {
  loanModel
    .findById(req.params.loanId)
    .then((loanObject) => {
      // Find the borrower to delete
      const borrowerToDelete = loanObject.borrowers.find(
        (borrower) => borrower.pairId === parseInt(req.params.pairId)
      );

      // Remove the borrower
      loanObject.borrowers.splice(
        loanObject.borrowers.indexOf(borrowerToDelete),
        1
      );

      // Save the loan object
      loanObject
        .save()
        .then(() => res.json("Borrower deleted!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
