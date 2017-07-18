var spells = require("./spells");
var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(newSessionHandlers, startStateHandlers, spellBookHandlers);
    alexa.execute();
};

var applicationString = {
    "OPEN_SPELL_BOOK": "Welcome to the Pathfinder Spellbook." +
        "Please ask a question such as \'look up mage hand\' or \'find dancing lights\'."
}

var SPELL_BOOK_STATES = {
    OPEN: "_OPENMODE",
    SEARCH: "_SEARCHMODE"
}

var newSessionHandlers = {
    "LaunchRequest": function () {
        this.handler.state = SPELL_BOOK_STATES.OPEN;
        this.emitWithState("OpenSpellBook", true);
    }
};

var startStateHandlers = Alexa.CreateStateHandler(SPELL_BOOK_STATES.OPEN, {
    "OpenSpellBook": function (newSpell) {
        var speechOutput = "Welcome to the Pathfinder Spellbook." +
            "Please ask a question such as \'look up mage hand\' or \'find dancing lights\'.";
        this.handler.state = SPELL_BOOK_STATES.SEARCH;
        this.emit(':tell', speechOutput);
    }
});

var spellBookHandlers = Alexa.CreateStateHandler(SPELL_BOOK_STATES.SEARCH, {
    "OneshotSpellIntent": function () {
        handleUserAsk.call(this);
    }
});

function handleUserAsk() {
    var spellSlotIsValid = isSpellSlotValid(this.event.request.intent);
    var speechOutput = "";
    var speechOutputAnalysis = "";

}

function isSpellSlotValid(intent) {
    var spellSlotFilled = intent && intent.slots && intent.slots.Spell && intent.slots.Spell.value;
    return spellSlotFilled;
}
