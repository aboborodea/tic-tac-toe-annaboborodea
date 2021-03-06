'use strict'

// use require with a reference to bundle the file and use it in this file
const authEvents = require('./auth/events.js')
const gameEvents = require('./game/events.js')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#get-games-history').on('click', gameEvents.onGetGamesHistory)
  $('#sign-out').hide()
  $('#new-game').hide()
  $('.game-button').hide()
  $('#get-games-history').hide()
  $('#change-password').hide()
  $('.computerTurn').hide()
  $('.computerTurn').on('click', gameEvents.onComputerTurn)
  $('.computerTurn').prop('disabled', true)
  $('.playYourSelf').on('click', gameEvents.onNewGame)
  $('.playComputer').on('click', gameEvents.onNewGame2)
  $('.playYourSelf').hide()
  $('.playComputer').hide()
})

