const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Insert a new product
const createProduct = async (req, res) => {
    const { name, description, price, category, image_url } = req.body;
    try {
        const product = await prisma.products.create({
            data: { name, description, price, category, image_url }
        });
        res.status(201).json({
            status: "ok",
            message: `Product '${product.name}' created successfully`,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error while creating product",
            error: error.message
        });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await prisma.products.findMany();
        res.json(products);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching products",
            error: error.message
        });
    }
};

// Get a product by ID
const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.products.findUnique({
            where: { product_id: parseInt(id) }
        });

        if (!product) {
            return res.status(404).json({ status: "error", message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching product",
            error: error.message
        });
    }
};

// Update product data by ID
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, image_url } = req.body;
    try {
        const product = await prisma.products.findUnique({
            where: { product_id: parseInt(id) }
        });

        if (!product) {
            return res.status(404).json({ status: "error", message: "Product not found" });
        }

        const updatedProduct = await prisma.products.update({
            where: { product_id: parseInt(id) },
            data: { name, description, price, category, image_url }
        });

        res.status(200).json({
            status: "ok",
            message: `Product '${updatedProduct.name}' updated successfully`,
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error updating product",
            error: error.message
        });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.products.findUnique({
            where: { product_id: parseInt(id) }
        });

        if (!product) {
            return res.status(404).json({ status: "error", message: "Product not found" });
        }

        await prisma.products.delete({
            where: { product_id: parseInt(id) }
        });

        res.status(200).json({ status: "ok", message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error deleting product",
            error: error.message
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
};
