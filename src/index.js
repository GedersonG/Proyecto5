const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();

// Importing routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const debtRoutes = require('./routes/debt');
const saleRoutes = require('./routes/sale');
const { urlencoded } = require('express');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'supermercado_eltio'
}, 'single'))
app.use(express.urlencoded({extended: false}));

// Routes
app.use('/', userRoutes);
app.use('/products', productRoutes);
app.use('/debts', debtRoutes);
app.use('/sales', saleRoutes);

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});
