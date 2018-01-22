var Observable = require('FuseJS/Observable');
var Environment = require('FuseJS/Environment');
var CardManager = require('Services/CardManagerService');
var userInput = Observable();
var chatVisibility = Observable('Visible');
var cardManagerVisibility = Observable('Hidden');
var cardsCountObservable = CardManager.getCountObservable();
var cards = CardManager.getCards();
var topPadding = Observable(0);
var bottomPadding = Observable(0);
var isChatSizeMeasured = false;
var chatHalfMargin = Observable(300);
var chatCollapseMargin = Observable(580);

cardsCountObservable.onValueChanged(module, function (count) {
    if (count === 0) {
        setTimeout(function () {
        	chatVisibility.value = 'Visible';
            cardManagerVisibility.value = 'Hidden';
        }, 400);
    } else {
        chatVisibility.value = 'Hidden';
        cardManagerVisibility.value = 'Visible';
    }
});

function checkEnvironment() {
    if(Environment.android) {
        topPadding.value = -11;
        bottomPadding.value = 11;
    }
}
checkEnvironment();

function onSendBtnClick() {
	setTimeout(function () {
        chatVisibility.value = 'Hidden';
        cardManagerVisibility.value = 'Visible';
    }, 600);
    setTimeout(function () {
        CardManager.pushCard('LocationCard', null);
    }, 700);
}

function chatPlaced(args) {
    if (isChatSizeMeasured || args.height == 0) {
        return;
    }
    isChatSizeMeasured = true;
    chatCollapseMargin.value = Math.round(args.height - 45);
    chatHalfMargin.value = Math.round(args.height / 2);
}

var chatState = 2; // expanded

function onChatExpand() {
    //console.log('onChatExpand');
    if (chatState >= 2) {
        return;
    }

    chatState += 1;
    setChatState(chatState);
    
    // cardManagerVisibility.value = 'Visible';
}

function onChatCollapse() {
   // console.log('onChatCollapse');
    if (chatState <= 0) {
        return;
    }

    chatState -= 1;
    setChatState(chatState);

    // cardManagerVisibility.value = 'Hidden';
}

function setChatState(stateIndex) {
    switch (stateIndex) {
        case 2:
           chatCardStates.goto(Expanded);
           //console.log('Expanded');
           break;
       case 1:
           chatCardStates.goto(Half);
           //console.log('Half');
           break;
       case 0:
           chatCardStates.goto(Collapsed);
          // console.log('Collapsed');
           break;
       default:
           console.log('Undefined chatCardState value in MapPage.ux');
    }
}

module.exports = {
	userInput: userInput,
	onSendBtnClick: onSendBtnClick,
	cards: cards,
	chatVisibility: chatVisibility,
	cardManagerVisibility: cardManagerVisibility,
	topPadding: topPadding,
	bottomPadding: bottomPadding,
	onChatExpand: onChatExpand,
	onChatCollapse: onChatCollapse,
	chatHalfMargin: chatHalfMargin,
	chatCollapseMargin: chatCollapseMargin
}