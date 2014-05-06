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
  _config: {},

   index:function(req,res){
   		Menu.find().done(function(err,menu){
   			if(menu){
   				res.view({
   					 partials: {
			        head: '../site/partials/header',
			        foot: '../site/partials/footer',
			        tail: '../partials/tail',
			      },

   				});
   				
   			}
   		});
   		
   },
   getall:function(req,res){
   	Menu.find().done(function(err,data){
   		if(err){
   			console.log('Eror');
   		}
   		else{
   			res.send(data);
   		}
   	});
   },

   
  
};
