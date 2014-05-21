var CreateMenuView = Backbone.View.extend({
    tagName: 'div',
    className: 'mn-create-menu',
    id: 'create_menu',
    subViews: {},
    initialize: function() {
         this.render();        
        this.listenTo(this.collection, 'add reset destroy', this.render);  
        this.Add();
    },
    render: function() {
        this.$el.html(Templates['menu/create_menu']({'dish_menu':this.collection.models,'list':dishListCollection.toJSON()}));
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
    Add:function(){
    	var model = new DishMenuModel;        
        this.subViews[model.cid] = new CreateDishView({model:model});        
        this.collection.add(model);
    },
    Save:function(){
        //set variable redirect if true(all model saved) otherwise false if anymodel not saved
        //At the botton function, check if redirect true then redirect to Page memu otherwise if redirect false stay current page
        //reinput model invaid until model valid
        var redirect='true';                                    //default set true
        var that = this;                                        //asign that = this, using in each context
       
        _.each(this.collection.models, function(model) {
            //set check attribute , if check is true, model is valid otherwise model is invalid
            model.set({'check':'true'});                        //set check attribute  default is true   
            //check model is valid or invalid
            model.on('invalid',function(model,err){
                alert(err);
                this.set({'check':'false'});                    //model is invalid so set check is false
                redirect ='false';                              //set redirect is false cause model above is invalid                                  
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