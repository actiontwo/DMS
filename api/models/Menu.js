/**
 * Menu
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

 attributes: {
    date: {
      type: "date",
      required: true
    },
    brunch: {
      type:"string",
      required: true
    },
    dish: {
      type: "array"
    },
    note: {
      type: "string"
    }
  }


};
