const API_AI_TOKEN = process.env.API_AI_TOKEN;  //your Dialogflow Client Access Token
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN; //your Facebook Page Access Token
const request = require('request');

const sendTextMessage = (senderId, text) => {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    headers: {
      'Content-Type': 'application/json'
    },
    qs: {
      access_token: FACEBOOK_ACCESS_TOKEN
    },
    method: 'POST',
    json: {
      messaging_type: "UPDATE",
      recipient: { id: senderId },
      message: { text: text }
    }
  }, (error) => {
    if (error)
      console.log('Error sending messages to Facebook: ', error)
  });
};

module.exports = (event) => {
  const senderId = event.sender.id;
  const message = event.message.text;
  const apiaiSession = apiAiClient.textRequest(message, { sessionId: 'total-poc-bot' });
  apiaiSession.on('response', (response) => {
    const result = response.result.fulfillment.speech;
    sendTextMessage(senderId, result);
  });
  apiaiSession.on('error', error => console.log('Error on apiaiSession: ' + error));
  apiaiSession.end();
};