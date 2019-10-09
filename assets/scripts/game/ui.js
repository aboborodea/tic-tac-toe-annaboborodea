'use strict'
const store = require('../store')

const successMessage = function (newText) {
  $('#message').text(newText)
  $('#message').removeClass('failure')
  $('#message').addClass('success')
}

const failureMessage = function (newText) {
  $('#message').text(newText)
  $('#message').removeClass('success')
  $('#message').addClass('failure')
}

const onNewGameSuccess = function (responseData) {
  successMessage(`you created a new game! it's ${store.currentPlayer}'s turn!`)
  store.game = responseData.game
}

const onNewGameFailure = function () {
  failureMessage('New game not created.')
}

const onUpdateGameSuccess = function (responseData) {
  if (store.someoneWins === false && store.boardFull === false) {
    successMessage(store.currentPlayer + ' its your turn!')
  }
  store.game = responseData.game
}

const onUpdateGameFailure = function (responseData) {
  failureMessage('Update failed')
}

const historySuccessful = function (responseData) {
  $('#total-games').text(responseData.games.length)
}

const historyFailure = function (responseData) {
  failureMessage('Get games history failed')
}

module.exports = {
  onNewGameSuccess,
  onNewGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  historySuccessful,
  historyFailure
}
