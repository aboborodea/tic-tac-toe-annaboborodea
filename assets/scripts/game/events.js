'use strict'
const store = require('../store')
const api = require('./api.js')
const ui = require('./ui.js')

// -----------------------------------------------------------------------import

let cells = ['', '', '', '', '', '', '', '', '']
let someoneWins = false
const checkIfWinner = function () {
  if (cells[0] === 'x' && cells[1] === 'x' && cells[2] === 'x') {
    someoneWins = true
    console.log('win')
    return 'player x has won!'
  } else if (cells[3] === 'x' && cells[4] === 'x' && cells[5] === 'x') {
    someoneWins = true
    return 'player x won!'
  } else if (cells[6] === 'x' && cells[7] === 'x' && cells[8] === 'x') {
    someoneWins = true
    return 'player x won!'
  } else if (cells[0] === 'x' && cells[3] === 'x' && cells[6] === 'x') {
    someoneWins = true
    return 'player x won!'
  } else if (cells[1] === 'x' && cells[4] === 'x' && cells[7] === 'x') {
    someoneWins = true
    return 'player x won!'
  } else if (cells[2] === 'x' && cells[5] === 'x' && cells[8] === 'x') {
    someoneWins = true
    return 'player x won!'
  } else if (cells[0] === 'x' && cells[4] === 'x' && cells[8] === 'x') {
    someoneWins = true
    return 'player x won!'
  } else if (cells[2] === 'x' && cells[4] === 'x' && cells[6] === 'x') {
    someoneWins = true
    return 'player x won!'
  } else if (cells[0] === 'o' && cells[1] === 'o' && cells[2] === 'o') {
    someoneWins = true
    return 'player o has won!'
  } else if (cells[3] === 'o' && cells[4] === 'o' && cells[5] === 'o') {
    someoneWins = true
    return 'player o won!'
  } else if (cells[6] === 'o' && cells[7] === 'o' && cells[8] === 'o') {
    someoneWins = true
    return 'player o won!'
  } else if (cells[0] === 'o' && cells[3] === 'o' && cells[6] === 'o') {
    someoneWins = true
    return 'player o won!'
  } else if (cells[1] === 'o' && cells[4] === 'o' && cells[7] === 'o') {
    someoneWins = true
    return 'player o won!'
  } else if (cells[2] === 'o' && cells[5] === 'o' && cells[8] === 'o') {
    someoneWins = true
    return 'player o won!'
  } else if (cells[0] === 'o' && cells[4] === 'o' && cells[8] === 'o') {
    someoneWins = true
    return 'player o won!'
  } else if (cells[2] === 'o' && cells[4] === 'o' && cells[6] === 'o') {
    someoneWins = true
    return 'playerx o won!'
  } else {
    return -1
  }
}
// -----------------------------------------------------------to check if winner

const changePlayer = function () {
  if (store.currentPlayer === 'x') {
    store.currentPlayer = 'o'
  } else {
    store.currentPlayer = 'x'
  }
}
// ----------------------------------------------------------------change player

const onNewGame = function (event) {
  // event.preventDefault()
  console.log('new-game')
  $('.game-button').text('')
  store.currentPlayer = 'x' // reset current player back to x
  someoneWins = false // reset game over to false
  cells = ['', '', '', '', '', '', '', '', '']
  api.newGame()
    .then(ui.onNewGameSuccess)
    .catch(ui.onNewGameFailure)
  // console.log('new game')
}

const onClickBoard = function (event) {
  if ($(event.target).text() === '' && !someoneWins) { // if cell is empty and not someone wins
    const index = $(event.target).attr('data-index') // set index to number 0-8
    const value = store.currentPlayer // set value to x or o
    console.log('index is', index)
    $(event.target).text(store.currentPlayer) // change cell text to x or o
    cells[index] = store.currentPlayer // update local array
    const winningMessage = checkIfWinner() // returns player X or player o has won
    const boardFull = checkIfBoardFull()
    if (someoneWins === true) { // if someone wins is true
      console.log('WIN')
      console.log(winningMessage)
      $('#message').text(winningMessage) // change the text to the winning message
    } else if (boardFull === true) { // else, if board full
      $('#message').text("it's a tie!") // update message to 'tie'
    }
    $(event.target).text(store.currentPlayer)
    console.log('TEST')
    api.updateGame(index, value, (someoneWins || boardFull))
      .then(ui.onUpdateGameSuccess)
      .catch(ui.onUpdateGameFailure)
    console.log('responseData is')
    changePlayer()
    if (!someoneWins) { // if someone wins is not true
      $('#message').html(`it's ${store.currentPlayer}'s turn`) // display 'players turn'
    }
  } else if (checkIfBoardFull()) {
    $('#message').html('board full!')
  } else if ($(event.target).text() !== '') {
    $('#message').html('invalid move!')
    console.log('theres an x/o here already')
  }
}
// ---------------------------------------------------everytime board is clicked

const checkIfBoardFull = function () {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === '') {
      return false
    }
  }
  console.log('the gameboard is true')
  return true
}
// ----------------------------------------------------to check if board is full

const onGetGamesHistory = function (event) {
  event.preventDefault()
  console.log('hello')
}

module.exports = {
  onNewGame,
  onClickBoard,
  changePlayer,
  checkIfWinner,
  checkIfBoardFull,
  onGetGamesHistory
}
