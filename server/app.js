"use strict";
let express = require('express');
let app = express();
let mongoUtil = require('./mongoUtil');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
mongoUtil.connect();

app.use(express.static(__dirname + '/../client'));

app.get('/sports', (req, res) => {
  let sports = mongoUtil.sports();
  sports.find().toArray((err, docs) => {
    if(err) {
      res.sendStatus(400);
    }
    console.log(JSON.stringify(docs));
    let sportNames = docs.map((sport) => sport.name);
    res.json(sportNames);
  });
});


app.get('/sports/:name', (req, res) => {
  let sportName = req.params.name;
  let sports = mongoUtil.sports();

  sports.find({ name: sportName }).limit(1).next((err, doc) => {
    if(err) {
      res.sendStatus(400);
    }
    //console.log('Sport doc: ', doc);
    res.json(doc);
  });
});

app.post('/sports/:name/medals', jsonParser, (req, res) => {
  let sportName = req.params.name;
  let newMedal  = req.body.medal;

  console.log("Sport name: ", sportName );
  console.log("Medal: ", newMedal);

  res.sendStatus(201);
});

app.listen(5000, () => console.log('listening on http://localhost:5000'));
