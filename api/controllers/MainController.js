//
// ============================================================================
// Copyright:
//          This source is subject to the Designveloper JSC (designveloper.com)
//          All using or modify must have permission from us.
//
// Name:    DSVScriptTemplate
// Purpose:
//          create page menu, display full list menu created 
// Class:
//          
// Functions:
//          
// Called From:
//          (script) local/router.js
// Author:
//          Nguyen Phuc (phucnt@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/29/2014 - Phuc Nguyen - Init File, refactor code.
// ============================================================================
//

module.exports = {




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MainController)
   */
  _config: {},
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
    console.log(req.session.user);
    if (req.session.user) {
      res.view({
        partials: {
          header: '../partials/site/header',
          footer: '../partials/site/footer',
          menu: '../partials/site/menu'
        },
      });
    } else {
      res.redirect('/login');
    }

  }
  //  dish:function(req,res){
  //    var collection = Menu;
  //
  //    console.log(req.param('id'));
  //    collection.findByBrunch('Lunch').exec(function(err,data){
  //      res.send(data);
  //    })
  //  },
  //  menu:function(req,res){
  //    Menu.find().exec(function(err,data){
  //      res.send(data);
  //    })
  //  },
  //  registermeal:function(req,res){
  //    RegisterMeal.find().exec(function(err,data){
  //      res.send(data);
  //    })
  //  }

};