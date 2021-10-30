const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const connectdb = require('./_helper/db');
connectdb();
const errorHandler = require('./_helper/errorhandler');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/user', require('./register/register.router'));
app.use('/user', require('./login/login.router'));
app.use('/orders', require('./orders/orders.router'));
app.use('/checklist', require('./checklist/checklist.router'));

app.use(errorHandler);
app.get('/url', (req, res, next) => {
	console.log('get data');
	res.json(['Tony', 'Lisa', 'Michael', 'Ginger', 'Food']);
});

const port = process.env.port || 4000;

app.listen(port, function () {
	console.log('Server listening on port ' + port);
});
