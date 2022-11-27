var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: String,
	price: Number,
	description: String,
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

var Product = mongoose.model("product", ProductSchema);
module.exports = Product;
