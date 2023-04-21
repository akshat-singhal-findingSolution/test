const express = require("express");
const cors = require("cors");
require("./config/dbConnect");
const usersRoute = require("./routes/users/usersRoute");
const accountRoute = require("./routes/accounts/accountRoute");
const transactionsRoute = require("./routes/transactions/transactionsRoute");
const globalErrHandler = require("./middlewares/globalErrHandler");
const app = express();

// middlewares

app.use(express.json()); // pass incoming data

// cors middleware
app.use(cors());
// routes

// users routes

// post/api/v1/users/register

app.use("/api/v1/users", usersRoute);

// account routes

app.use("/api/v1/accounts", accountRoute);

// transaction routes

app.use("/api/v1/transactions", transactionsRoute);

// error handlers

app.use(globalErrHandler);

// listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is up and running on ${PORT}`));
