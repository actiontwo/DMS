/**
 * MenuController
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

  index: function (req, res) {
    if (!req.session.user) {
      res.send('Please login');
      return;
    }
    var user = req.session.user;
    Menu.find().done(function (err, data) {
      if (err)
        console.log(err);
      else {
        res.send(data);
      }
    })
  },
  indexAd: function(req, res){
    if (!req.session.user) {
      res.send('You are not login');
      return;
    }
    if (req.session.user.role !== 'admin') {
      res.send('You are not admin');
      return;
    }
    if (req.param('id')) {
      res.send('find ID');
      return;
    }
    Menu.find().done(function (err, data) {
      if (err)
        console.log(err);
      else {
        res.send(data);
      }
    })
  },
  getDish: function(req, res){
    if (!req.session.user) {
      res.send('You are not login');
      return;
    }
    if (req.session.user.role !== 'admin') {
      res.send('You are not admin');
      return;
    }
    if (req.param('id')) {
      res.send('find ID');
      return;
    }
    Dish.find().done(function(err, data){
      if(err)
        res.send(err);
      else {
       res.send(data);
      
      }
    })
  },
  createDish: function(req, res){
    if (!req.session.user) {
      res.send('You are not login');
      return;
    }
    if (req.session.user.role !== 'admin') {
      res.send('You are not admin');
      return;
    }
    if (req.param('id')) {
      res.send('find ID');
      return;
    }
    var data = {
      dish: req.body.dish,
      note: req.body.note
    }
    Dish.create(data).done(function(err, data){
      if(err)
        res.send(err);
      else {
        res.send(data);
      }
    })

  },
  /**
   * Action blueprints:
   *    `/menu/find`
   */
  find: function (req, res) {

  },

  /**
   * Action blueprints:
   *    `/menu/create`
   */
  create: function (req, res) {

    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },

  /**
   * Action blueprints:
   *    `/menu/destroy`
   */
  destroy: function (req, res) {

    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },

  /**
   * Action blueprints:
   *    `/menu/update`
   */
  update: function (req, res) {

    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MenuController)
   */
  _config: {}


};
