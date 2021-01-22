const mongoose = require("mongoose");

const MessagesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    topic: {
      type: String
     
    },
    
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessagesSchema);
