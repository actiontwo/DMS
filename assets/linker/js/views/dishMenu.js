var DishMenuView = Backbone.View.extend({
    tagName: 'div',
    className: 'menus',
    id: 'dish_menu',
    subViews: {},
    page:0,
    number:5,
    initialize: function(options) {        
        this.listenTo(this.collection, 'reset  destroy sort sync remove', this.render);  
        this.render();
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
        this.page = options.page;
        this.number = options.number;     
    },
    render: function() {
        this.$el.html(Templates['menu/view_menu']({'dish_menu':this.collection.toJSON(),'list':dishListCollection.toJSON()}));
        for (i in this.collection.models) {
            var model = this.collection.models[i];
            //check date current if current date greater model.attributes.date then model can edit, otherwise model can't edit
            var now = formatDate();                                //get current date with format mm/dd/yyyy 
            if(model.attributes.date>=now)          
                model.set({'editor':'true'})                       //editor is true then model can edit
            else 
                model.unset('editor');                            //model can't edit
            //create a new subView
            var submenu_view = new SubMenuView({model:model,el:this.$('tr[data-id="' + model.id + '"]')});
            submenu_view.render();                               //Render Subview   
            this.subViews[model.id] =  submenu_view;               //a object subViews manager subView
        }
        //display calendar
        this.$('.datepicker').datepicker({
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
        var number = this.number;
        this.$('#menu_number').find('option').each(function(){
            if(number==$(this).html())
                $(this).attr('selected','selected');
        })    
    },
    pagination:function(){
        
    },
    events:{
        'click th':'sortMenu',
        'click #menu_prev': 'prev',
        'click #menu_next':'next',
        'change #menu_number':'select',
        'click #filter_menu': 'filterMenu'
    },
    //Add Menu Sort functionn
    sortMenu:function(ev){
        var attribute = $(ev.currentTarget).data('attribute');
        this.collection.comparator = function(menuA, menuB) {            
            if (menuA.get(attribute) > menuB.get(attribute)) return this.sort_order[attribute];
            if (menuA.get(attribute) < menuB.get(attribute)) return -this.sort_order[attribute];
            return 0;
        };
        this.collection.sort();
        // reverse sort direction
        this.collection.sort_order[attribute] = -this.collection.sort_order[attribute];
    },
    prev:function(){
        //if user click prev button, page decrease one unit 
       this.page--;
       if(this.page<0)                                  //if page less than zero, 
            this.page=0;                                //set page equal zero
       var url='menu/page/'+this.page+'/n'+this.number; //set a url typical   page current
       appRouter.navigate(url,{trigger:false,replace:true});//make url in broswer change to url above 
       this.collection.fetch({data:$.param({page:this.page,number:this.number})});//fetch data for new page
    },
    next:function(){   
        //if user click next button, page increase one unit  
       this.page++;
       if(this.collection.length==0)                    //if page current not found any data, toward the page end.
            this.page--;                                //decrease one unit
       var url = 'menu/page/'+this.page+'/n'+this.number;//set url typical page current
       appRouter.navigate(url,{trigger:false,replace:true});//make url in browser change to url above
      this.collection.fetch({data:$.param({page:this.page,number:this.number})});//fetch data for new page
    },
    select:function(ev){
        //if user select number per page, 
        var number = $(ev.currentTarget).val(); //get number user select
        this.number = number;                   //asign this.number equal user select
        var url = 'menu/page/'+this.page+'/n'+this.number;  //set url typical page current
        appRouter.navigate(url,{trigger:false,replace:true});//make url in browser change to url above
        this.collection.fetch({data:$.param({page:this.page,number:number})});//fetch data 
    },
    filterMenu:function(){
        var from = $('.find-from input').val();
        var to   = $('.find-to input').val();
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
        //render view
         this.$el.html(Templates['menu/view_menu']({
            dish_menu: result
        }));
        for (i in result) {
            var model = result[i]; 
            this.$('tbody').append(
           this.subViews[model.id].el);
        }

        //calendar
         this.$('.datepicker').datepicker({      
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
        $('.find-from input').val(from);
        $('.find-to input').val(to);
    },
});