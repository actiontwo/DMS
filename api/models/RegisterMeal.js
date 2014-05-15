/**
 * RegisterMeal
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
    name: {
      type: 'string'
    },
    lunch: {
      type: 'boolean'
    },
    dinner: {
      type: 'boolean'
    },
    updateBy: {
      type: 'string'
    }
  }

};
