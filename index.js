require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const verificaton = require('./controllers/verification');
const messageWebhook = require('./controllers/messageWebhook');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Webhook server is listening, ${PORT}`));
app.get('/', verificaton);
app.post('/', messageWebhook);
