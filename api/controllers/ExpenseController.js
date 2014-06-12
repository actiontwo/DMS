/**
 * ExpenseController
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
   *    `/expense/find`
   */
   find: function (req, res) {
     if (req.param('id')) {
      res.send('find ID');
    }
    else {
       Expense.find().done(function(err,data){
        if(err)
          console.log(err);
        else{
          res.send(data);
        } 
      })
    }
  },


  /**
   * Action blueprints:
   *    `/expense/create`
   */
   create: function (req, res) {
   var data ={
      date : req.body.date,
      money : req.body.money,
      invoiceID : req.body.invoiceID,
      invoiceImage : req.body.invoiceImage,
      note : req.body.note
   };
   Expense.create(data).done(function(err, data){
    if(err){
      res.send(err)
    }else{
      res.send(data);
    }
   })
  },


  /**
   * Action blueprints:
   *    `/expense/destroy`
   */
   destroy: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/expense/update`
   */
   update: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ExpenseController)
   */
  _config: {}

  
};
