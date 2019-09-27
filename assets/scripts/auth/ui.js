'use strict'

// require store object so that we can save the user and their token
const store = require('../store')
const gameApi = require('../game/api.js')
const gameUi = require('../game/ui.js')

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

const onSignUpSuccess = function () {
  successMessage('Signed up successfully!')
}

const onSignUpFailure = function () {
  failureMessage('Sign up failed')
}

const onSignInSuccess = function (responseData) {
  successMessage('Signed in successfully!')
  console.log('responseData is', responseData)
  // save the 'user' we got from the API inside of 'store'
  // so we can use it later from any file
  store.user = responseData.user
  console.log('store is', store)
  gameApi.newGame()
    .then(onNewGameSuccess)
    .catch()
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
