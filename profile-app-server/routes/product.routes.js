const express = require('express');
const router = express.Router();

const Product = require('../models/Product.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');



//  POST /api/userId/products - Retrieves all of the products

router.post('/:userId/products', isAuthenticated, async (req, res, next) => {
    try {
      const { userId } = req.params;
      const sellerId = req.payload._id;

      // Verifying if the authenticated user is the one making the request
      if (userId !== sellerId.toString()) {
        return res.status(403).json({ message: "Unauthorized: You can only add products to your own account." });
      }

      const { name, description, price, gender, category, quantity, images, brand } = req.body;

      // Directly create the new product in the database
      const savedProduct = await Product.create({
        name,
        description,
        price,
        gender,
        category,
        quantity,
        images,
        brand,
        sellerId // Seller ID is obtained from the authenticated user's ID
      });

      // Respond with the newly created product
      res.status(201).json(savedProduct);
    } catch (error) {
      next(error); // Pass errors to the error handling middleware
    }
});


// GET /api/products - Retrieves all of the products
router.get("/products", (req, res, next) => {
    Product.find()
      .populate('sellerId') // Assuming 'sellerId' is a reference to a User document
      .then((allProducts) => res.json(allProducts))
      .catch((err) => {
        console.error("Error while getting the products", err);
        res.status(500).json({ message: "Error while getting the products" });
      });
  });





module.exports = router;



