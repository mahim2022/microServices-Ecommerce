var Products = require("../schema/product");

var getAllProducts = async (req, res) => {
	var allProducts = await Products.find({});
	res.send(allProducts);
};
var postNewProduct = async (req, res) => {
	var { name, description, price } = req.body;
	var newProduct = new Products({ name, description, price });
	await newProduct.save();
	res.send(newProduct);
};

module.exports = { getAllProducts, postNewProduct };
