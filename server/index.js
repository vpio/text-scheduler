require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const cron = require('node-cron')
const PORT = 3001

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.post('/api/messages', (req, res) => {
  if (req.body.selectedTime && req.body.to && req.body.message){
    console.log('heres the cron time: ', req.body.selectedTime)
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify({ success: true }))
    cron.schedule(req.body.selectedTime, () => {
      client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: req.body.to,
        body: req.body.message,
      })
      .then(() => {
        console.log('message sent')
      })
      .catch(err => {
        console.log('message failed', err);
      });
    })
  } else { res.send({ success: false })}


});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
