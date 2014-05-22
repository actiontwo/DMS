/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt');
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
            required:true
        },
        firstname: {
            type: 'string'
        },
        lastname: {
            type: 'string'
        },
        role: {
            type: 'string'
        },
        join_date: {
            type: 'date'
        }
        /* e.g.
  	nickname: 'string'
  	*/
    },
    //hash password after crease user
    beforeCreate: function(values, next) {
        bcrypt.hash(values.password, 10, function(err, hash) {
            if (err) return next(err);
            values.password = hash;
            next();
        });
        
    }
};