var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3000;

var Cleverbot = require('cleverbot-node');
    cleverbot = new Cleverbot;
    cleverbot.configure({botapi: "APIKEY"});

var Bot = require('slackbots');
var settings = {
    token: 'APIKEY',
    name: 'Hybrid Pepper'
};
var bot = new Bot(settings);

/*bot.on('start', function() {
    var users = bot.getUsers();
    var userCount = users._status - 1;
    for(var i = 0; i <= userCount; i++){ <- gets members name
        console.log(users._value.members[i].name);
    }
});*/

bot.on('message', function(message) {
  var messages = [];

  if(message.type == 'message'
    && typeof message.deleted_ts == "undefined"
    && message.username != "Hybrid Pepper"
  ){
    cleverbot.write(message.text, function (response) {
      bot.postMessageToChannel('general', response.output);
    });
  }
});

app.use(bodyParser.json());

app.listen(port, function(){
  console.log("Listening to port:" + port);
});
