var customers = require('./../controllers/customers_controller');
var products = require('./../controllers/product_controller');
var orders = require('./../controllers/orders_controller');
var routes = require('./');
var user = require('./user');
var about = require('./about');

module.exports = {
	route : function(app) {

app.get('/products/get', products.getProducts);
app.get('/getProduct', products.getProduct);
app.get('/orders/get', orders.getOrders);
app.post('/orders/add', orders.addOrder);
app.get('/customers/get', customers.getCustomer);
app.post('/customers/update/shipping', customers.updateShipping);
app.post('/customers/update/billing', customers.updateBilling);
app.post('/customers/update/cart', customers.updateCart);
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/about', about.about);
app.get('/connect', function(req, res) {
	/* Handling the AngularJS connect request*/
	console.log(req.body);
	res.setHeader('Content-Type', 'application/json');
	/*response has to be in the form of a JSON*/
	req.body.serverMessage = "NodeJS replying to angular"
	/*adding a new field to send it to the angular Client */
	res.end(JSON.stringify(req.body));
	console.log(res);
	/*Sending the respone back to the angular Client */

});
}
}