const express = require('express');
const rateLimit = require('express-rate-limit');

const apiLimit = rateLimit({
  windowMs: 15 * 60 * 3,
  max: 100,
  message: 'You have exceeded the 100 requests in 15 minutes limit!',
});

const routes = express.Router();
const customerController = require('../controllers/customers'); // เปลี่ยนให้ตรงกับชื่อไฟล์

routes.post('/customers', apiLimit, customerController.createCustomer);
 routes.put('/customer/:id', customerController.updateCustomer);
 routes.delete('/customer/:id', customerController.deleteCustomer);
 routes.get('/customer/:id', customerController.getCustomer);
 routes.get('/customers', customerController.getCustomers);


const productController = require('../controllers/products'); // อ้างอิง controller ที่สร้างไว้

routes.post('/products', apiLimit, productController.createProduct);
routes.get('/products', productController.getProducts);
routes.get('/product/:id', productController.getProduct);
routes.put('/product/:id', productController.updateProduct);
routes.delete('/product/:id', productController.deleteProduct);

module.exports = routes;





