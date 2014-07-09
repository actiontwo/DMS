/**
 * MealHistoryController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
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
  find: function(req, res) {

    RegisterMeal.find({
      userId: req.session.user.id,
      payment: true
    }).done(function(err, data) {
      if (err) res.send(err);
      res.send(data);
    })
  },
  indexAdmin: function(req, res) {

    if (req.session.user.role !== 'admin') {
      res.send('You are not admin');
      return;
    }
    if (req.param('id')) {
      res.send('find ID');
      return;
    }
    RegisterMeal.find().done(function(err, doc) {
      if (err) {
        res.send(err)
      } else { 
        User.find().done(function(err, user) {
          if (err) {
            res.send(err)
          }
          var result = [];
          for (i = 0; i < user.length; i++) {
            var id = user[i].id;
            for (j = 0; j < doc.length; j++) {
              if (id === doc[j].userId) {                
                if(doc[j].payment == true){
                  payment = 'YES'
                }else{
                  payment = 'NO'
                }
                result.push({
                  userid: doc[j].userId,
                  name: user[i].firstname + " " + user[i].lastname,
                  date: doc[j].date,
                  day: doc[j].day,
                  cost: doc[j].costPerMeal,
                  numberOfMeals: doc[j].numberOfMeals,
                  payment: payment
                });
              }
            }            
          }          
          res.send(result);
        });
      }
    })
  },

  /**
   * Action blueprints:
   *    `/mealhistory/create`
   */
  create: function(req, res) {

  },


  /**
   * Action blueprints:
   *    `/mealhistory/destroy`
   */
  destroy: function(req, res) {

    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/mealhistory/update`
   */
  update: function(req, res) {

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