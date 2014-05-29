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
//            initialize
//            reder
//            updateMedel
//            updateProfile
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
// -------------------------------------------------------------------
// initialize (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            none
// PURPOSE:
//            init view profile,
// NOTES:
//            none
// REVISIONS:
//            05/28/2014: Phuc Nguyen
// -------------------------------------------------------------------
  initialize:function(){
    //listen on model, when model change render profile view
  	this.listenTo( this.model, 'sync',this.render);
  },
// -------------------------------------------------------------------
// render (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            none
// PURPOSE:
//            render view for user profile
// NOTES:
//            none
// REVISIONS:
//            05/28/2014: Phuc Nguyen
// -------------------------------------------------------------------
  render:function(){
  	this.$el.html(Templates['user/profileUser'](this.model.attributes));
  },
  events:{
  	'click .btn-end':'updateProfile',
  	'change input':'updateModel'
  },
// -------------------------------------------------------------------
// updateModel ( ev )
//
// PARAMETERS:
//            ev :current DOM element when user click
// RETURNS:
//          	no return
// DEPENDENCIES:
//            none
// PURPOSE:
//            update model when user fill information
// NOTES:
//            none
// REVISIONS:
//            05/28/2014: Phuc Nguyen
// -------------------------------------------------------------------
  updateModel:function(ev){
  	this.model.set($(ev.currentTarget).data('attribute'),$(ev.currentTarget).val());
  },
// -------------------------------------------------------------------
// updateProfile (  )
//
// PARAMETERS:
//            none
// RETURNS:
//          	no return
// DEPENDENCIES:
//            updateModel
// PURPOSE:
//            update profile user into database
// NOTES:
//            none
// REVISIONS:
//            05/28/2014: Phuc Nguyen
// -------------------------------------------------------------------
  updateProfile:function(){
  	this.model.save(null,{
  		success:function(){
  			console.log('Success');
  		},
  		error:function(){
  			console.log('Failed');
  		}
  	});
  }
});