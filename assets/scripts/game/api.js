'use strict'
const config = require('../config')
// require 'store' so we have access to our 'token'
// so the API knows who we are
// const store = require('../store')

const newGame = function () {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/games'
  })
}

module.exports = {
  newGame
}
