/**
 * ListDishController
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
   * Overrides for the settings in `config/controllers.js`
   * (specific to ListDishController)
   */
  _config: {},
  getall:function(req,res){ 	
  	ListDish.find().done(function(err,data){
  		if(err)
  			console.log('ERROR',err);
  		else
  			res.send({'listdish':data});
  	});
  },
  create:function(req,res){
    //var dish = req.param('dish');
    console.log(req.params.all());  
    ListDish.create(req.params.all(),function(err,data){
       if(err)
         console.log('ERROR',err);
       else
         res.send(data);
    });
  }

  
};
