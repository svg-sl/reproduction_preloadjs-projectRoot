const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/node/health', (req, res) => {
  console.log("CALLED HEALTH")
  res.send(`Hello World!`)
})

// catch undefined routes and respond with 404
app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

module.exports = app;