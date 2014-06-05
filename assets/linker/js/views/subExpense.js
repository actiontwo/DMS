//
// ============================================================================
// Copyright:
//          This source is subject to the Designveloper JSC (designveloper.com)
//          All using or modify must have permission from us.
//
// Name:    DSVScriptTemplate
// Purpose:
//          show tags tr
// Class:
//          
// Functions:
//         
// Called From:
//          
// Author:
//          Hien Lam
// Notes:
//          Additional information [long version]
// Changelog:
//          06/05/2014 - Hien Lam -
// ============================================================================
var SubExpenseView = Backbone.View.extend({
    initialize: function(){
      this.listenTo(this.model, 'sync', this.render);        
    },
    render: function(){
      if(userLogin.attributes.role == 'admin')
        this.model.set({'admin': 'true'});
      this.$el.html(Templates['expense/sub_expense'](
          this.model.attributes
      ));
    }
    
})