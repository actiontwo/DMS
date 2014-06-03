/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to UserController)
     */
    _config: {},
    register: function (req, res) {
      res.view({
        partials: {
          header_login: '../partials/site/header_login',
          footer: '../partials/site/footer'
        },
      });  
    },
    create: function(req,res,next){
      console.log(req.param('email'));
      email = req.param('email');
      password = req.param('password');
        if(!req.param('email')||!req.param('password')||!req.param('confirm')){
          console.log('You must enter email,password,corfirm');
          res.view('user/register',{error: 'You must enter email,password,corfirm'});
          //res.redirect('/register');
          return;
        }
        if(req.param('password')!=req.param('confirm')){
          console.log('Password and Confirm not match');
          res.view('user/register',{error: 'Password and Confirm not match'});
          //res.redirect('/register');
          return; 
        }
        User.findOneByEmail(req.param('email'), function (err,user){
          if(err) next(err);
          if(user) {
            console.log('Email Exists!');
            res.view('user/register',{error: 'Email Exists!'});
            //res.redirect('/register');
            return;
          }
            var hasher = require("password-hash");
            password = hasher.generate(password);
            console.log(password);
            //next();

            User.create({email: email, password: password,role:'user'}).done(function(error, user) {
              if (error) {
                res.send(500, {error: "DB Error"});
              } else {
                console.log("OK");
                // req.session.user = user;
                // res.send(user);
              }
            });
            res.redirect('/login') ;
        });
    },
};