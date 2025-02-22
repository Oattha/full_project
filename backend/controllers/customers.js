const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

// Insert a new customer
const createCustomer = async (req, res) => {
    const { customer_id, first_name, last_name, address, email, phone_number } = req.body;
    try {
        const cust = await prisma.customers.create({
            data: {
                customer_id,
                first_name,
                last_name,
                address,
                email,
                phone_number
            }
        });
        res.status(200).json({
            status: "ok",
            message: `User with id ${cust.customer_id} is created successfully`,
            data: cust
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error while creating user",
            error: error.message
        });
    }
};

// Get all customers
const getCustomers = async (req, res) => {
    try {
        const customers = await prisma.customers.findMany();
        res.json(customers);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching customers",
            error: error.message
        });
    }
};

// Get a customer by ID
const getCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await prisma.customers.findUnique({
            where: { customer_id: parseInt(id) }
        });

        if (!customer) {
            return res.status(404).json({ status: "error", message: "Customer not found" });
        }

        res.json(customer);
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching customer",
            error: error.message
        });
    }
};

// Delete a customer by ID
const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await prisma.customers.findUnique({
            where: { customer_id: parseInt(id) }
        });

        if (!customer) {
            return res.status(404).json({ status: "error", message: "Customer not found" });
        }

        await prisma.customers.delete({
            where: { customer_id: parseInt(id) }
        });

        res.status(200).json({ status: "ok", message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error deleting customer",
            error: error.message
        });
    }
};

// Update customer data by ID
const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, address, email, phone_number } = req.body;
    try {
        const customer = await prisma.customers.findUnique({
            where: { customer_id: parseInt(id) }
        });

        if (!customer) {
            return res.status(404).json({ status: "error", message: "Customer not found" });
        }

        const updatedCustomer = await prisma.customers.update({
            where: { customer_id: parseInt(id) },
            data: {
                first_name,
                last_name,
                address,
                email,
                phone_number
            }
        });

        res.status(200).json({
            status: "ok",
            message: `Customer with id ${updatedCustomer.customer_id} updated successfully`,
            data: updatedCustomer
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error updating customer",
            error: error.message
        });
    }
};

module.exports = {
    createCustomer,
    getCustomers,
    getCustomer,
    deleteCustomer,
    updateCustomer
};
