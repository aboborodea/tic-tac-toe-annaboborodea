'use strict'

// const api = require('./api.js')
// const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields.js')

const onTakeTurn = function (event) {
  event.preventDefault()
  console.log(event.target.id)

  // api.show(formData)
  //   .then(ui.onShowSuccess)
  //   .catch(ui.onError)
}
const onNewGame = function (event) {
  event.preventDefault()
  console.log('new game')
}

module.exports = {
  onTakeTurn,
  onNewGame
}
