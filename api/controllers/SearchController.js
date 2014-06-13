/**
 * SearchController
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
   *    `/search/find`
   */
   index: function (req, res) {
    var models = req.body.model;

     // switch (Expense){
     //    case RegisterMeal:
     //            model = 'registerMeal';
     //            break;
     //    case Menu:
     //            model = 'menu';
     //            break;
     //    case Expense:
     //            model = 'expense';
     //            break;
     //    case Deposit:
     //            model = 'deposit';
     //            break;
     //    case Report:
     //            model = 'report';
     //            break;
     //    default:
     //        model = "Not find"; 
     //        break;
     // };

     if (models == 'RegisterMeal')
      {
        model = 'registerMeal';
      }
    else if (models == 'Menu')
      {
        model = 'menu';
     }
    else if (models == 'Expense')
      {
       model = 'expense';
      }
    else if (models == 'Deposit')
      {
       model = 'deposit';
      }
    else
      {
       model = 'report'; 
      }   
     
     var data = {
      dateFrom : req.body.dateFrom,
      dateTo : req.body.dateTo,
      model : model,

     };
     //  data.model = model;
     res.send(data);
    },

_config: {}

  
};
