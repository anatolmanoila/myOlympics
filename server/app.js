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


app.get('/sports/:name', (req, res) => {
  let sportName = req.params.name;
  console.log('Sport name: ', sportName);

  let sport = {
    "name": "Mountain Biking",
    "goldMedals": [{
      "division": "Men's Sprint",
      "country": "RO",
      "year": 2016
    }, {
      "division": "Men\'s line",
      "country": "MD",
      "year": 2016
    }]
  };

  res.json(sport);
});

app.listen(5000, () => console.log('listening on http://localhost:5000'));
