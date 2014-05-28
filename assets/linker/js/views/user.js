//
// ============================================================================
// Copyright:
//          This source is subject to the Designveloper JSC (designveloper.com)
//          All using or modify must have permission from us.
//
// Name:    DSVScriptTemplate
// Purpose:
//          profile user
// Class:
//          UserView
// Functions:
//          one ; two ; three
// Called From:
//          (script) assets/linker/router.js
// Author:
//          Nguyen Phuc (phucnt@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/28/2014 - Nguyen Phuc - Init first view user profile.
// ============================================================================
//



// -------------------------------------------------------------------
// UserView ( parameter1 )
//
// PARAMETERS:
//            @parameter1 (userModel) model User
// METHODS:
//            one
//            two
// DEPENDENCIES:
//            none
// PURPOSE:
//            Use this function to create profile user's
// NOTES:
//            none
// REVISIONS:
//            05/28/14 - Initial Class
// -------------------------------------------------------------------

var UserView = Backbone.View.extend({
  //declare el,
  tagName:'div',
  className:'men-register',
  id:'user',
  initialize:function(){
  	this.listenTo( this.model, 'change sync',this.render);
  },
  render:function(){
  	this.$el.html(Templates['user/profileUser'](this.model.attributes));
  }
});