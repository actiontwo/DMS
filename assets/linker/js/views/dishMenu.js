var DishMenuView = Backbone.View.extend({
    tagName: 'div',
    className: 'menus',
    id: 'dish_menu',
    subViews: {},
    page:1,
    number:5,
    initialize: function() {        
        this.listenTo(this.collection, 'reset destroy sort sync', this.render);  
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
        this.page = 1;
        typeof(this.number) != 'underfined' || (this.number = 5);        
    },
    render: function() {
        this.$el.html(Templates['menu/view_menu']({'dish_menu':this.collection.toJSON(),'list':dishListCollection.toJSON()}));
        for (i in this.collection.models) {
            var model = this.collection.models[i];
            var submenu_view = new SubMenuView({model:model,el:this.$('tr[data-id="' + model.id + '"]')});
            submenu_view.render();   
            this.subViews[model.id] =  submenu_view;
        }
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
        var that =this;   
       if(this.page){
             if($('tbody').html()){
                    this.page--;
                     this.collection.fetch({
                            data:$.param({page:this.page,number:this.number})
                        }).done(function(){
                               
                            });       
                    return;
            }
        }
        else
            return;
    },
    next:function(){
        var that =this;
        if(this.collection.length){ 
              this.collection.fetch({
                data:$.param({page:this.page,number:this.number})
            }).done(function(){
                if($('tbody').html())
                    that.page++;
                return;
            });
        } 
        else{
            this.page = that.page;
            return;
        }
    },
    select:function(ev){
        var number=$(ev.currentTarget).val();
        this.number = number;
        this.collection.fetch({data:$.param({page:this.page,number:number})});
    },
    filterMenu:function(){
        var from = $('.find-from input').val();
        var to = $('.find-to input').val();
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