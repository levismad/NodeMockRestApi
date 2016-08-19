var utils	= require("./lib/utils");
var express = require("C:/Users/resource/AppData/Roaming/npm/node_modules/express");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // ler bodies json
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Loggar rotas requisitadas
app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}'`);
	next();
});

//Configuração da Api Mockada
this.data = require("./config");


//Interface externa para POC
app.use(express.static("./public"));

//POC -> Com grandes arrays de objetos
// for(var ndx = 0;ndx< 10000; ndx++){
// 	this.data.collection.push({id: ndx, value: ndx + " val" });
// }

this.data.rotas.forEach(function(item) {
	switch(item.method){
		case "GET":
			app.get(item.url, function(req, res) {
				var re = /:\w+/gi;
				var args = [];
				if(re.test(item.url)){
					var params = item.url.match(re);
					
					params.forEach(function(param){
						var paramInitialPosition = item.url.indexOf(param);
						paramInitialPosition = item.url.substr(0,paramInitialPosition);
						var numberOfSlashs = (paramInitialPosition.match(/\//g) || []).length;
						var paramValue = utils.getPosition(req.originalUrl,"/",numberOfSlashs)  + 1;
						var aux = req.originalUrl.substr(paramValue);
						paramValue = req.originalUrl.substr(paramValue,paramValue + parseInt(utils.getPosition(aux,"/",1)));
						args.push(paramValue);
					});
					res.json(item.action(args));
				}
				else{
					res.json(item.action());
				}
			});
			break;

		case "POST":
			app.post(item.url, function(req, res) {
				res.json(item.action(req.body));
			});
			break;

		case "DELETE":
			app.delete(item.url, function(req, res) {
				res.json(item.action(req.body));
			});
			break;

		default: break;
	}
});


app.listen(3000);

console.log("Express app running on port 3000");

module.exports = app;