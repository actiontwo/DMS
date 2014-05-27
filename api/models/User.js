/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
 //var bcrypt = require('bcrypt');
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
        },
        toJSON: function() {
          var obj = this.toObject();
          delete obj.password;
          return obj;
      }
  }
    //hash password after crease user
    // beforeCreate: function(user, cb) {
    //     bcrypt.genSalt(10, function(err, salt) {
    //       bcrypt.hash(user.password, salt, function(err, hash) {
    //         if (err) {
    //           console.log(err);
    //           cb(err);
    //       }else{
    //           user.password = hash;
    //           cb(null, user);
    //       }
    //   });
    //   });
    // }
};