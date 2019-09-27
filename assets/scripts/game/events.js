'use strict'
const store = require('../store')
const api = require('./api.js')
const ui = require('./ui.js')

const cells = ['', '', '', '', '', '', '', '', '']

// to start a new game
const onNewGame = function (event) {
  event.preventDefault()
  api.newGame()
    .then(ui.onNewGameSuccess)
    .catch(ui.onNewGameFailure)
  console.log('new game')
}

const onTakeTurn = function (event) {
  event.preventDefault()
  console.log(event.target.id)
}

const onClickBoard = function (event) {
  event.preventDefault()
  const index = $(event.target).attr('data-index')
  const value = store.currentPlayer
  if ($(event.target).text() === '') {
    $(event.target).text(store.currentPlayer)
    changePlayer()
    // update API sending index, current player, game over (true or false)
    api.updateGame(index, value)
      .then(ui.onUpdateGameSuccess)
      .catch(ui.onUpdateGameFailure)
  } else {
    console.log('theres an x here already')
  }
}

// to change player
const changePlayer = function () {
  if (store.currentPlayer === 'x') {
    store.currentPlayer = 'o'
  } else {
    store.currentPlayer = 'x'
  }
}

// to check winning combonations
const checkWinner = function () {
  if (cells[0] === 'x' && cells[1] === 'x' && cells[2] === 'x') {
    return 'Player X has won!'
  } else if (cells[3] === 'x' && cells[4] === 'x' && cells[5] === 'x') {
    return 'Player X won!'
  } else if (cells[6] === 'x' && cells[7] === 'x' && cells[8] === 'x') {
    return 'Player X won!'
  } else if (cells[0] === 'x' && cells[3] === 'x' && cells[6] === 'x') {
    return 'Player X won!'
  } else if (cells[1] === 'x' && cells[4] === 'x' && cells[7] === 'x') {
    return 'Player X won!'
  } else if (cells[2] === 'x' && cells[5] === 'x' && cells[8] === 'x') {
    return 'Player X won!'
  } else if (cells[0] === 'x' && cells[4] === 'x' && cells[8] === 'x') {
    return 'Player X won!'
  } else if (cells[2] === 'x' && cells[4] === 'x' && cells[6] === 'x') {
    return 'Player X won!'
  }
  if (cells[0] === 'o' && cells[1] === 'o' && cells[2] === 'o') {
    return 'Player O has won!'
  } else if (cells[3] === 'o' && cells[4] === 'o' && cells[5] === 'o') {
    return 'Player O won!'
  } else if (cells[6] === 'o' && cells[7] === 'o' && cells[8] === 'o') {
    return 'Player O won!'
  } else if (cells[0] === 'o' && cells[3] === 'o' && cells[6] === 'o') {
    return 'Player O won!'
  } else if (cells[1] === 'o' && cells[4] === 'o' && cells[7] === 'o') {
    return 'Player O won!'
  } else if (cells[2] === 'o' && cells[5] === 'o' && cells[8] === 'o') {
    return 'Player O won!'
  } else if (cells[0] === 'o' && cells[4] === 'o' && cells[8] === 'o') {
    return 'Player O won!'
  } else if (cells[2] === 'o' && cells[4] === 'o' && cells[6] === 'o') {
    return 'Player O won!'
  }
}
// check if board is full function
const boardFull = function () {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === '') {
      return false
    }
  }
  return true
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
  checkWinner
}
