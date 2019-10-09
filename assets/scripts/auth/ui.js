'use strict'

// require store object so that we can save the user and their token
const store = require('../store')
const gameApi = require('../game/api.js')
const gameUi = require('../game/ui.js')

const successMessage = function (newText) {
  $('#message').text(newText)
}

const failureMessage = function (newText) {
  $('#message').text(newText)
}

const onSignUpSuccess = function () {
  successMessage('signed up successfully!')
  $('#sign-up').trigger('reset')
}

const onSignUpFailure = function () {
  failureMessage('sign up failed')
  $('#sign-up').trigger('reset')
}
// response Data is information back from the server (a user with email id and token)
const onSignInSuccess = function (responseData) {
  successMessage('signed in successfully!')
  // save the 'user' we got from the API inside of 'store'
  // so we can use it later from any file
  store.user = responseData.user // save the data from the server to your local
  $('#new-game').show()
  $('.game-button').show()
  $('#get-games-history').show()
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#sign-out').show()
  $('#sign-in').trigger('reset')
  $('#change-password').show()
  gameApi.newGame()
    .then(gameUi.onNewGameSuccess)
    .catch(gameUi.onNewGameFailure)
}

const onSignInFailure = function () {
  failureMessage('sign in failed')
}

const onChangePasswordSuccess = function () {
  successMessage('changed password successfully!')
  $('#change-password').trigger('reset')
}

const onChangePasswordFailure = function () {
  failureMessage('change password failed')
  $('#change-password').trigger('reset')
}

const onSignOutSuccess = function () {
  $('.game-button').text('')
  $('#new-game').hide()
  $('.game-button').hide()
  $('#get-games-history').hide()
  $('#sign-up').show()
  $('#sign-in').show()
  $('#change-password').hide()
  $('#total-games').text('')
  successMessage('signed out successfully!')
}

const onSignOutFailure = function () {
  failureMessage('sign out failed')
}
module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure
}
