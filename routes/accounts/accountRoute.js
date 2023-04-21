const express = require("express");
const {
  getAccountCtrl,
  createAccountCtrl,
  getAccountsCtrl,
  deleteAccountCtrl,
  updateAccountCtrl,
} = require("../../controllers/accounts/accountsCtrl");
const isLogin = require("../../middlewares/isLogin");
const accountRoute = express.Router();
// post/api/v1/accounts

accountRoute.post("/", isLogin, createAccountCtrl);

// get/api/v1/accounts/:id

accountRoute.get("/:id", getAccountCtrl);

// get/api/v1/accounts

accountRoute.get("/", getAccountsCtrl);

// delete/api/v1/accounts

accountRoute.delete("/:id", deleteAccountCtrl);

// put/api/v1/accounts

accountRoute.put("/:id", updateAccountCtrl);

module.exports = accountRoute;
