const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid"); // to Auto Generate ID

const generateId = async () => {
  let id;
  do {
    id = customAlphabet("1234567890", 2)();
  } while (+id == 0 || (await mongoose.models.Class.findOne({ _id: id }))); // to prevent duplication and zero value
  return id;
};

const schema = new mongoose.Schema({
  _id: Number,
  name: String,
  supervisor: { type: mongoose.Types.ObjectId, ref: "Teacher" },
  children: [{ type: Number, ref: "Child" }],
});

// Set the default value of the _id field to a generated ID
schema.pre("save", async function () {
  if (!this._id || this._id == 0) {
    this._id = await generateId();
  }
});

mongoose.model("Class", schema);
