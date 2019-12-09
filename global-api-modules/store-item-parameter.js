const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { execFile } = require("child_process");
const path = require("path");

var app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header = {
    Accept: "application/json"
  };

  next();
});

app.post("/cionapi/storeparameter", (req, res) => {
  var requestParams = req.body;

  var jsonFilePath = path.resolve("./datastore/cion-parameter-datastore.json");
  execFile(
    "json-server",
    ["--watch", jsonFilePath, "--port", "9001"],
    (err, stdout, stderr) => {
      axios({
        url: "http://localhost:9001/configuredParameters",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        data: JSON.stringify(requestParams)
      })
        .then(res => {
          console.log("Parameters stored : " + res);
          res.json({
            status: 200,
            message: "STORED_PARAMS"
          })
        })
        .catch(err => {
          console.log("Something went wrong : " + err);
        });
    }
  );
});


module.exports = app;
