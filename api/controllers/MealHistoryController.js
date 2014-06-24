/**
 * MealHistoryController
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
   * Action blueprints:
   *    `/mealhistory/find`
   */
   find: function (req, res) {
    if(!req.session.user){
      res.send('You are not login');
      return;
    }
    RegisterMeal.find({userId: req.session.user.id, payment: true}).done(function(err, data){
      if(err) res.send(err);
      res.send(data);
    })
  },


  /**
   * Action blueprints:
   *    `/mealhistory/create`
   */
   create: function (req, res) {
    
  },


  /**
   * Action blueprints:
   *    `/mealhistory/destroy`
   */
   destroy: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/mealhistory/update`
   */
   update: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MealHistoryController)
   */
  _config: {}

  
};
