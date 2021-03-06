/**
 * ManagerParam
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string'
    },
    costPerMeal: {
      type: 'integer'
    },
    lastHour: {
      type: 'integer'
    },
    excludeSatSun:{
      type: 'boolean'
    }
  }
};