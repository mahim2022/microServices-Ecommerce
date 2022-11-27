var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
	ids: [String],
	email: String,
	totalPrice: Number,
	created_at: { type: Date, default: Date() },
});

var Order = mongoose.model("order", OrderSchema);
module.exports = Order;
