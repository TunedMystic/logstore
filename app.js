const express = require('express');
const bodyParser = require('body-parser');

const store = require('./db/store');

const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// Parse json
app.use(bodyParser.json());


app.get('/logs', (request, response) => {
  store.getLogs().then((items) => {
    response.json(items);
  });
});

app.post('/logs', (request, response) => {
  const data = request.body;
  store.addLog(data).then((item) => {
    response.json(item);
  });
});

app.listen(process.env.PORT || 3000);
