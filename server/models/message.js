const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  id: { type: String, required: true },
  subject: { type: String, required: true },
  msgText: { type: String, required: false },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
});

module.exports = mongoose.model("Message", messageSchema);
