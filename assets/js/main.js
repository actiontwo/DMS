var Dishs = new dishCollection();
$(function() {
    //init backbone model
    var menuModel = new MenuModel();
    var suggestionModel = new Suggestion();
    var popupPrintModel = new MenuModel();
    var popupCreateMenuModel = new MenuModel();
    //init createmenu view
    var popupCreateMenuView = new PopupCreateMenuView({
        model:popupCreateMenuModel,
        el:'.mn-create-menu'
    });
   //init backbone view
    var popupPrintView = new PopupPrintView({
        model: popupPrintModel,
        el: '.mn-print-menu'
    });
    popupPrintView.render();

    var menuView = new MenuView({
        model: menuModel,
        el: '.menus'
    });  
 	menuView.render();

    var suggestionView = new SuggestionView({
        model: suggestionModel,
        el: '.suggestion'
    });
    suggestionView.render();

  	
    
     //fetch data into model, render view
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
  	    
    
});

function createNewDish(){
    $('.mn-create-dish').html('');
    var popupDishModel = new ListDish();
    var popupDishView = new PopupDishView({
        model: popupDishModel,
        collection: Dishs,
        el: 'div.mn-create-dish'
    });
    popupDishView.render();
    Dishs.fetch().done(
        function() {       
            popupDishView.render();
    });
}