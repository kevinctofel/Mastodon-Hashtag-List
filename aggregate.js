/*
Create an empty array
Read through the .db file
For each name key, check to see if we have that key in an array.
If we do, add one to key counter
if we do not, create a key counter and assign the value one.

*/
const fs = require("fs");
let hashtags = [];
let tags = [];

function getCount(arr) {
  let found = {};
  for (let i = 0; i < 5; i++) {
    found[arr[i]] = (found[arr[i]] || 0) + 1;
  }
  for (keys in found) {
    console.log(found);
  }
}

fs.open("./database.db", "r", (err, fd) => {
  if (err) {
    console.log(`There is an error reading the file: ${err}`);

    throw err;
  }
});

fs.readFile("./database.db", "UTF-8", (err, data) => {
  {
    if (err) throw err;
    data = data.split("\n");
    for (let i = 0; i < data.length - 1; i++)
      hashtags.push(JSON.parse(data[i]));
    for (let i = 0; i < hashtags.length; i++) {
      console.log(hashtags[i]["name"]);
    }
    getCount(hashtags);
  }
});
