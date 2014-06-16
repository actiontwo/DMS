/**
 * UserController
 *
 * @module      :: Controller
 * @description  :: A set of functions called `actions`.
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
var tool = require('../tool');
var md5 = require('md5');
var hasher = require("password-hash");
module.exports = {

  roleCheck: function (req, res) {
    if (!req.session.user) {
      return;
    }
    res.send(req.session.user.role);
  },
  register: function (req, res) {
    res.view({
      partials: {
        header: '../partials/site/header_login',
        footer: '../partials/site/footer'
      }
    });
  },
  login: function (req, res) {
    res.view({
      partials: {
        header_login: '../partials/site/header_login',
        footer: '../partials/site/footer'
      }
    });
  },
  logout: function (req, res) {
    req.session.user = '';
    res.redirect('/');
  },
  resetPassword: function (req, res) {
    var data = {
      email: req.param('email')
    };
    console.log(req.param('require'));
    switch (req.param('require')) {
      case 'reset':
        User.findOneByEmail(data.email).done(function (err, docs) {
          if (err) {
            console.log(err);
          } else if (docs) {
            // create reusable transport method (opens pool of SMTP connections)
            var smtpTransport = tool.smtpTransport();
            var key = md5(Math.floor((Math.random() * 100000)));
            // setup e-mail data with unicode symbols
            var linkConfirm = req.baseurl + "/resetPassword?require=confirm&key=" + key;
            var mailInfo = {
              from: "DMS  <dms@designveloper.com>", // sender address
              to: data.email, // list of receivers
              subject: "Reset Password", // Subject line
              text: "Please click to link below to reset ....", // plaintext body
              html: '<h3>Dear ' + docs.firstname + ' ' + docs.lastname + ',</h3>' +
                '<p>You recently initiated a password reset for your DMS ID. To complete the process, click the link below.</p>' +
                '<a href="' + linkConfirm + '"> Reset now ></a>' +
                '<p>This link will expire three hours after this email was sent.</p>' +
                '<p>If you didn’t make this request, it\'s likely that another user   has entered your email address by mistake and your account is still secure. If you believe an unauthorized person has accessed your account, you can reset your password at DMS ID.</p>' +
                '<p>Dining Managerment System Support </p>'
            };
            // send mail with defined transport object
            smtpTransport.sendMail(mailInfo, function (error, response) {
              if (error) {
                console.log(error);
                res.view('user/forgetPassword', {notification: 'Can not send Email'});
              } else {
                console.log("Message sent: " + response.message);
                // Set keyConfrim to user that want to reset  password
                User.update({email: docs.email}, {keyConfrim: key}).done(function (err, docs) {
                  console.log(docs);
                  if (err)
                    console.log(err);
                  else {
                    //start timeout to remove confrimKey if user not reset password within 3 hours
                    setTimeout(function () {
                      User.update({email: data.email}, {keyConfrim: ''}).done(function (err, docs) {
                        console.log(docs);
                      });
                    }, 3 * 60 * 60 * 1000);
                    //send notification to user
                    res.view('user/forgetPassword', {notification: 'Please check your email to reset password!'});
                  }
                });
              }
              // if you don't want to use this transport object anymore, uncomment following line
              //smtpTransport.close(); // shut down the connection pool, no more messages
            });
          } else {
            res.view('user/forgetPassword', {notification: 'Email not exits, Please check your email again!'});
          }
        });
        break;
      case 'confirm':
        return res.send('ok');
        break;
      default:
        return res.redirect('/forgetPassword');
    }
  },
  abc:function(req,res){
    console.log(req.method);
    res.send(req.param('id'));
  },
  forgetPassword: function (req, res) {

    console.log('view');
    res.view({
      partials: {
        header: '../partials/site/header_login',
        footer: '../partials/site/footer'
      }
    });
  },
  checkUserLogin: function (req, res) {
    var data = {
      email: req.body.email,
      password: req.body.password,
      remember: req.body.remember
    };

    if (!data.email || !data.password) {
      console.log('You must enter both a email and password');
      res.view('user/login', {error: "You must enter both a email and password"});
      return;
    }
    User.findOneByEmail(data.email, function (err, user) {
      if (err) next(err);
      if (!user) {
        console.log('Email not found!');
        res.view('user/login', { error: "Email not found!" });
        return;
      }
      if (hasher.verify(data.password, user.password)) {
        req.session.user = user;
        //  if user click remmeber
        if (data.remember)
          req.session.user.remember = "yes";
        else
          req.session.user.remember = "no";
        res.redirect("/");
      } else {
        console.log('Wrong password');
        res.view('user/login', {error: "Wrong Password"});
        return;
      }
    });

  },

  find: function (req, res) {

    // Send a JSON response
    return res.json({
      hello: 'Find'
    });
  },

  /**
   * Action blueprints:
   *    `/user/create`
   */
  create: function (req, res) {
    var data = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      role: "user"
    };
    //check information empty
    for (key in data) {
      if (!data[key]) {
        res.view('user/register', {error: 'Please fill your information'});
        return;
      }
    }
    //check password confirm
    if (data.password !== data.confirmPassword) {
      res.view('user/register', {error: 'Please make sure your password'});
      return;
    }
    //check user exits!
    User.findOneByEmail(data.email).exec(function (err, user) {
      if (user) {
        //if user exit --> render page register and alert user exit
        res.view('user/register', {error: 'Email exit!, please choose another email'});
        return;
      }
      // if user not exit --> create a new user
      var hasher = require("password-hash");
      data.password = hasher.generate(data.password);
      User.create(data).done(function (err, user) {
        // Error handling
        if (err) {
          return console.log(err);

        } else {
          // The User was created successfully!
          req.session.user = user;
          req.session.user.remeber = "yes";
          res.redirect('/');
        }
      });
    });
  },

  /**
   * Action blueprints:
   *    `/user/update`
   */
  update: function (req, res) {

    // Send a JSON response
    return res.json({
      hello: 'update'
    });
  },

  /**
   * Action blueprints:
   *    `/user/destroy`
   */
  destroy: function (req, res) {

    // Send a JSON response
    return res.json({
      hello: 'destroy'
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}


};
