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
  _config: {

  },
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
    var config=sails.config.config;
    var admin = false;
    if (req.session.user) {
      if (req.session.user.role === 'admin') {
        admin = true;
      }
      res.view({
        partials: {
          header: config.user.header,
          footer: config.user.footer
        },
        menu: true,
        status: "Logout",
        user: req.session.user.lastname,
        admin: admin
      });
    } else {
      res.redirect('/login');
    }
  },
  updateManagerParam: function (req, res) {
    var data = req.body;
    console.log('data: ' + data);
    ManagerParam.update({name: 'manager'}, data).done(function(err, data){
      res.send(data);
    });
  },
  success: function (req, res) {
    var config=sails.config.config;
    var view = {
      partials: {
        header: config.user.header,
        footer: config.user.footer
      },
      notification: ""
    };
    res.view(view);
  },
  indexOptions: function(req, res){
    var managerParamsResult = [];
    ManagerParam.find().done(function (err, managerParams) {
      if (err) {
        console.log('err when find ManagerParam' + err);
      }
      else {
        if (managerParams.length){
          managerParamsResult.push({
            name: 'manager',
            costPerMeal: managerParams[0].costPerMeal,
            lastHour: managerParams[0].lastHour
          });
        }
        else {
          // if managerParams didn't existed before
          managerParamsResult.push({
            //default values for managerParam
            name: 'manager',
            costPerMeal: 25000,
            lastHour: 17
          });
          ManagerParam.create(managerParamsResult).done(function(err, result){
            if(err){
              console.log(err);
            }
          });
        }
        res.send(managerParamsResult[0]);
      }
    })
  }
};