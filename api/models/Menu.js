/**
 * Menu
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	no: {
  		type: "integer"
  	},
  	date: {
  		type: "date",
  		required: true
  	},
  	brunch: {
  		type:"string",
  		required: true
  	},
  	dish1: {
  		type: "string"
  	},
  	dish2: {
  		type: "string"
  	},
  	dish3: {
  		type: "string"
  	},
  	dish4: {
  		type: "string"
  	},
  	dish5: {
  		type: "string"
  	},
  	note: {
  		type: "string"
  	}
  }

};
