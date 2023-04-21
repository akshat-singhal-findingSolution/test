const User = require("../../model/User");
const bcrypt = require("bcryptjs");
const { AppErr, appErr } = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const Transaction = require("../../model/Transaction");

// register

const registerUserCtrl = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  console.log(fullName, email, password);
  try {
    // check if email exist
    const userFound = await User.findOne({ email });

    if (userFound) {
      // return res.json({
      //   message: "User Already Exist",
      // });
      // return next(new Error("User Already Exist"));
      // return next(new AppErr("User Already Exist", 400));
      return next(new AppErr("User Already Exist", 400));
    }
    // check if fields are empty
    if (!email || !fullName || !password) {
      return res.json({
        message: "Please provide all fields",
      });
    }
    // hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "success",
      fullName: user.fullName,
      email: user.email,
      id: user._id,
      msg: "Register Route",
    });
  } catch (error) {
    // res.json(err);
    next(new AppErr(error.message, 500));
  }
};

// login
const userLoginCtrl = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // check if email exist

    const userFound = await User.findOne({ email });

    if (!userFound) {
      // return res.json({
      //   message: "Invalid Login Credentials",
      // });
      return next(appErr("Invalid Login Credentials", 400));
    }

    // check for password validity

    const isPasswordMatch = await bcrypt.compare(password, userFound.password);

    if (!isPasswordMatch) {
      // return res.json({
      //   message: "Invalid Login Credentials",
      // });
      return next(appErr("Invalid Login Credentials", 400));
    }

    res.json({
      status: "success",
      fullName: userFound.fullName,
      id: userFound._id,
      msg: "Login Route",
      token: generateToken(userFound._id),
    });
  } catch (error) {
    // res.json(err);
    next(new AppErr(error.message, 500));
  }
};

// profile

const userProfileCtrl = async (req, res) => {
  // const result = verifyToken(
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzAxNWEzYzFjZmI4ODY3Y2I4ZmFhMCIsImlhdCI6MTY4MDg4NDM4MSwiZXhwIjoxNjgxNzQ4MzgxfQ.WSMZkmr2v8wBMTurdQaMwCB6RwWvgyrzerTpIlDjORs"
  // );
  // console.log(result);
  // how to get token from the header
  // console.log(req.headers);

  // const headerObj = req.headers;
  // const token = headerObj["authorization"].split(" ")[1];
  // // console.log(token);

  // const result = verifyToken(token);
  try {
    const user = await User.findById(req.user).populate({
      path: "accounts",
      populate: {
        path: "transactions",
        model: Transaction,
      },
    });

    // res.json({
    //   msg: "Profile Route",
    // });
    res.json(user);
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

// delete

const deleteUserCtrl = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user);
    return res.status(200).json({
      status: "success",
      data: null,
    });

    res.json({
      msg: "Delete Route",
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

// update

const updateUserCtrl = async (req, res, next) => {
  try {
    // check if email exist

    if (req.body.email) {
      const userFound = await User.findOne({ email: req.body.email });
      if (userFound) {
        return next(
          new AppErr("Email exist or you have already this email", 400)
        );
      }
    }

    // check if user is updating password

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      // update the user

      const user = await User.findByIdAndUpdate(
        req.user,
        {
          password: hashedPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      // send the response

      return res.status(200).json({
        status: "Success",
        data: user,
      });
    }
    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });
    // send the response
    res.status(200).json({
      status: "Success",
      data: user,
    });

    res.json({
      msg: "Update Route",
    });
  } catch (error) {
    // res.json(err);
    next(new AppErr(error.message, 500));
  }
};
module.exports = {
  registerUserCtrl,
  userLoginCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
};
