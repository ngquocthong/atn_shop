
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const productController = require('./controller/productController');
const employeeController = require('./controller/employeeController');

const app = express();
require('./models/db');
app.use(express.static(__dirname + '/public'));

// app.use('/css', express.static(__dirname + 'public/css'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.set('views', path.join(__dirname, '/views/'))

app.engine('hbs', expressHandlebars({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))

app.get('/', function (req, res) {
    res.send('Hello world')
})
app.set('view engine', 'hbs');

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is listening on Port 3000");
})

app.use('/product', productController);
app.use('/employee', employeeController);
