require("dotenv").config();
const Mastodon = require("mastodon-api");
const mastoStream = new Mastodon({
  access_token: process.env.AUTH_TOKEN,
  api_url: "https://hachyderm.io/api/v1/",
});
const datastore = require("nedb");
const db = new datastore("database.db");
db.loadDatabase();

const listener = mastoStream.stream("streaming/public/local");

listener.on("message", (msg) => {
  console.log(msg.data.content);
  db.insert({ status: msg.data.content });
});

listener.on("error", (err) => console.log(err));

//   try {
//     const tagList = await getTags();
//     res.write('Most recent tags are: ' + JSON.stringify(tagList) + '\n');
//   }
//   catch (error) {
//     console.log(error);
//   }

//   // res.end(JSON.stringify(tagList));
//   res.end('All done!')
// });

// const getTimeline = async () => {

//   let headersList = {
//     "Accept": "*/*",
//     "User-Agent": "Thunder Client (https://www.thunderclient.com)"
//   }

//   let response = await fetch("https://hachyderm.io/api/v1/timelines/public?limit=20", {
//     method: "GET",
//     headers: headersList
//   });

//   let data = await response.json();
//   //  console.log(data);
//   return data;
// }

// const getTags = async (req, res) => {
//   let data = await getTimeline();
//   let statuses = JSON.stringify(data);
//   // console.log(`Got the data!`);
//   let tagList = [];
//   for (let index = 0; index < data.length; index++) {
//     if (data[index].tags[0] === undefined) continue;
//     // console.log(data[index].tags[0].name);
//     tagList.push(data[index].tags[0].name);
//   }
//   console.log(tagList);
//   return tagList;
// }
