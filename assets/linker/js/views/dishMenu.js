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
//          DishMenuView
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
// DishMenuView ( @parameter1 )
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

var DishMenuView = Backbone.View.extend({
    tagName: 'div',
    className: 'menus',
    id: 'dish_menu',
    subViews: {},
    page:0,
    number:5,
// -------------------------------------------------------------------
// initialize (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no return
// DEPENDENCIES:
//            init class DishMenu
// PURPOSE:
//            render view for menu page
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
    initialize: function(options) { 
        //listen event on collection if collection change then render view      
        this.listenTo(this.collection, 'reset  destroy sort sync remove', this.render);  
        //using for sort order
        this.collection.sort_order = {
            date: 1,
            brunch: 1,
            dish1: 1,
            dish2: 1,
            dish3: 1,
            dish4: 1,
            dish5: 1,
            note: 1
        };
        //init page and perPage(number)
        if(typeof options ==="underfind"){
            this.page = options.page;
            this.number = options.number;
        }else{
            this.page=0;
            this.number=5;
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
//            rendersubView
// PURPOSE:
//            render view for menu page
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
    render: function() {
        this.$el.html(Templates['menu/view_menu']({
            'dish_menu':this.collection.toJSON(),
            'list':dishListCollection.toJSON()
        }));
        for (i in this.collection.models) {
            var model = this.collection.models[i];
            this.subViews[model.id] = this.renderSubView(model);
        }
        displayCalendar();//display calendar jquery ui
        var number = this.number;
        this.$('#menu_number').find('option').each(function(){
            if(number==$(this).html())
                $(this).attr('selected','selected');
        })   
        
    },

    events:{
        'click th':'sortMenu',
        'click #menu_prev': 'prevPage',
        'click #menu_next':'nextPage',
        'change #menu_number':'selectPerPage',
        'click #filter_menu': 'filterMenu'
    },
// -------------------------------------------------------------------
// sortMenu ( ev )
//
// PARAMETERS:
//            ev: events
// RETURNS:
//            no
// DEPENDENCIES:
//            none
// PURPOSE:
//            when user click header table, menu page display data sorted
// NOTES:
//            none
// REVISIONS:
//            05/01/2014: Hung Vo
// -------------------------------------------------------------------
    sortMenu:function(ev){
        var attribute = $(ev.currentTarget).data('attribute');
        this.collection.comparator = function(menuA, menuB) {            
            if (menuA.get(attribute) > menuB.get(attribute)) 
                return this.sort_order[attribute];
            if (menuA.get(attribute) < menuB.get(attribute)) 
                return -this.sort_order[attribute];
            return 0;
        };
        this.collection.sort();
        // reverse sort direction
        this.collection.sort_order[attribute] = -this.collection.sort_order[attribute];
    },
// -------------------------------------------------------------------
// prevPage (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no
// DEPENDENCIES:
//            none
// PURPOSE:
//            every this function called, menu page  get previous data 
//            from server through fetch() display previous Page
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen, Duong Linh
// -------------------------------------------------------------------
    prevPage:function(){
        //if user click prev button, page decrease one unit 
       this.page--;
       //if page less than zero,
       //set page equal zero 
       if(this.page<0)                                  
            this.page=0;  
        //set a url typical   page current                              
       var url='menu/page/'+this.page+'/n'+this.number;
       //make url in broswer change to url above 
       appRouter.navigate(url,{trigger:false,replace:true});
       //fetch data for new page 
       this.collection.fetch({data:$.param({page:this.page,number:this.number})});
    },
// -------------------------------------------------------------------
// nextPage (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no
// DEPENDENCIES:
//            none
// PURPOSE:
//            every this function called, menu page  get next data
//            from server through fetch() display next Page
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen, Duong Linh
// -------------------------------------------------------------------
    nextPage:function(){   
        //if user click next button, page increase one unit  
       this.page++;
        //if page current not found any data, toward the page end.
        //decrease one unit
       if(this.collection.length==0)                    
            this.page--;
        //set url typical page current                               
       var url = 'menu/page/'+this.page+'/n'+this.number;
       //make url in browser change to url above
       appRouter.navigate(url,{trigger:false,replace:true});
       //fetch data for new page
      this.collection.fetch({data:$.param({
        page:this.page,number:this.number})
        });
    },
// -------------------------------------------------------------------
// selectPerPage ( ev )
//
// PARAMETERS:
//            ev :events
// RETURNS:
//            no
// DEPENDENCIES:
//            none
// PURPOSE:
//            select number dish menu display in one page
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen, Duong Linh
// -------------------------------------------------------------------
    selectPerPage:function(ev){
        //if user select number per page,
        //get number user select 
        var number = $(ev.currentTarget).val();
        //asign this.number equal user select 
        this.number = number;
        //set url typical page current                   
        var url = 'menu/page/'+this.page+'/n'+this.number;
        //make url in browser change to url above  
        appRouter.navigate(url,{trigger:false,replace:true});
        //fetch data
        this.collection.fetch({data:$.param({
            page:this.page,number:number})
        }); 
    },
// -------------------------------------------------------------------
// filterMenu (  )
//
// PARAMETERS:
//            no
// RETURNS:
//            no
// DEPENDENCIES:
//            none
// PURPOSE:
//            filter dish menu with date, if dish menu have date term condition 
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen, Duong Linh
// -------------------------------------------------------------------
    filterMenu:function(){
        var from = this.$('.find-from input').val();
        var to   = this.$('.find-to input').val();
        //check date filter
         if(from>to||from===''||to===''){
            alert('Input invalid, from must be less to');
            return;
        }
        var result = _.filter(this.collection.toJSON(),function(model){
            return (model.date>=from&&model.date<=to);
        });
        //check result
        if(result.length<=0){
            alert('No found menu');
            return;
        }
        this.renderFilter(result,'tbody','menu/view_menu');
    },
// -------------------------------------------------------------------
// renderFilter ( result,element,template )
//
// PARAMETERS:
//            result: array model 
//            element: dom html (string)
//            template:  path template render(string)
// RETURNS:
//            no return
// DEPENDENCIES:
//            none
// PURPOSE:
//            render result after filter
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
    renderFilter:function(result,element,template){
        //render view
         this.$el.html(Templates[template]({
            dish_menu: result
        }));
        for (i in result) {
            var model = result[i]; 
            this.$(element).append(
           this.subViews[model.id].el);
        }
        //calendar
         displayCalendar();
        $('.find-from input').val(from);
        $('.find-to input').val(to);
    },
// -------------------------------------------------------------------
// renderSubView ( model )
//
// PARAMETERS:
//            model: DishMenuModel
// RETURNS:
//            SubMenuView
// DEPENDENCIES:
//            none
// PURPOSE:
//            render subview for menu page
// NOTES:
//            none
// REVISIONS:
//            05/29/2014: Phuc Nguyen
// -------------------------------------------------------------------
    renderSubView:function(model){
            //  check date current if current date greater 
            //  model.attributes.date then model can edit,
            //  otherwise model can't edit
            //  get current date with format mm/dd/yyyy 
            var now = formatDate(); 
            //  editor is true then model can edit
            //  else model can't edit
            if(model.attributes.date>=now)          
                model.set({'editor':'true'})                       
            else 
                model.unset('editor');                           
            //create a new subView
            var submenu_view = new SubMenuView({
                model:model,el:this.$('tr[data-id="' + model.id + '"]')
            });
            //Render Subview 
            submenu_view.render();  
            //a object subViews manager subView
            return submenu_view; 
    }
});