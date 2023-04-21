const express = require("express");
const {
  registerUserCtrl,
  userLoginCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
} = require("../../controllers/users/usersCtrl");
const isLogin = require("../../middlewares/isLogin");
const usersRoute = express.Router();

// post/api/v1/users/register

usersRoute.post("/register", registerUserCtrl);

// post/api/v1/users/login

usersRoute.post("/login", userLoginCtrl);

// get/api/v1/users/profile

usersRoute.get("/profile", isLogin, userProfileCtrl);

// delete/api/v1/users

usersRoute.delete("/", isLogin, deleteUserCtrl);

// put/api/v1/users (updating)

usersRoute.put("/", isLogin, updateUserCtrl);

module.exports = usersRoute;
