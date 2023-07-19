const express = require("express");
const app = express();
let statuses;
let tags = [];
const { Transform } = require("stream");

app.listen(3001, () => console.log("Listening at port 3001"));

require("dotenv").config();
const Mastodon = require("mastodon-api");
const mastoStream = new Mastodon({
  access_token: process.env.AUTH_TOKEN,
  api_url: "https://hachyderm.io/api/v1/",
});
const datastore = require("nedb");
const db = new datastore("./database.db");
db.loadDatabase();

const listener = mastoStream.stream("streaming/public");

app.get("/", function (req, res) {
  listener.on("message", (msg) => {
    if (msg.event === "update" && msg.data.tags !== []) {
      console.log(msg.event, msg.data.uri, msg.data.tags);
      // if (msg.data.tags.length > 1) {
      //   msg.data.tags = msg.data.tags.flat();
      // }
      db.insert(msg.data.tags);

      // statuses += msg.data.tags;
      // // console.log(statuses);
      // db.insert(msg.data.tags);
      // db.insert(",");
      // tags.push(JSON.stringify(msg.data.tags));
    }

    // console.log(tags);
  });
});

listener.on("error", (err) => console.log(err));
