'use strict'
const config = require('../config')
const store = require('../store')

const newGame = function () {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/games',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: '{}'
  })
}
const updateGame = function () {

}
module.exports = {
  newGame
}
