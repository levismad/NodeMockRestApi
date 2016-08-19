var _		= require("underscore");
var utils	= require("./lib/utils");
var config	= 
	{
	"rotas": [
		 {
			"url": "/getAll",
			"method": "GET",
			"action": function() {
				try{
					return utils.getReturnMessage(JSON.stringify(config.collection));
				}
				catch(exception){
					return utils.getReturnMessage(null,exception);
				}
			}
		},
		{
			"url": "/getById/:id",			
			"method": "GET",
			"action": function(parms) {
				try{
					var find = _.findWhere(config.collection, {id: parseInt(parms[0])});
					if(find){
						return utils.getReturnMessage(JSON.stringify(
							_.findWhere(config.collection, {id: parseInt(parms[0])})
						));
					}
					return utils.getReturnMessage(null,"element not found");
				}
				catch(exception){
					return utils.getReturnMessage(null,exception);
				}
				
			}
		},
		{
			"url": "/getById",
			"method": "POST",
			"action": function(requestBody) {
				
				try{
					var key = requestBody.id;
					var content = requestBody.value;
					var find = false;
					_.map(config.collection, function(obj){
						if(obj.id.toString()==key) {
							obj.value = content;
							find = true;
						}
					});
					if(find)
						return utils.getReturnMessage(/*JSON.stringify(config.collection) */);
					
					return utils.getReturnMessage(null,"element not found");
				}
				catch(exception){
					return utils.getReturnMessage(null,exception);
				}
			}
		},
		{
			"url": "/insert",
			"method": "POST",
			"action":function(requestBody) {
				try{
					var exists = false;
					var key = requestBody.id;
					var content = requestBody.value;
					
					exists = _.findWhere(config.collection, {id: parseInt(key)}) ? true : false;
					if(!exists){
						config.collection.push({id: parseInt(key), value: content});
					return utils.getReturnMessage(/*JSON.stringify(config.collection) */);
					}
					
					return utils.getReturnMessage(null,"element already exists!");
				}
				catch(exception){
					return utils.getReturnMessage(null,exception);
				}
				
			}
		},
		{
			"url": "/delete",
			"method": "POST",
			"action": function(requestBody) {
				try{
					var key = requestBody.id;
					config.collection = _.filter(config.collection, function(item) { return item.id != parseInt(key); });

					return utils.getReturnMessage(/*JSON.stringify(config.collection) */);
				}
				catch(exception){
					return utils.getReturnMessage(null,exception);
				}
				
			}
		}		
		],
		"collection": [
		{
			"id": 9999,
			"value": "DESAFIO REALIZADO"
		}
		]
	};

module.exports = config;