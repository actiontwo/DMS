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

module.exports = {


  /**
   * Action blueprints:
   *    `/user/find`
   */
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
      },
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
      var hasher = require("password-hash");
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
      }
      else {
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
      }

    });

    // Send a JSON response
    // res.send(data);
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
