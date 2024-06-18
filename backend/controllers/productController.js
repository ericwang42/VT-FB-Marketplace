const Product = require('../models/product');

exports.createProduct = async (req, res) => {
    try {
        const { title, price, status, condition, user, coverImage, category } = req.body;
        const product = new Product({
            title,
            price,
            status,
            condition,
            user,
            coverImage,
            category
        });

        await product.save();
        res.status(201).json({ message: 'Product created successfully', productId: product._id });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        await Product.findByIdAndDelete(productId);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId).populate('user', 'firstName lastName'); 
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('user', 'firstName lastName');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};

exports.getProductsByTitle = async (req, res) => {
    try {
        const { title } = req.query; 
        const products = await Product.find({ title: new RegExp(title, 'i') });

        if (!products.length) {
            return res.status(404).json({ message: "No products found with provided title" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products by title', error });
    }
};
