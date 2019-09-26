'use strict'

const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields.js')

const onTakeTurn = function (event) {
  event.preventDefault()
  console.log(event.target.id)
}
const onNewGame = function (event) {
  event.preventDefault()
  api.newGame()
    .then(ui.onNewGameSuccess)
    .catch(ui.onNewGameFailure)
  console.log('new game')
}

let currentPlayer = 'x'
const changePlayer = function () {
  if (currentPlayer === 'x') {
    currentPlayer = 'o'
  } else {
    currentPlayer = 'x'
  }
}

const onClickBoard = function (event) {
  event.preventDefault()
const index = $()
  api.updateGame()
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
  if ($(event.target).text() === '') {
    $(event.target).text(currentPlayer)
    changePlayer()
  } else {
    console.log('theres an x here already')
  }
}

// 1. if (we have a game) {}
// 2. if (game is not over) {}
// 3. if (the cell is empty) {}
// 4. figure out which cell was clicked
// 5. update our gameboard array
// 6. check for a win or tie
// 7. update API sending a. index b. currentPlayer (x or o) c. game over true or false
// 8. change player

module.exports = {
  onTakeTurn,
  onNewGame,
  onClickBoard,
  changePlayer,
  currentPlayer
}
