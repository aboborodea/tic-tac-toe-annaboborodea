'use strict'

// use require with a reference to bundle the file and use it in this file
const events = require('./game/events.js')
const authEvents = require('./auth/events.js')
const gameEvents = require('./game/events.js')

let player = 'x'

// use require without a reference to ensure a file is bundled
// require('./example')

// if square 0 on the board is equal to x, don't log
$(() => {
  $('.board-button').on('click', function () {
    if ($(event.target).text() === '') {
      // place the player on the page
      $(event.target).text('x')
    } else {
      console.log('spot is not empty')
    }
  })
  // how to switch from x to o
  // if player is x , then switch to player o. if player is not x, then it must have been o and then you put an x on the board
  // how can we keep track of the player?
  // create a variable for the current player (that can change)


  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#new-game').on('submit', gameEvents.onNewGame)
})

// create an empty array
// const gameBoard = ['', '', '', '', '', '', '', '', '']

// add click event to 9 blocks

// for even moves, select x and for odd moves select y
