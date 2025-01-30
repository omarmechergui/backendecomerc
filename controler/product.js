const Product = require('../model/product');

const AddProuct = async (req, res) => {
    try {
        if (req.user.role == 'admin') {
            const newProduct = new Product(req.body);
            await newProduct.save();
            res.status(200).send({ msg: 'Product added successfully', newProduct });
        } else {
            res.status(400).send({ msg: 'You are not authorized to perform this action' });
        }
    } catch (error) {
        res.status(500).send({ msg: 'Error adding product', error });
    }
};

const GetProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send({ msg: 'Products fetched successfully', products });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching products', error });
    }
};

const getbyid = async (req, res) => {
    try {
        const oneproduct = await Product.findById(req.params.id);
        res.status(200).send({ msg: 'Product fetched successfully', oneproduct });
    } catch (error) {
        res.status(500).send({ msg: 'Error fetching product', error });

    }
}

const updateProduct = async (req, res) => {
    try {
        if (req.user.role == 'admin') {

            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).send({ msg: 'Product updated successfully', updatedProduct });
        }
        else {
            res.status(400).send({ msg: 'You are not authorized to perform this action' });
        }
    } catch (error) {
        res.status(500).send({ msg: 'Error updating product', error });
    }
}
const DeleteProduct = async (req, res) => {
    try {
        if (req.user.role == 'admin') {
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
            res.status(200).send({ msg: 'Product deleted successfully', deletedProduct });
        } else {
            res.status(400).send({ msg: 'You are not authorized to perform this action' });
        }
    } catch (error) {
        res.status(500).send({ msg: 'Error deleting product', error });
    }
}


module.exports = { AddProuct, GetProduct , DeleteProduct, updateProduct, getbyid };