var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var productRouter = require('./product.route');

app.use(express.Router());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use('/', productRouter);


// use port 3000 unless there exists a preconfigured port
var port = process.env.port || 3000;

app.listen(port);