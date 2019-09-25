'use strict'

// use require with a reference to bundle the file and use it in this file
const events = require('./game/events.js')
const authEvents = require('./auth/events.js')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#0').on('click', events.onTakeTurn)
  $('#1').on('click', events.onTakeTurn)
  $('#2').on('click', events.onTakeTurn)
  $('#3').on('click', events.onTakeTurn)
  $('#4').on('click', events.onTakeTurn)
  $('#5').on('click', events.onTakeTurn)
  $('#6').on('click', events.onTakeTurn)
  $('#7').on('click', events.onTakeTurn)
  $('#8').on('click', events.onTakeTurn)
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
})
