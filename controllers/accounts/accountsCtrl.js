const Account = require("../../model/Account");
const User = require("../../model/User");
const { appErr, AppErr } = require("../../utils/appErr");

//create
const createAccountCtrl = async (req, res, next) => {
  const { name, initialBalance, accountType, notes } = req.body;
  try {
    // 1. find the logged in user

    const userFound = await User.findById(req.user);
    // console.log(userFound);
    if (!userFound) {
      return next(appErr("User not found", 404));
    }
    // 2. Create the account

    const account = await Account.create({
      name,
      initialBalance,
      accountType,
      notes,
      createdBy: req.user,
    });

    // 3. Push the account into users accounts field

    userFound.accounts.push(account._id);
    // 4. resave the user

    await userFound.save();
    res.json({
      status: "success",
      data: account,
      msg: "create route",
    });
  } catch (error) {
    // res.json(error);
    next(new AppErr(error.message, 500));
  }
};

//all
const getAccountsCtrl = async (req, res, next) => {
  try {
    const accounts = await Account.find().populate("transactions");
    res.json(accounts);
    // res.json({ msg: "get account route" });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//single
const getAccountCtrl = async (req, res, next) => {
  try {
    // find the id from params
    console.log(req.params.id);
    const { id } = req.params;
    const account = await Account.findById(id).populate("transactions");
    console.log(req.params.id);

    res.json({
      status: "success",
      data: account,
      msg: "get account route",
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//delete
const deleteAccountCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Account.findByIdAndDelete(id);

    return res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//update
const updateAccountCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;

    const account = await Account.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      status: "success",
      data: account,
      msg: "update route",
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createAccountCtrl,
  getAccountCtrl,
  deleteAccountCtrl,
  updateAccountCtrl,
  getAccountsCtrl,
};
