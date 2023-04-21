const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  loanId: {
    type: Number,
    required: true,
  },
  borrowers: [
    {
      pairId: {
        type: Number,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
  ],
});

const loanModel = mongoose.model("Loan", loanSchema);

module.exports = loanModel;
