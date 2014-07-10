/**
 * Deposit
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    userId:{
      type:'string'
    },
    email:{
      type:'string'
    },
    name:{
      type:'string'
    },
    date:{
      type:'date'
    },
    amount: {
      type: 'integer'
    },
    deleteflg: {
      type: 'boolean'
    },
    userDelete: {
      type: 'string'
    }
  }
};
