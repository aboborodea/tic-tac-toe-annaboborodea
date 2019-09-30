'use strict'

// require store object so that we can save the user and their token
const store = require('../store')
const gameApi = require('../game/api.js')
const gameUi = require('../game/ui.js')

const successMessage = function (newText) {
  $('#message').text(newText)
  // $('#message').removeClass('failure')
  // $('#message').addClass('success')
}

const failureMessage = function (newText) {
  $('#message').text(newText)
  // $('#message').removeClass('success')
  // $('#message').addClass('failure')
}

const onSignUpSuccess = function () {
  successMessage('Signed up successfully!')
}

const onSignUpFailure = function () {
  failureMessage('Sign up failed')
}
// response Data is information back from the server (a user with email id and token)
const onSignInSuccess = function (responseData) {
  successMessage('Signed in successfully!')
  // console.log('responseData is', responseData)
  // save the 'user' we got from the API inside of 'store'
  // so we can use it later from any file
  store.user = responseData.user // save the data from the server to your local
  // console.log('store is', store)
  $('#new-game').show()
  $('.game-button').show()
  $('#get-games-history').show()
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#change-password').hide()
  gameApi.newGame()
    .then(gameUi.onNewGameSuccess)
    .catch(gameUi.onNewGameFailure)
}

const onSignInFailure = function () {
  failureMessage('Sign in failed')
}

const onChangePasswordSuccess = function () {
  successMessage('Changed password successfully!')
}

const onChangePasswordFailure = function () {
  failureMessage('Change password failed')
}

const onSignOutSuccess = function () {
  successMessage('Signed out successfully!')
  $('#sign-out').hide()
}

const onSignOutFailure = function () {
  failureMessage('Sign out failed')
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
