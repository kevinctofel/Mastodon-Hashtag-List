const express = require('express');
const app = express();

app.listen(3000, () => console.log('Listening at port 3000'));

require('dotenv').config();
const Mastodon = require('mastodon-api');
const mastoStream = new Mastodon({
  access_token: process.env.AUTH_TOKEN,
  api_url: 'https://hachyderm.io/api/v1/',
});
const datastore = require('nedb');
const db = new datastore('./database.db');
db.loadDatabase();

const listener = mastoStream.stream('streaming/public');

app.get('/', function (req, res) {

  listener.on('message', msg => {

    if (msg.event === 'update' && msg.data.tags !== []) {
      
        console.log(msg.event, msg.data.uri, typeof msg.data.tags, msg.data.tags);
        db.insert(msg.data.tags);
    
  }})
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


