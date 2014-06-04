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
//          SubDepositView
// Functions:
//          one ; two ; three
// Called From:
//          (script) assets/linker/router.js
// Author:
//          Nguyen Phuc (phucnt@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/30/2014 - Phuc Nguyen - Init DishMenuView, refactor code.
// ============================================================================
//

// -------------------------------------------------------------------
// SubDepositView ( @parameter1 )
//
// PARAMETERS:
//            @parameter1 () model DepositModel
// METHODS:
//            initialize, render, updateDeposit
//            editDeposit, removeDeposit, saveDeposit
// DEPENDENCIES:
//            none
// PURPOSE:
//            Use this function to create View for page Menu
// NOTES:
//            none
// REVISIONS:
//            05/29/14 - Phuc Nguyen Initial Class, refactor code.
// -------------------------------------------------------------------
var SubDepositView = Backbone.View.extend({
// -------------------------------------------------------------------
// initialize (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            init class SupDepositView
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Phuc Nguyen
// -------------------------------------------------------------------
	initialize:function(){
		this.listenTo(this.model ,'sync', this.render);
	},
// -------------------------------------------------------------------
// render (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            render view for subDeposit 
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Phuc Nguyen
// -------------------------------------------------------------------
	render:function(){
		if(userLogin.attributes.role == 'admin')
      this.model.set({'admin': 'true'})
    console.log(this.model.attributes);
		this.$el.html(Templates['deposit/sub_deposit'](
			this.model.attributes
			));
		//display calendar
		displayCalendar();
		return this.el;
	},
	events:{
		'click #btn-edit-deposit':'editDeposit',
		'click #btn-remove-deposit':'removeDeposit',
		'click #btn-save-deposit':'saveDeposit',
		'change input':'updateDeposit',
	},
// -------------------------------------------------------------------
// editDeposit (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            using edit a row in table deposit, when user click button 
//						all tag html conver tag input so user can input value
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Phuc Nguyen
// -------------------------------------------------------------------
	editDeposit:function(){
		//if editor is true model render views which user can edit value,
		//otherwise model render view which you can't edit value 
		this.model.set({editor:'true'});
		this.render();
	},
// -------------------------------------------------------------------
// removeDeposit (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            romove a row when user click button recycle in table deposit 
//						in page deposit
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Phuc Nguyen
// -------------------------------------------------------------------
	removeDeposit:function(){
		this.model.destroy();
	},
// -------------------------------------------------------------------
// saveDeposit (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            update a row in table deposit in deposit page 
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Phuc Nguyen
// -------------------------------------------------------------------
	saveDeposit:function(){
		this.model.on('invalid',function(model,err){
			alert(err);
			//if user input invalid, user can continue input again
			this.model.set({editor:'true'});	
		});
		this.model.save();
		//unset editor then  render normal views,views can't input 
		this.model.unset('editor');	
		this.render();

	},
// -------------------------------------------------------------------
// updateDeposit (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            update model every time user input data
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Phuc Nguyen
// -------------------------------------------------------------------
  updateDeposit:function(ev){
		//update model every input change value
		this.model.set($(ev.currentTarget).data('attribute'),$(ev.currentTarget).val());
	}
})