"use strict";
let express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client'));


app.get('/sports', (req, res) => {
  res.json(['AquaDance', 'Abs'])
});

app.listen(5000, () => console.log('listening on http://localhost:5000'));
