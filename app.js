const util = require('util');

const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

const store = require('./db/store');

const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// Parse json
app.use(bodyParser.json());
app.use(expressValidator());


app.get('/logs', (request, response) => {
  store.getLogs().then((items) => {
    response.json(items);
  });
});

app.post('/logs', (request, response) => {
  console.log('before assertions');
  request.checkBody('text', 'Text is required').notEmpty();
  request.getValidationResult().then((result) => {
    if(!result.isEmpty()) {
      // debugger;
      response.status(400).json({error: result.array()});
      // response.status(400).json({error: util.inspect(result.array())});
    }
    else {
      const data = request.body;
      store.addLog(data).then((item) => {
        response.json(item);
      });
    }
  });
  console.log('after assertions');
});

app.listen(process.env.PORT || 3000);
