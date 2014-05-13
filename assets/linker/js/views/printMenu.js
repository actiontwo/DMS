var PrintMenuView = Backbone.View.extend({
	 tagName: 'div',
    className: 'mn-print-menu',
    id: 'print_menu',
    initialize: function() {
        this.listenTo(this.collection, 'sync reset sort', this.render);
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
    },
    page:0,
    number:5,
    render: function() {
        this.$el.html(Templates['menu/print_menu']({
            menu: this.collection.toJSON()
        }));
        // Calendar
        this.$('.datepicker').datepicker({      
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
        return this;
    },
    events: {
        'click th': 'sortMenu',
        'click .confirm':'filterMenu'
    },
    sortMenu: function(ev) {
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
    filterMenu:function(){
        var from = $('.find-from input').val();
        var to = $('.find-to input').val();
        if(from>to||from===''||to===''){
            alert('Input invalid');
            return;
        }
        var event = _.filter(this.collection.toJSON(),function(model){
            return (model.date>=from&&model.date<=to);
        });
        //check result search
        
          //render view
         this.$el.html(Templates['menu/print_menu']({
            menu: event
        }));
        //calendar
         this.$('.datepicker').datepicker({      
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });    
    }
});