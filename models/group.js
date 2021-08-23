const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const groupSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a title"],
    maxlength: [40, "name cannot be more than 40 characters"],
  },
  members: { type: Array, default: [] },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.models.Group || model("Group", groupSchema);
