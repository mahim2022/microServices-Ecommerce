var amqplib = require("amqplib");
var channel;
var Products = require("./schema/product");

var getOrder = async (ids) => {
	var products = await Products.find({ _id: { $in: ids } });
	await publishToQueue(JSON.stringify(products), "order").then(() => {
		console
			.log("order sent to orders module")
			.catch((err) =>
				console.log({ err, message: "Err in product amqp module" })
			);
	});
};

var connectAmqp = async () => {
	try {
		var connection = await amqplib
			.connect("amqp://guest:guest@rabbitmq:5672/", "heartbeat=60")
			.then(() => console.log("Product Amqp Connected"))
			.catch((err) =>
				console.log({ err, mes: "Product amqp connect function" })
			);
		channel = await connection.createChannel();
		await channel.assertQueue("product", { durable: true });
		await channel.consume("product", (data) => {
			if (data) {
				console.log(JSON.parse(data.content));
				var idsObject = JSON.parse(data.content);
				getOrder(idsObject.ids);
				// channel.ack(data);
			} else {
				console.log("consumer called by server");
			}
		});
	} catch (error) {
		console.log(error);
	}
	return connection;
};

var publishToQueue = async (data, queueName) => {
	try {
		if (!channel) {
			var connection = await connectAmqp();
			var channel = await connection.createChannel();
		}
		return channel.sendToQueue(queueName, Buffer.from(data));
	} catch (error) {
		console.log(error);
	}
};

module.exports = { connectAmqp, publishToQueue };
