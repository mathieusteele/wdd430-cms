const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  maxMessageId: { type: Number, required: true },
  maxContactId: { type: Number, required: true },
  maxDocumentId: { type: Number, required: true },
});

module.exports = mongoose.model("Sequence", sequenceSchema);
