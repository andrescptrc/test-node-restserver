const mongoose = require("mongoose");

const MONGODB_CNN = process.env.MONGODB_CNN;

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGODB_CNN);

    console.log("Database online");
  } catch (error) {
    console.log(error);
    throw new Error("Database error");
  }
};

module.exports = { dbConnection };
