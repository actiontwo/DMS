/**
 * RegisterMeal
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    date: {
      type: 'date'
    },
    userId: {
      type: 'string'
    },
    meal: {
      type: 'string'
    },
    status: {
      type: 'boolean'
    },
    numberOfMeals: {
      type: 'integer'
    },
    month: {
      type: 'integer'
    },
    year: {
      type: 'integer'
    },
    day:{
      type:'string'
    }

  }
};
