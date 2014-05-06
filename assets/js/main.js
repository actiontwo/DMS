$(function() {
    var menuModel = new MenuModel();
    var suggestionModel = new Suggestion();
    var popupPrintModel = new PrintModel();
    var popupDishModel = new ListDish();
    console.log('MenuView1');
    var menuView = new MenuView({
        model: menuModel,
        el: '.menus'
    });
    menuModel.fetch().done(
    	function(){
    		menuView.render();
    	}
    )
   
    // menuModel.save({
    // 		no:'9',
    // 		date:'date',
    // 		brunch:'lunch',
    // 		dish1:'dish1',
    // 		dish2:'dish2',
    // 		dish3:'dish3',
    // 		dish4:'dish4',
    // 		dish5:'dish5',
    // 		note:'note'
    // 	});

    // var createMenuView = new PopupMenuView({
    //     el: '.mn-create-menu'
    // });
    var suggestionView = new SuggestionView({
        model: suggestionModel,
        el: '.suggestion'
    });
    suggestionModel.fetch().done(
        function() {
            suggestionView.render();
        });
    // var popupDishView = new PopupDishView({
    //     model: popupDishModel,
    //     el: '.mn-create-dish'
    // });
    // popupDishModel.fetch().done(
    //     function() {
    //         popupDishView.render();
    //     });

    // var popupPrintView = new PopupPrintView({
    //     model: popupPrintModel,
    //     el: '.mn-print-menu'
    // });
    // popupPrintModel.fetch().done(
    //     function() {
    //         popupPrintView.render();
    //     });

});