var DishMenuView = Backbone.View.extend({
    tagName: 'div',
    className: 'menus',
    id: 'dish_menu',
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
    render: function() {
        this.$el.html(Templates['menu/view_menu']({
            menu: this.collection.toJSON()
        }));
        init();
        
    },
    events: {
        'click [id^="edit-menu"]': 'editMenu',
        'click [id^="save-menu"]': 'saveMenu',
        'click th': 'sortMenu',
        'click #menu_prev': 'prev',
        'click #menu_next':'next'
    },
    editMenu: function(ev) {
        // change current values fields into text fields
        $(ev.currentTarget).parents('[id^=menu_]').find('td').each(function() {
            if (!$(this).find('[id^="edit-menu"]').length) {
                var text = $(this).html();
                $(this).html('<input type="text" value="' + text + '">');
            }
        });
        $(ev.currentTarget).parents('[id^=menu_]').find('td:first-child').find('input').addClass('datepicker');
        $(ev.currentTarget).parents('[id^=menu_]').find('td:nth-child(2)').html('<select><option>Lunch</option><option>Dinner</option></select>');
        // change edit icon to save icon		
        $(ev.currentTarget).attr('id', function() {
            return $(this).attr('id').replace('edit', 'save');
        });
        // bind save event to the button
        this.delegateEvents();
        init();
    },
    saveMenu: function(ev) {
        var id = $(ev.currentTarget).data('id');
        var model = this.collection.get(id);
        // go through each attributes and update the model
        $(ev.currentTarget).parents('[id^=menu_]').find('td').each(function() {
            if ($(this).find('input').length) {
                model.set($(this).data('attribute'), $(this).find('input').val());
            }
        });
        $(ev.currentTarget).parents('[id^=menu_]').find('td').each(function() {
            if ($(this).find('select').length) {
                model.set($(this).data('attribute'), $(this).find('select').val());
            }
        });
        model.save();
        // change save icon to edit icon,
        $(ev.currentTarget).attr('id', function() {
            return $(this).attr('id').replace('edit', 'save');
        });
        // bind edit event to the button
        this.render();
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
    prev:function(){
        if(this.page>0){
                this.page--;
            this.collection.fetch({data:$.param({page:this.page,number:5})});
        }
        else
            this.page==0;
        
    },
    next:function(){
        if(this.page<2) {
            this.page++;
            this.collection.fetch({data:$.param({page:this.page,number:5})});
        }
        else
            this.page==2;
        
        
    }
})