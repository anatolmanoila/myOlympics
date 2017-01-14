"use strict";
let express = require('express');
let app = express();
let mongoUtil = require('./mongoUtil');
mongoUtil.connect();

app.use(express.static(__dirname + '/../client'));

app.get('/sports', (req, res) => {
  let sports = mongoUtil.sports();
  sports.find().toArray((err, docs) => {
    console.log(JSON.stringify(docs));
    let sportNames = docs.map((sport) => sport.name);
    res.json(sportNames);
  });
});

app.listen(5000, () => console.log('listening on http://localhost:5000'));
