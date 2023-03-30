const express = require('express');
const app = express();

app.listen(3000, () => console.log('Listening at port 3000'));

// app.get('/', (req, res) => {
//   res.send('Hachyderm.io status stream'
// )});

require('dotenv').config();
const Mastodon = require('mastodon-api');
const mastoStream = new Mastodon({
  access_token: process.env.AUTH_TOKEN,
  api_url: 'https://hachyderm.io/api/v1/',
});
const datastore = require('nedb');
const db = new datastore('./database.db');
db.loadDatabase();

// function readChunks(reader) {
//   return {
//       async* [Symbol.asyncIterator]() {
//           let readResult = await reader.read();
//           while (!readResult.done) {
//               yield readResult.value;
//               readResult = await reader.read();
//           }
//       },
//   };
// }


const listener = mastoStream.stream('streaming/public/local');

app.get('/', function (req, res) {

  listener.on('message', msg => {

    if (msg.data.tags.length > 0) {
      
        console.log(msg.event, msg.data.tags);
        db.insert(msg.data.tags);
      // };

      // for (const tag in msg.data.tags) {
      //   console.log(tag, tag['name']);
      //   db.insert(tag);
      // res.write(tag['name']) // write to HTML?
    }
  })
})

// console.log(msg.data.tags); 
// db.insert({status: msg.data.content}); // write to a local db file
// res.write(msg.data.tags)
// msg.render('../index', Document.getElementById('statuses').appendChild(msg.data.content));
// const reader = response.body.getReader();
// for (const chunk of readChunks(msg)) {
//     console.log(`received chunk of size ${chunk.length}`);
// write `${msg.data.content}` to a web page);
// }});

listener.on('error', err => console.log(err));


// app.use(express.static('public'));
// app.use(express.json());

// app.get('/status', (req, res) => {
//   // res.json({test: 123});
//   db.find({}, function (err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//     res.data;
//     }
//   });
// });
