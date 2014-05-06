$(function() {
    var menuModel = new MenuModel();
    var suggestionModel = new Suggestion();
    var popupPrintModel = new MenuModel();
    var popupDishModel = new ListDish();
   
    var popupPrintView = new PopupPrintView({
        model: popupPrintModel,
        el: '.mn-print-menu'
    });
    var menuView = new MenuView({
        model: menuModel,
        el: '.menus'
    });  
 	
    var suggestionView = new SuggestionView({
        model: suggestionModel,
        el: '.suggestion'
    });
  	 var popupDishView = new PopupDishView({
        model: popupDishModel,
        el: '.mn-create-dish'
    });

  	  menuModel.fetch().done(   	
	    	function(){
	    		menuView.render();
	    	});
  	   suggestionModel.fetch().done(    		
        function() {
            suggestionView.render();
        });
  	    popupPrintModel.fetch().done(
        function() {       
            popupPrintView.render();
        });
  	    popupDishModel.fetch().done(
	        function() {
	            popupDishView.render();
	        });
   

    // var menuView = new MenuView({
    //     model: menuModel,
    //     el: '.menus'
    // });
    // menuModel.fetch().done(
    	
	   //  	function(){
	   //  		menuView.render();
	   //  	});
		
   
  
    // var suggestionView = new SuggestionView({
    //     model: suggestionModel,
    //     el: '.suggestion'
    // });
    // suggestionModel.fetch().done(
    		
    //     function() {
    //         suggestionView.render();
    //     });

    //   // menuModel.save({
    // // 		no:'9',
    // // 		date:'date',
    // // 		brunch:'lunch',
    // // 		dish1:'dish1',
    // // 		dish2:'dish2',
    // // 		dish3:'dish3',
    // // 		dish4:'dish4',
    // // 		dish5:'dish5',
    // // 		note:'note'
    // // 	});

    // // var createMenuView = new PopupMenuView({
    // //     el: '.mn-create-menu'
    // // });
    // // var popupDishView = new PopupDishView({
    // //     model: popupDishModel,
    // //     el: '.mn-create-dish'
    // // });
    // // popupDishModel.fetch().done(
    // //     function() {
    // //         popupDishView.render();
    // //     });

    // var popupPrintView = new PopupPrintView({
    //     model: popupPrintModel,
    //     el: '.mn-print-menu'
    // });
    // popupPrintModel.fetch().done(
    //     function() {       
    //         popupPrintView.render();
    //     });
    // //end
});