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
//          DepositView
// Functions:
//          one ; two ; three
// Called From:
//          (script) assets/linker/router.js
// Author:
//          Nguyen Phuc (phucnt@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/30/2014 - Phuc Nguyen - Init DepositView, refactor code.
// ============================================================================
//

// -------------------------------------------------------------------
// DepositView ( @parameter1 )
//
// PARAMETERS:
//            @parameter1 () collection DepositCollection
// METHODS:
//            initialize, render, createDeposit, sortDeposit
//            deleteSelected, filterDeposit
// DEPENDENCIES:
//            none
// PURPOSE:
//            Use this function to create View for page Menu
// NOTES:
//            none
// REVISIONS:
//            05/30/14 - Phuc Nguyen Initial Class, refactor code.
// -------------------------------------------------------------------
var DepositView = Backbone.View.extend({
  tagName:'div',
  className:'deposit',
  id:'deposit',
  subViews:{},
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
//            init class DishMenu
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Phuc Nguyen
// -------------------------------------------------------------------
  initialize:function(){
    this.render();
    this.listenTo(this.collection, 'sync reset sort remove',this.render );
    //default sort with 1 increase and -1 decrease
    this.collection.sort_order ={
      'date':1,
      'username':1,
      'amount':1
    }
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
//            render view for deposit page
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
  render:function(){
    this.$el.html(Templates['deposit/deposit']({
      'deposit':this.collection.toJSON(),'user':userCollection.toJSON()
    }));
    for(i in this.collection.models){
      var model = this.collection.models[i];
      model.set({no:i});//set serial number
      //subview
      var subviewdeposit = new SubDepositView({
        model:model,el:this.$('tr[data-id="'+model.id +'"]')
      });
      subviewdeposit.render();
      this.subViews[model.id] = subviewdeposit;
    }
    displayCalendar();
    auto_index();//index table
  },
  events:{
    'click #btn-create-deposit': 'createDeposit', 
    'click th':'sortDeposit',
    'change #user-deposit':'filterDeposit1',
    'click [class^=".confirm"]':'filterDeposit',
    'click #btn-delete-selected':'deleteSelected',
    'click [class^="btn-cancel"]':'closeDeposit'
  },
// -------------------------------------------------------------------
// createDeposit (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            create a new row in table deposit,
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Phuc Nguyen
// -------------------------------------------------------------------
  createDeposit:function(){
    //create new model Deposit
    var model = new DepositModel;       
    model.set({
      //set date model equal date user input
      'date':$('#date').val(),
      //set username model equal username user input        
      'username':$('#deposit-new-user').val(),
      //set amount model equal amount user input  
      'amount':$('#deposit-amount').val()   
    });
    //get input from user
    //add model in collection                     
    this.collection.add(model);         
    model.on("invalid",function(model,err){
      alert(err);
    });
    //save model in database
    model.save();               
  },
// -------------------------------------------------------------------
// closeDeposit (  )
//
// PARAMETERS:
//            ev: events click
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            sort table deposit, when user click title in  table, display data sorted
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Phuc Nguyen
// -------------------------------------------------------------------
  closeDeposit:function(){
	  this.render();
  },

// -------------------------------------------------------------------
// sortDeposit (ev  )
//
// PARAMETERS:
//            ev: events click
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            sort table deposit, when user click title in  table, display data sorted
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Hung Vo
// -------------------------------------------------------------------
  sortDeposit:function(ev){
    var attribute = $(ev.currentTarget).data('attribute');
    this.collection.comparator = function(menuA,menuB){
      if (menuA.get(attribute) > menuB.get(attribute)) 
        return this.sort_order[attribute];
      if (menuA.get(attribute) < menuB.get(attribute)) 
        return -this.sort_order[attribute];
      return 0;
      }
    this.collection.sort();
    this.collection.sort_order[attribute] = 
    -this.collection.sort_order[attribute];
  },
// -------------------------------------------------------------------
// deleteSelected (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            when user click button delete selected,
//            delete all row,  checked,
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Phuc Nguyen
// -------------------------------------------------------------------
  deleteSelected:function(){
    //assign that equal this, using in each loop
    that =this;           
    //loop though tbody get all td second
    this.$el.find('tbody tr td:nth-child(2) input').each(function(){
      //check if checked then delete 
      if($(this).prop('checked')){
        //get id of model   
        var id=$(this).data('id');
        //get model from collection with id have above          
        var model = that.collection.get(id);
        //remove model out collection   
        that.collection.remove(model);
        //end destroy model from database       
        model.destroy();              
      }
    });
  },
// -------------------------------------------------------------------
// filterDeposit ( ev )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            filter deposit  table follow data ,name
// NOTES:
//            none
// REVISIONS:
//            05/30/2014: Phuc Nguyen
// -------------------------------------------------------------------
  filterDeposit:function(ev){
    //declare var name,date-from,date-to using filter 
  	//get name value filter with name          
    var name = this.$('#user-deposit').val();
    //get date from filter with date   
    var from = this.$('.find-from input').val();
     //get date to filter with date  
    var to = this.$('.find-to input').val();   
    //using _.filter function  in undercore.js to filter data, 
    //all model accord condition stored result`

    var result = _.filter(this.collection.toJSON(),function(model){
    	 //return model have from <= model.date <= to
      if(from&&to) return (model.date>=from&&model.date<=to); 
      //return model accord condition                
      if(name&&from&&to) return (model.username===name&&(model.date>=from&&model.date<=to));
      //return model accord condition username equal name user input       
      if(name) return model.username===name;                         
    });

    //after filter,render view with result found
    this.$el.html(Templates['deposit/deposit']({
      deposit: result,'user':userCollection.toJSON()
      }));
     //render subview 
    for (i in result){
      var model = result[i];
      this.$('tbody').append(
        this.subViews[model.id].el);
    }
    //after render, display again calendar
   displayCalendar();
  }
})