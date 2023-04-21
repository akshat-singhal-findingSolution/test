const mongoose = require("mongoose");

// connect

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Aksh06:hello01@monodb-demo.gqo3qa3.mongodb.net/income-expense-app?retryWrites=true&w=majority"
    );
    console.log("DB connected successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

dbConnect();
