/**
 * Deposit
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	date:{
  		type:'date',
  		required:true
  	},
  	username:{
  		type:'string',
  		unique: true
  	},
  	amount: {
  		type: 'integer',
  		required: true
  	}
  	/* e.g.
  	nickname: 'string'
  	*/
    
  }

};
