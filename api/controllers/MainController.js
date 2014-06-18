/**
 * MainController
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
   * Overrides for the settings in `config/controllers.js`
   * (specific to MainController)
   */
  _config: {},
  // -------------------------------------------------------------------
  // index ( req,res )
  //
  // PARAMETERS:
  //            req:request from cllient
  //            res:response server send client
  // RETURNS:
  //            no return
  // DEPENDENCIES:
  //
  // PURPOSE:
  //            init view for client
  // NOTES:
  //            none
  // REVISIONS:
  //            05/30/2014: Phuc Nguyen
  // -------------------------------------------------------------------
  index: function (req, res) {
    var admin = false;
    if (req.session.user) {
      if (req.session.user.role === 'admin') {
        admin = true;
      }
      res.view({
        partials: {
          header: '../partials/site/header',
          footer: '../partials/site/footer'
        },
        menu: true,
        status: "Logout",
        welcomeUser: "Welcome : " + req.session.user.lastname,
        admin: admin
      });
    } else {
      res.redirect('/login');
    }
  },
  manager: function (req, res) {
    var data = req.body;
    ManagerParam.findOrCreate(['name'], data).done(function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs.createdAt);
        if (!docs.createdAt) {
          ManagerParam.update({
            id: docs.id
          }, data).done(function (err, data) {
            res.send(data);
          });
          return;
        }
        res.send(data);
      }
    })
  },
  find: function (req, res) {
    ManagerParam.findOneByName('manager').done(function (err, data) {
      if (err)
        console.log(err);
      else {
        res.send(data);
      }
    });
  },
  success: function (req, res) {
    var view = {
      partials: {
        header: '../partials/site/header',
        footer: '../partials/site/footer'
      },
      notification: ""
    };
    res.view(view);
  }
};