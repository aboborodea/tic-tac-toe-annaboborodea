'use strict'
const store = require('../store')
const api = require('./api.js')
const ui = require('./ui')

// -----------------------------------------------------------------------import

let cells = ['', '', '', '', '', '', '', '', '']
const checkIfWinner = function () {
  if (cells[0] === 'x' && cells[1] === 'x' && cells[2] === 'x') {
    store.someoneWins = true
    return 'player x has won!'
  } else if (cells[3] === 'x' && cells[4] === 'x' && cells[5] === 'x') {
    store.someoneWins = true
    return 'player x won!'
  } else if (cells[6] === 'x' && cells[7] === 'x' && cells[8] === 'x') {
    store.someoneWins = true
    return 'player x won!'
  } else if (cells[0] === 'x' && cells[3] === 'x' && cells[6] === 'x') {
    store.someoneWins = true
    return 'player x won!'
  } else if (cells[1] === 'x' && cells[4] === 'x' && cells[7] === 'x') {
    store.someoneWins = true
    return 'player x won!'
  } else if (cells[2] === 'x' && cells[5] === 'x' && cells[8] === 'x') {
    store.someoneWins = true
    return 'player x won!'
  } else if (cells[0] === 'x' && cells[4] === 'x' && cells[8] === 'x') {
    store.someoneWins = true
    return 'player x won!'
  } else if (cells[2] === 'x' && cells[4] === 'x' && cells[6] === 'x') {
    store.someoneWins = true
    return 'player x won!'
  } else if (cells[0] === 'o' && cells[1] === 'o' && cells[2] === 'o') {
    store.someoneWins = true
    return 'player o has won!'
  } else if (cells[3] === 'o' && cells[4] === 'o' && cells[5] === 'o') {
    store.someoneWins = true
    return 'player o won!'
  } else if (cells[6] === 'o' && cells[7] === 'o' && cells[8] === 'o') {
    store.someoneWins = true
    return 'player o won!'
  } else if (cells[0] === 'o' && cells[3] === 'o' && cells[6] === 'o') {
    store.someoneWins = true
    return 'player o won!'
  } else if (cells[1] === 'o' && cells[4] === 'o' && cells[7] === 'o') {
    store.someoneWins = true
    return 'player o won!'
  } else if (cells[2] === 'o' && cells[5] === 'o' && cells[8] === 'o') {
    store.someoneWins = true
    return 'player o won!'
  } else if (cells[0] === 'o' && cells[4] === 'o' && cells[8] === 'o') {
    store.someoneWins = true
    return 'player o won!'
  } else if (cells[2] === 'o' && cells[4] === 'o' && cells[6] === 'o') {
    store.someoneWins = true
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
  $('.game-button').text('')
  store.currentPlayer = 'x' // reset current player back to x
  store.someoneWins = false // reset game over to false
  store.boardfull = false
  cells = ['', '', '', '', '', '', '', '', '']
  api.newGame()
    .then(ui.onNewGameSuccess)
    .catch(ui.onNewGameFailure)
}

const onClickBoard = function (event) {
  if ($(event.target).text() === '' && !store.someoneWins) { // if cell is empty and not someone wins
    const index = $(event.target).attr('data-index') // set index to number 0-8
    const value = store.currentPlayer // set value to x or o
    $(event.target).text(store.currentPlayer) // change cell text to x or o
    cells[index] = store.currentPlayer // update local array with a string of x or o
    const winningMessage = checkIfWinner() // returns player X or player o has won
    // const boardFull = checkIfBoardFull()
    if (store.someoneWins === true) { // if someone wins is true
      $('#message').text(winningMessage) // change the text to the winning message
    } else if (checkIfBoardFull() === true) { // else, if board full
      $('#message').text("it's a tie!") // update message to 'tie'
    }
    $(event.target).text(store.currentPlayer)
    // update the api if someoneWins is trie or if checkIfBoard is true
    api.updateGame(index, value, (store.someoneWins || checkIfBoardFull()))
      .then(ui.onUpdateGameSuccess)
      .catch(ui.onUpdateGameFailure)
    changePlayer()
    if (!store.someoneWins) { // if someone wins is not true
      // $('#message').html(`it's ${store.currentPlayer}'s turn`) // display 'players turn'
    }
  } else if (checkIfBoardFull()) {
    $('#message').html('board full!')
  } else if ($(event.target).text() !== '') {
    $('#message').html('invalid move!')
  }
  // enable computer turn button
  $('.computerTurn').prop('disabled', false)
}
// ---------------------------------------------------everytime board is clicked

const onComputerTurn = function () {
  const value = store.currentPlayer // set value to x or o
  console.log(store.game.cells) // the array of cells
  // get a count of number of empty cells to be able to choose from for ai player
  // loop through the array of cells using a loop to create a new array of the indeces of empty cells
  // ie. if game board is completely empty, it will take all of the indeces
  let emptyCells = []
  for (let i = 0; i < cells.length; i++) {
    // if the board at index i is empty, push that index into emptyCells array
    if (cells[i] === '') {
      emptyCells.push(i)
    }
  }
  // randomly pick an empty cell
  // math.random gives you a float between 0 and 1, mulitply by the length of empty cells gives you a float, and then round down with math.floor
  const randIndex = Math.floor(Math.random() * emptyCells.length)
  //change the index in the emptyCells into the index in the Cells
  const randCell = emptyCells[randIndex]
  // start at the table, going through all of the children of the table and find the child with the data-index of the randCell 
  const randomBoardCell = $(".table").find(`[data-index='${randCell}']`)
  // change the text of the cell to 'o'
  randomBoardCell.text(store.currentPlayer)

  // add an o to the global cells array
  cells[randCell] = store.currentPlayer
  // check if winner before sending to the API
  checkIfWinner()
  // update API
  api.updateGame(randCell, value, (store.someoneWins || checkIfBoardFull()))
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
  changePlayer()
  console.log('emptyCells is', emptyCells)
  // disable computer turn button 
  $('.computerTurn').prop('disabled', true)
}

// ---------------------------------------------------onComputerTurn function
const checkIfBoardFull = function () {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === '') {
      store.boardFull = false
      return false
    }
  }
  store.boardFull = true
  return true
}
// ----------------------------------------------------to check if board is full

const onGetGamesHistory = function (event) {
  event.preventDefault()
  api.gamesHistory()
    .then(ui.historySuccessful)
    .catch(ui.historyFailure)
}

module.exports = {
  onNewGame,
  onClickBoard,
  changePlayer,
  checkIfWinner,
  checkIfBoardFull,
  onGetGamesHistory,
  onComputerTurn
}
