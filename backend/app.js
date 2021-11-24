const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Document = require("../server/models/document");
const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.post("/api/documents", (req, res, next) => {
  const document = new Document({
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
  });

  document.save().then((newDocument) => {
    console.log(newDocument);
    res
      .status(201)
      .json({ message: "document created", documentId: newDocument._id });
  });
  console.log(document);
});

app.delete("/api/documents/:id", (req, res, next) => {
  console.log(req.params.id);
  Document.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "post deleted" });
  });
});

app.get("/api/documents", (req, res, next) => {
  Document.find()
    .then((documents) => {
      console.log(documents);
      res.status(200).json({ message: "posts fetched", posts: posts });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = app;
