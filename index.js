var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {

    'OneshotSpellIntent': function () {
        this.emit(':tell', 'Hello World!');
    }

};
