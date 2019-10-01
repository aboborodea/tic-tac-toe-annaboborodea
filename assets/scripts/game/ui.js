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
  console.log('created new game')
  successMessage(`you created a new game! it's ${store.currentPlayer}'s turn!`)
  store.game = responseData.game
}

const onNewGameFailure = function () {
  failureMessage('New game not created.')
}

const onUpdateGameSuccess = function (responseData) {
  console.log('update game success')
  successMessage(gameEvents.currentPlayer + 'its your turn!')
  console.log('update success response', responseData)
  store.game = responseData.game
  console.log(store.game)
}

const onUpdateGameFailure = function (responseData) {
  failureMessage('Update failed')
  console.log('fail')
}

module.exports = {
  onNewGameSuccess,
  onNewGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure
}
