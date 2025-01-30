const express = require('express');
const { AddProuct, GetProduct, DeleteProduct, updateProduct, getbyid } = require('../controler/product');
const isauth = require('../middleware/isauth');
const productRouter = express.Router();

productRouter.post('/add',isauth, AddProuct);
productRouter.get('/getall', GetProduct);
productRouter.get('/getbyid/:id', getbyid);
productRouter.put('/update/:id',isauth, updateProduct);
productRouter.delete('/delete/:id',isauth, DeleteProduct);

module.exports = productRouter;