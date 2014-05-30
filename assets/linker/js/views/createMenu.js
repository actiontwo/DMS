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
//          CreateMenuView
// Functions:
//          one ; two ; three
// Called From:
//          (script) assets/linker/router.js
// Author:
//          Nguyen Phuc (phucnt@designveloper.com)
// Notes:
//          Additional information [long version]
// Changelog:
//          05/29/2014 - Phuc Nguyen - Init DishMenuView, refactor code.
// ============================================================================
//

// -------------------------------------------------------------------
// CreateMenuView ( @parameter1 )
//
// PARAMETERS:
//            @parameter1 () collection DishMenuCollection
// METHODS:
//            initialize, render, renderSubMenu, renderFilter
//            sortMenu, prevPage, nextPage, selecPerPage, filterMenu
// DEPENDENCIES:
//            none
// PURPOSE:
//            Use this function to create View for page Menu
// NOTES:
//            none
// REVISIONS:
//            05/29/14 - Phuc Nguyen Initial Class, refactor code.
// -------------------------------------------------------------------
var CreateMenuView = Backbone.View.extend({
  tagName: 'div',
  className: 'mn-create-menu',
  id: 'create_menu',
  subViews: {},
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
//            init class CreateMenuView
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
  initialize: function() {
    this.render();        
    this.listenTo(this.collection, 'add reset destroy', this.render);  
    this.Add();
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
//            render view, display a  row in page createMenu
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
  render: function() {
    this.$el.html(Templates['menu/create_menu']({
      'dish_menu':this.collection.models,
      'list':dishListCollection.toJSON()
      }));
      //render subview , a row in page
      var subViews = this.subViews;
      this.$('#create-menu').find('tr').each(function(){
      subViews[$(this).data('cid')].setElement(this);
      subViews[$(this).data('cid')].render();
      });
      return this;
    },
    events:{
      'click #btn-add'	: 'Add',
      'click #btn-save'	:'Save',
    },
// -------------------------------------------------------------------
// Add (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            when user click button add, 
//            add a new row in page create menu
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
    Add:function(){
      var model = new DishMenuModel;        
      this.subViews[model.cid] = new CreateDishView({model:model});        
      this.collection.add(model);
    },
// -------------------------------------------------------------------
// Save (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            
// PURPOSE:
//            when user click save button, save all row in page in database
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
    Save:function(){
      //set variable redirect if true(all model saved) 
      //otherwise false if anymodel not saved
      //At the botton function, check if redirect true then 
      //redirect to Page memu otherwise if redirect 
      //false stay current page reinput model invaid until model valid
      //default set true
      var redirect='true';
      //asign that = this, using in each context                                    
      var that = this;                                       
       
      _.each(this.collection.models, function(model) {
          //set check attribute , if check is true,
          // model is valid otherwise model is invalid
          //set check attribute  default is true 
          model.set({'check':'true'});                         
          //check model is valid or invalid
          model.on('invalid',function(model,err){
            alert(err);
            //model is invalid so set check is false
            this.set({'check':'false'}); 
            //set redirect is false cause model above is invalid                    
            redirect ='false';                                                              
            });
            model.save();
            //if model is valid, remove it out collection then render view
            if(model.get('check')=='true'){
              console.log(model);
              that.collection.remove(model);
              that.render();
            }
        })
        //check redirect if true then redirect menu Page
        if(redirect=='true')
          appRouter.navigate("menu", {trigger: true, replace: true});
    }
});