/**
 * MenuController
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
   * (specific to MenuController)
   */
  _config: {} ,
  find:function(req,res){
  		//client send page number and number display in a page
  		var page = parseInt(req.query.page);
  		var number = parseInt(req.query.number);
  		Menu.find().limit(number).skip(number*page).done(function(err,data){
  			if(err)
  				console.log(err);
  			else
  			{
  				res.send(data);
  			}	
  		});

  },
 
};
