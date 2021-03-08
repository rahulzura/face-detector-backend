const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  email: {
    type: Schema.Types.String,
    required: true,
    index: {unique: true}
  },
  password: {
    type: Schema.Types.String,
    required: true,
    index: true
  },
  imageCount: {
    type: Schema.Types.Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model("user", userSchema);
