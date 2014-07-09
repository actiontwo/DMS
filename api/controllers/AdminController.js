/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index:function(req,res){
  var config = sails.config.config;
   res.view({
     partials:{
       header:config.admin.header,
       footer:config.admin.footer
     }
   })
  }
};

