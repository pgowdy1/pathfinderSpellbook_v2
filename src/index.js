var junkForNow = require("./spells"); //Need to fix this and seperate Spells object.
var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(newSessionHandlers, startStateHandlers, spellBookHandlers);
    alexa.execute();
};

var applicationString = {
    "OPEN_SPELL_BOOK": "Welcome to the Pathfinder Spellbook." +
        "Please ask a question such as \'look up mage hand\' or \'find dancing lights\'.",
    "CANCEL_MESSAGE": "I will return the spell book to the library master.",
}

var SPELL_BOOK_STATES = {
    OPEN: "_OPENMODE",
    SEARCH: "_SEARCHMODE"
}

var newSessionHandlers = {
    "LaunchRequest": function () {
        this.handler.state = SPELL_BOOK_STATES.OPEN;
        this.emitWithState("OpenSpellBook", true);
    },
    "AMAZON.StartOverIntent": function() {
        //TODO
    },
    "AMAZON.HelpIntent": function() {
        //TODO
    },
    "Unhandled": function () {
        //TODO
    }
};

var startStateHandlers = Alexa.CreateStateHandler(SPELL_BOOK_STATES.OPEN, {
    "OpenSpellBook": function (newSpell) {
        var speechOutput = "Welcome to the Pathfinder Spellbook. <break time='1s'/> Please ask a question such as \'look up mage hand\' or \'find dancing lights\'.";
        this.handler.state = SPELL_BOOK_STATES.SEARCH;
        this.emit(':ask', speechOutput);
    }
});

var spells =
    {
        daze: "humanoid creature of 4 hd or less loses next action.",
        flare: "dazzles one creature (–1 on attack rolls).",
        light: "object shines like a torch.",
        lullaby: "makes subject drowsy: –5 on perception checks, –2 on will saves against sleep.",
        magehand: "5-pound telekinesis.",
        mending: "makes minor repairs on an object.",
        message: "whisper conversation at distance.",
    };


var spellBookHandlers = Alexa.CreateStateHandler(SPELL_BOOK_STATES.SEARCH, {
    "OneshotSpellIntent": function () {
        handleUserAsk.call(this);
    },
    "DontKnowIntent": function () {
        //TODO
    },
    "AMAZON.StartOverIntent": function () {
        //TODO
    },
    "AMAZON.RepeatIntent": function () {
        //TODO
    },
    "AMAZON.HelpIntent": function () {
        //TODO
    },
    "AMAZON.StopIntent": function () {
        //TODO
    },
    "AMAZON.CancelIntent": function () {
        this.emit(":tell", this.t("CANCEL_MESSAGE"));
    },
    "Unhandled": function () {
        //TODO
    },
    "SessionEndedRequest": function () {
        console.log("Session ended in trivia state: " + this.event.request.reason);
    }
});

function handleUserAsk() {
    var intent = this.event.request.intent;
    var spellSlotIsValid = isSpellSlotValid(intent);
    if(spellSlotIsValid)
    {
        var spellToLookUp = intent.slots.Spell.value;
        var speechOutput = spells[spellToLookUp];
        this.emit(':ask', speechOutput);
    }
    else {
        this.emit(':tell', "Sorry, I couldn't find that spell.");
    }
}

function isSpellSlotValid(intent) {
    var spellSlotFilled = intent && intent.slots && intent.slots.Spell && intent.slots.Spell.value;
    return spellSlotFilled;
}
