var dishListCollection = new DishListCollection;
dishListCollection.fetch();
var userCollection = new UserCollection;
userCollection.fetch();

var AppRouter = Backbone.Router.extend({
	routes: {
		'menu': 'loadDishMenu',
		'menu/page/:page/n:number':'paginationMenu',
		'menu/print':'loadPrintMenu',
		'expense': 'loadExpenseMenu',
		'menu/create_dish': 'createDish',
		'menu/create_menu': 'createMenu',
		'deposit':'loadDeposit',
		'register_meal': 'loadRegisterMeal',
		'profile/user/:id':'updateProfile',
		'login':'loadLogin',
		'expense/create_expense': 'createExpense',
		'report': 'loadReport',
		'report/btn-rp-cost-meal': 'loadReport',
		'report/btn-rp-expense': 'loadReportExpense',
		'active/:id/:remember':'activeAcount'
	},
	loadDishMenu: function() {
		if(userLogin){
			dishMenuCollection = new DishMenuCollection;
			dishMenuView = new DishMenuView({collection: dishMenuCollection});
			dishMenuCollection.fetch({data:$.param({page:0,number:5})});		
			$("#main").html(dishMenuView.el);
		}
		else{
			
		}
	},
	loadPrintMenu:function(){
		if(userLogin){
			printMenuCollection = new DishMenuCollection;
			printMenuView = new PrintMenuView({collection:printMenuCollection});
			printMenuCollection.fetch();
			$('#main').html(printMenuView.el);
		}
	},
	loadExpenseMenu: function(){
		if(userLogin){
			var expenseMenuCollection = new ExpenseMenuCollection;
			var expenseMenuView = new ExpenseMenuView({collection: expenseMenuCollection});
			expenseMenuCollection.fetch();
			$("#main").html(expenseMenuView.el);
		}
	},
	createDish: function(){
		if(userLogin){
			dishListCollection = new DishListCollection;
			dishListView = new DishListView({collection:dishListCollection});
			dishListCollection.fetch();
			$('#main').html(dishListView.el);
		}
	},
	createMenu:function(){
		if(userLogin){
			createMenuCollection = new DishMenuCollection;
			createMenuView = new CreateMenuView({collection:createMenuCollection});
			$("#main").html(createMenuView.el);
		}
	},
	loadDeposit:function(){
		if(userLogin){
			depositCollection = new DepositCollection;
			depositView = new DepositView({collection:depositCollection});
			depositCollection.fetch();
			$("#main").html(depositView.el);
		}
	},
	loadRegisterMeal: function(){
		if(userLogin){
			var registerMealCollection = new RegisterMealCollection();
			var registerMealView = new RegisterMealView({collection: registerMealCollection});
			registerMealCollection.fetch();
			$("#main").html(registerMealView.el);
		}
	},
	paginationMenu: function(page, number){
		if(userLogin){
			dishMenuCollection = new DishMenuCollection;
			dishMenuView = new DishMenuView({collection: dishMenuCollection,page:page,number:number});
			dishMenuCollection.fetch({data:$.param({page:page,number:number})});		
			$("#main").html(dishMenuView.el);
		}
	},
	updateProfile:function(id){
			var userModel = new UserModel({id:id});
			var userView = new UserView({model:userModel});
			userModel.fetch();
			$('#main').html(userView.el);
	},
	loadLogin:function(){
		var userModel = new UserModel();
		userModel.set({'login':'true'});
		var loginView = new LoginView({model:userModel});
		$("#main").html(loginView.el);
	},

	createExpense: function(){
		// var createExpenseCollection = new ExpenseMenuCollection();
		// var createExpenseView = new CreateExpenseView({collection: createExpenseCollection});
		// $("#main").html(createExpenseView.el);
	},
	loadReport: function(){
		if(userLogin){
			reportCollection = new ReportCollection;
			reportView = new ReportView({collection: reportCollection});
			// reportCollection.fetch();
			$('#main').html(reportView.el);
		}
	},
	loadReportExpense: function(){
		if(userLogin){
			reportExpenseCollection = new ReportCollection;
			reportExpenseView = new ReportExpenseView({collection: reportExpenseCollection})
			$('#main').html(reportExpenseView.el);
		}
	},
	activeAcount:function(id,remember){
		userLogin = new UserModel({id:id});
		
		userLogin.fetch().done(function(account){
			if(remember==='remember'){
				setCookie('userId',account.id,1);
				setCookie('lastname',account.lastname,1);
				setCookie('firstname',account.firstname,1);
				window.location ='/';
			}
			appRouter.navigate('/',{trigger:true,replace:true});
		});
	}
});


	var appRouter = new AppRouter();	
	Backbone.history.start();

