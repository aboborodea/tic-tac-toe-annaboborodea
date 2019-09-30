'use strict'

// use require with a reference to bundle the file and use it in this file
const authEvents = require('./auth/events.js')
const gameEvents = require('./game/events.js')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#new-game').on('submit', gameEvents.onNewGame)
  $('.game-button').on('click', gameEvents.onClickBoard)
  $('#get-games-history').on('click', gameEvents.onGetGamesHistory)
  $('#clear-game-board').on('click', gameEvents.onClearGameBoard)
})
