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
var md5 = require('MD5');
var hasher = require("password-hash");
module.exports = {

  roleCheck: function (req, res) {
    if (!req.session.user) {
      return;
    }
    res.send(req.session.user.role);
  },
  register: function (req, res) {
    var config = sails.config.config;
    res.view({
      partials: {
        header: config.user.header,
        footer: config.user.footer
      }
    });
  },
  login: function (req, res) {
    var config = sails.config.config;
    res.view({
      partials: {
        header: config.user.header,
        footer: config.user.footer
      }
    });
  },
  logout: function (req, res) {
    req.session.user = '';
    res.clearCookie('remember');
    res.clearCookie('user');
    req.session.authenticated = false;
    res.redirect('/');
  },
  resetPassword: function (req, res) {
    var data = {
      email: req.param('email')
    };
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
            var linkConfirm = req.baseurl + "/confirmResetPassword?require=confirm&email=" + docs.email + "&keyConfirm=" + key;
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
                // Set keyConfirm to user that want to reset  password
                User.update({email: docs.email}, {keyConfirm: key}).done(function (err, docs) {
                  console.log(docs);
                  if (err)
                    console.log(err);
                  else {
                    //start timeout to remove confrimKey if user not reset password within 3 hours
                    setTimeout(function () {
                      User.update({email: data.email}, {keyConfirm: ''}).done(function (err, docs) {
                        console.log(docs);
                      });
                    }, 3 * 60 * 60 * 1000);
                    //send notification to user
                   // var html = 'Reset password successful! Please see email to change new password!' +
                   //   '<div class="link"' +
                   //   '<br><a href="/login">Login</a>' +
                   //   '</div>';
                   // res.view('main/success', {notification: html});
                    res.view('user/login', {error: 'Reset password successful! Please read email to change new password!'});
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
      default:
        return res.redirect('/forgetPassword');
    }
  },
  confirmResetPassword: function (req, res) {
    var config = sails.config.config;
    req.session.user = '';
    var email = req.param('email');
    var keyConfirm = req.param('keyConfirm');
    var require = req.param('require');
    var view = {
      partials: {
        header: config.user.header,
        footer: config.user.footer
      },
      keyConfirm: keyConfirm,
      email: email
    };
    if (req.method === 'GET') {
      switch (require) {
        case 'confirm':
          res.view(view);
          break;
        default:
          res.redirect('/');
          break;
      }
      return;
    }

    if (require === 'changePassword') {
      // Check Password match
      var password = req.param('password');
      var confirmPassword = req.param('confirmPassword');
      if (password !== confirmPassword) {
        view.notification = 'Password not match! please check again';
        res.view(view);
        return;
      }
      User.findOneByEmail(email).done(function (err, docs) {
        if (err) {
          console.log(err);
          res.view('main/success', {notification: err});
          return;
        }
        if (!docs) {
          res.view('main/success', {notification: 'Email not exist'});
          return;
        }
        var key = docs.keyConfirm;
        if (key !== keyConfirm) {
          res.view('main/success', {notification: 'Cannot confirm email'});
          return;
        }
        var dataUpdate = {
          keyConfirm: '',
          password: hasher.generate(password)
        };
        User.update({email: email}, dataUpdate).done(function (err, docs) {
          if (err) {
            console.log(err);
            res.view('main/success', {notification: err});
            return;
          }

          var html = 'Reset password successful!' +
            '<div class="link"' +
            '<br><a href="/login">Login</a>' +
            '</div>';
          res.view('main/success', {notification: html});
        });
      });
    }
  },
  forgetPassword: function (req, res) {
    var config = sails.config.config;
    res.view({
      partials: {
        header: config.user.header,
        footer: config.user.footer
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
      if (!user.active) {
        res.view('user/login', {error: 'Your account not active , please check your email to active account'});
        return;
      }
      if (!hasher.verify(data.password, user.password)) {
        console.log('Wrong password');
        res.view('user/login', {error: "Wrong Password"});
        return;
      }
      req.session.user = user;
      req.session.authenticated = true;
      //  if user click remmeber
      if (data.remember) {
        req.session.user.remember = "yes";
        res.cookie('remember',true, { maxAge: 360000 });
        res.cookie('user',user,{maxAge:360000})
      }
      else {
        req.session.user.remember = "no";
        res.cookie('remember',false, { maxAge: 360000 });
      }
      res.redirect("/");

    });
  },
  activeAccount: function (req, res) {
    req.session.user = '';
    var data = {
      require: req.param('require'),
      email: req.param('email'),
      keyConfirm: req.param('keyConfirm')
    };
    console.log(data);
    if (data.require !== 'active') {
      res.redirect('/');
      return;
    }
    User.findOneByEmail(data.email).done(function (err, docs) {
      if (err) {
        res.view('main/success', {notification: err});
        return;
      }
      if (!docs) {
        res.view('main/success', {notification: 'Email active not exits'});
        return;
      }
      if (docs.active) {
        res.view('main/success', {notification: 'Your email have been active'});
        return;
      }
      if (docs.keyConfirm !== data.keyConfirm) {
        res.view('main/success', {noitificaion: 'Active fail, Please contact with us to support'})
      }
      data.active = true;
      data.keyConfirm = '';
      var time = tool.getCurrentDay();
      data.join_date = time.currentDay;
      delete data.require;
      console.log(data);
      User.update({email: data.email}, data).done(function (err, docs) {
        if (err) {
          res.view('main/success', {notification: err});
          console.log(err);
          return;
        }
        res.view('user/login', {error: 'Your account have been active. Please login!'});
        //res.view('main/success', {notification: 'Your account have been active <a href="/login" class="link">Login</a>'});
      });
    });
  },
  userProfile: function (req, res) {

    if (req.method === 'PUT') {
      var data = req.body;
      delete data.role;
      if (data.defaultRegisterMeal === 'checked')
        data.defaultRegisterMeal = true;
      else
        data.defaultRegisterMeal = false;
      req.session.user.defaultRegisterMeal = data.defaultRegisterMeal;
      console.log(req.session.user.defaultRegisterMeal);
      if (data.password) {
        data.password = hasher.generate(data.password);
      }
      console.log(data);
      User.update({id: req.body.id}, data).done(function (err, docs) {
        if (err) {
          console.log(err);
          res.send(err);
          return;
        }
        if (docs.defaultRegisterMeal) {
          docs.defaultRegisterMeal = 'checked';
        }
        delete docs.password;

        res.send(docs);
      });
      return;
    }
    User.findOne(req.session.user.id).done(function (err, docs) {
      if (err) {
        res.send(err);
        return;
      }
      if (docs.defaultRegisterMeal) {
        docs.defaultRegisterMeal = 'checked';
      }
      res.send(docs);
    })
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
        res.view('user/register', {error: 'Please fill your information'
                                  ,email_input:data.email
                                  ,firstName_input:data.firstname
                                  ,lastName_input:data.lastname});
        return;
      }
    }
    //check password confirm
    if (data.password !== data.confirmPassword) {
      res.view('user/register', {error: 'Please make sure your password'
                                ,email_input:data.email
                                ,firstName_input:data.firstname
                                ,lastName_input:data.lastname});
      return;
    }
    //Check firstname and lastname
    if ((data.firstname.trim() =='')||(data.lastname.trim() =='')){
      res.view('user/register', {error: 'Please fill both first name and last name'
                                ,email_input:data.email
                                ,firstName_input:data.firstname
                                ,lastName_input:data.lastname});
      return;
    }
    //Check firstname and lastname
    if ((data.firstname.trim() =='')||(data.lastname.trim() =='')){
      res.view('user/register', {error: 'Please fill both first name and last name'
                                ,email_input:data.email
                                ,firstName_input:data.firstname
                                ,lastName_input:data.lastname});
      return;
    }
    //check user exits!
    User.findOneByEmail(data.email).exec(function (err, user) {
      if (user) {
        //if user exit --> render page register and alert user exit
        res.view('user/register', {error: 'Email exit!, please choose another email'
                                  ,firstName_input:data.firstname
                                  ,lastName_input:data.lastname});
        return;
      }
      // if user not exit --> create a new user
      data.active = false;
      data.keyConfirm = md5(Math.floor((Math.random() * 100000)));
      data.password = hasher.generate(data.password);

      var smtpTransport = tool.smtpTransport();
      // setup e-mail data with unicode symbols
      var linkConfirm = req.baseurl + "/activeAccount?require=active&email=" + data.email + "&keyConfirm=" + data.keyConfirm;
      // declaration mail form
      var mailInfo = {
        from: "DMS  <dms@designveloper.com>", // sender address
        to: data.email, // list of receivers
        subject: "Active account", // Subject line
        html: '<h3>Dear ' + data.firstname + ' ' + data.lastname + ',</h3>' +
          '<p>Thanks for signing up to use DMS Online!</p>' +
          '<p> Please click the link below to activate your account:</p>' +
          '<p> <a href="' + linkConfirm + '">Verify Your account</a></p>' +
          '<p>The DMS Team</p>' +
          '<p> <a href="https://www.dms.designveloper.com">Dining Management System</a></p>'
      };
      // send mail with defined transport object
      smtpTransport.sendMail(mailInfo, function (error, response) {
        if (error) {
          console.log(error);
          res.view('main/success', {notification: 'Can not send email'});
          return;
        }
        User.create(data).done(function (err, user) {
          // Error handling
          if (err) {
            return console.log(err);
          } else {
            // The account was created successfully!
            res.view('main/success', {notification: 'Please check your email to active account'});
          }
        });
      });
    });
  },

  find: function (req, res) {
    if (req.session.user.role !== 'admin') {
      res.send('Your are not admin');
      return;
    }
    User.find().done(function (err, docs) {
      if (err) {
        res.send(err);
        return;
      }
      res.send(docs);
    });
  },
  /**
   * Action blueprints:
   *    `/user/update`
   */
  update: function (req, res) {
    if (req.session.user.role !== 'admin') {
      res.send('Your are not admin');
      return;
    }
    var data = req.body;
    console.log('_----------------');
    User.update({id: data.id}, data).done(function (err, docs) {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      console.log('Update');
      res.send('update Success');
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
  _config: {
  }

}
;
