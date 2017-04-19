var express = require('express'),
  slackBot = require('slackbots'),
  bodyParser = require('body-parser'),
  cBotbot = require('cleverbot-node');

var app = express(),
  port = 3000,
  cleverBot = new cBot;
  cleverBot.configure({botapi: "APIKEY"});

var bot = new slackBot({
    token: 'APIKEY',
    name: 'BOTNAME'
});

//On message, return cleverbot API awnser
bot.on('message', function(message) {
  var messages = [];

  if(message.type == 'message'
    && typeof message.deleted_ts == "undefined"
    && message.username != "BOTNAME"
  ){
    cleverBot.write(message.text, function (response) {
      bot.postMessageToChannel('general', response.output);
    });
  }
});

app.use(bodyParser.json());

//Default port 3000
app.listen(port, function(){
  console.log("Listening to port:" + port);
});
