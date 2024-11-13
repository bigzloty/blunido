// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../category/Product');

// Fetch products by category
router.get('/category/:category', async (req, res) => {
    try {
      const category = req.params.category.toLowerCase(); // Standardize to lowercase
      const products = await Product.find({ category });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products by category'});
  }
  });

module.exports = router;