var { publishToQueue, orderEvent } = require("../rabbitMq");
var Order = require("../schema/orderSchema");
var { orderTotal } = require("../utils/orderTotal");

var buyNow = async (req, res) => {
	try {
		console.log("hit order req");
		var { ids, email } = req.body;
		await publishToQueue(JSON.stringify({ ids }), "product")
			.then(() => {
				console.log("Order sent to product to retrieve product");
			})
			.catch((err) =>
				console.log({ err, message: "Error at order publish queue" })
			);
		await orderEvent.on("gotOrder", async (data) => {
			console.log(data);
			var products = data;
			if (products) {
				var totalPrice = orderTotal(products);
				var newOrder = new Order({
					ids: ids,
					email: email,
					totalPrice: totalPrice,
				});
				await newOrder.save();
				res.send({ products, email, totalPrice });
			}
		});
	} catch (error) {
		res.json({ message: "Error, try again", error: error });
	}
};

module.exports = { buyNow };
