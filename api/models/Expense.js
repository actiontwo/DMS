/**
 * Expense
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

 module.exports = {
  attributes: {
  	date: {
      type: 'date'
    },
    money: {
      type: 'integer'
    },
    invoiceID: {
      type: 'integer'
    },
    invoiceImage: {
      type: 'string'
    },
    note: {
      type: 'string'
    }
  }
};
