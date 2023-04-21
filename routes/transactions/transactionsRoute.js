const express = require("express");
const {
  createTransactionCtrl,
  getTransactionsCtrl,
  getTransactionCtrl,
  deleteTransactionCtrl,
  updateTransactionCtrl,
} = require("../../controllers/transactions/transactionCtrl");
const isLogin = require("../../middlewares/isLogin");

const transactionsRoute = express.Router();

// post/api/v1/transactions

transactionsRoute.post("/", isLogin, createTransactionCtrl);

// get/api/v1/transactions

transactionsRoute.get("/", getTransactionsCtrl);

// get/api/v1/transactions/:id

transactionsRoute.get("/:id", getTransactionCtrl);

// delete/api/v1/accounts

transactionsRoute.delete("/:id", deleteTransactionCtrl);

// put/api/v1/transactions/:id

transactionsRoute.put("/:id", updateTransactionCtrl);

module.exports = transactionsRoute;
