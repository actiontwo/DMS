/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    email: {
      type: 'string',
      email: true,
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    firstname: {
      type: 'string'
    },
    lastname: {
      type: 'string'
    },
    numberOfMeal: {
      type: 'integer',
      defaultsTo: 0
    },
    deposit: {
      type: 'integer',
      defaultsTo: 0
    },
    balance: {
      type: 'integer',
      defaultsTo: 0
    },
    role: {
      type: 'string'
    },
    join_date: {
      type: 'date'
    },
    active: {
      type: 'boolean'
    },
    keyConfirm: {
      type: 'string'
    },
    defaultRegisterMeal: {
      type: 'boolean'
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  }
};
