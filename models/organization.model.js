const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Org name must be unique
      trim: true
    },
    apiKeys: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);
