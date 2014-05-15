var SubMenuView = Backbone.View.extend({
    render: function() {
        this.$el.html(Templates['menu/submenu_view'](this.model.attributes));
        this.$('.datepicker').datepicker({
            showOn: "button",
            buttonImage: "images/calendar.png",
            buttonImageOnly: true,
        });
        return this.el;
    }
});