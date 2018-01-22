/**
 * Card Manager Service
 * This Service is used to add/remove stackable cards in the UI
 */
var Observable = require('FuseJS/Observable');
var cards = Observable();
var cardNames = Observable();
var cardIndex = 0;
var isMainChatExpanded = Observable(true);
var lastCard = cards.last();
var countObservable = cards.count();
var isShowCardHandle = Observable(true);

/**
 * Add new card to the end of the stack
 */
function pushCard(name, args) {
    if (!cardNames.contains(name)) {
        // to track cards by name, we should not have two
        // cards with the same name in the stack
        cardNames.add(name);
        cards.add({
            name: name,
            args: args,
            index: cardIndex,
            yOffset: 16 * cardIndex,
            zOffset: cardIndex
        });
        cardIndex += 1;
    }
}

/**
 * Remove latest card from the end of the stack
 */
function popCard() {
    if (cards.length === 0) {
        return;
    }
    var removeIndex = cards.length - 1;
    cards.removeAt(removeIndex);
    cardNames.removeAt(removeIndex);
    cardIndex -= 1;
}

/**
 * Returns all available cards in the stack
 */
function getCards() {
    return cards;
}

/**
 * Returns observable which represents the expanded/collapsed state of the main chat
 */
function getIsMainChatExpanded() {
    return isMainChatExpanded;
}

function collapseMainChat() {
    if (isMainChatExpanded.value) {
        isMainChatExpanded.value = false;
    }
}

function expandMainChat() {
    if (!isMainChatExpanded.value) {
        isMainChatExpanded.value = true;
    }
}

/**
 * Returns number of cards in the card manager
 */
function count() {
    return cards.length;
}

/**
 * Returns observable, which is always becomes last item in the card manager
 */
function getLastCard() {
    return lastCard;
}

function contains(name) {
    return cardNames.contains(name);
}

function getCountObservable() {
    return countObservable;
}

/**
 * Remove all cards from the card manager
 */
function clear() {
    cards.clear();
}

// Set/Get CardHandle when brand chat is full height
function setIsShowCardHandle(isShow) {
    isShowCardHandle.value = isShow;
}

function getIsShowCardHandle() {
    return isShowCardHandle;
}

module.exports = {
    pushCard: pushCard,
    popCard: popCard,
    getCards: getCards,
    getIsMainChatExpanded: getIsMainChatExpanded,
    expandMainChat: expandMainChat,
    collapseMainChat: collapseMainChat,
    count: count,
    getCountObservable: getCountObservable,
    getLastCard: getLastCard,
    // Check if card with given name exist in card manager
    contains: contains,
    clear: clear,
    setIsShowCardHandle: setIsShowCardHandle,
    getIsShowCardHandle: getIsShowCardHandle
}