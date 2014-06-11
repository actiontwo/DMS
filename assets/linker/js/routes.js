var dishListCollection = new DishListCollection;
dishListCollection.fetch();
var userCollection = new UserCollection;
userCollection.fetch();

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'loadRegisterMeal',
    'menu': 'loadDishMenu',
    'menu/page/:page/n:number': 'paginationMenu',
    'menu/print': 'loadPrintMenu',
    'expense': 'loadExpenseMenu',
    'menu/create_dish': 'createDish',
    'menu/create_menu': 'createMenu',
    'deposit': 'loadDeposit',
    'register_meal': 'loadRegisterMeal',
    'profile/user': 'updateProfile',
    'login': 'loadLogin',
    'expense/create_expense': 'createExpense',
    'report': 'loadReport',
    'report/btn-rp-cost-meal': 'loadReport',
    'report/btn-rp-expense': 'loadReportExpense',
    'active/:id/:remember': 'activeAcount'
  },
  initialize: function () {
    if(userLogin) {
      this.dishMenuView = new DishMenuView({
        collection: new DishMenuCollection
      });

      this.printMenuView = new PrintMenuView({
        collection: new DishMenuCollection
      });

      this.expenseMenuView = new ExpenseMenuView({
        collection: new ExpenseMenuCollection
      });

      this.dishListView = new DishListView({
        collection: new DishListCollection
      });
      this.createMenuView = new CreateMenuView({
        collection: new DishMenuCollection
      });

      this.depositView = new DepositView({
        collection: new DepositCollection
      });
      this.registerMealView = new RegisterMealView({
        collection: new RegisterMealCollection
      });

      this.dishMenuView = new DishMenuView({
        collection: new DishMenuCollection
      });

      this.userView = new UserView({
        model: userLogin
      });
      //    var userModel = new UserModel();
      //    userModel.set({
      //      'login': 'true'
      //    });
      this.loginView = new LoginView({
        model: new UserModel({
          set: {
            'login': 'true'
          }
        })
      });
      this.reportView = new ReportView({
        collection: new DepositCollection
      });

      this.reportExpenseView = new ReportExpenseView({
        collection: new ExpenseMenuCollection
      });
    }
  },
  loadDishMenu: function () {
    if (userLogin) {
      this.dishMenuView.collection.fetch({
        data: $.param({
          page: 0,
          number: 5
        })
      });
      $("#main").html(this.dishMenuView.el);
    }
  },
  loadPrintMenu: function () {
    if (userLogin) {
      this.printMenuView.collection.fetch();
      $('#main').html(this.printMenuView.el);
    }
  },
  loadExpenseMenu: function () {
    if (userLogin) {
      this.expenseMenuView.collection.fetch();
      $("#main").html(this.expenseMenuView.el);
    }
  },
  createDish: function () {
    if (userLogin) {
      this.dishListView.collection.fetch();
      $('#main').html(this.dishListView.el);
    }
  },
  createMenu: function () {
    if (userLogin) {
      $("#main").html(this.createMenuView.el);
    }
  },
  loadDeposit: function () {
    if (userLogin) {
      this.depositView.collection.fetch();
      $("#main").html(this.depositView.el);
    }
  },
  loadRegisterMeal: function () {
    if (userLogin) {
      this.registerMealView.collection.fetch();
      $("#main").html(this.registerMealView.el);
    }
  },
  paginationMenu: function (page, number) {
    if (userLogin) {
      this.dishMenuView.collection.fetch({
        data: $.param({
          page: page,
          number: number
        })
      });
      $("#main").html(this.dishMenuView.el);
    }
  },
  updateProfile: function () {
    $('#main').html(this.userView.el);
  },
  loadLogin: function () {
    console.log('login');
    $("#main").html(this.loginView.el);
  },

  createExpense: function () {
    // var createExpenseCollection = new ExpenseMenuCollection();
    // var createExpenseView = new CreateExpenseView({collection: createExpenseCollection});
    // $("#main").html(createExpenseView.el);
  },
  loadReport: function () {
    this.reportView.collection.fetch();
    $('#main').html(this.reportView.el);
  },
  loadReportExpense: function () {
    if (userLogin) {
      this.reportExpenseView.collection.fetch();
      $('#main').html(this.reportExpenseView.el);
    }
  },
  activeAcount: function (id, remember) {
    userLogin = new UserModel({
      id: id
    });

    userLogin.fetch().done(function (account) {
      if (remember === 'remember') {
        setCookie('userId', account.id, 1);
        setCookie('lastname', account.lastname, 1);
        setCookie('firstname', account.firstname, 1);
        window.location = '/';
      }
      this.initialize();
      appRouter.navigate('/', {
        trigger: true,
        replace: true
      });
    });
  }
});
console.log(userLogin);

  var appRouter = new AppRouter();
  Backbone.history.start();
