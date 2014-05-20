var DepositModel = Backbone.Model.extend({
	urlRoot:'/deposit',
	validate:function(attr,option){
		//check user input is Valid
		if(attr.amount<=0)
			return "amount not nagative";
		if(attr.amount  != parseInt(attr.amount))
			return "amount must be integer";
		if(attr.date=='') //check date 
			return "You must enter date";
		if(attr.username=='')
			return "You must be select name";

	}
})