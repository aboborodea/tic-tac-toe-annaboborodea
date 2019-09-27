'use strict'
const store = require('../store')
const gameEvents = require('./events')

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
  successMessage(`Created new game successfully! It's ${store.currentPlayer}'s turn!`)
  store.game = responseData.game
}

const onNewGameFailure = function () {
  failureMessage('New game not created.')
}

const onUpdateGameSuccess = function (responseData) {
  successMessage(gameEvents.currentPlayer + 'its your turn!')
  store.game = responseData.game
  console.log(store.game)
}

const onUpdateGameFailure = function (responseData) {
  failureMessage('Sign out failed')
}

module.exports = {
  onNewGameSuccess,
  onNewGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure
}
