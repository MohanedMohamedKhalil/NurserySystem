const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  // _id: { type: mongoose.Types.ObjectId },
  fullname: String,
  password: String,
  email: { type: String, required: true, unique: true },
  image: String,
  isAdmin: Boolean,
});

mongoose.model("Teacher", schema); // Set Collection
