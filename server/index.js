require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
console.log(client)
const PORT = 3001

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.post('/api/messages', (req, res) => {
  console.log(req.body.test)
  // res.send(JSON.stringify({ message: req.body.message }))
  // return
  res.header('Content-Type', 'application/json');
  client.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: req.body.to,
    body: req.body.message,
  })
  .then(() => {
    res.send(JSON.stringify({ success: true }));
  })
  .catch(err => {
    console.log('error here', err);
    res.send(JSON.stringify({ success: false }));
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
