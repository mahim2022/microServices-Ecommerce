var amqplib = require("amqplib");
var channel;

var EventEmitter = require("events");

var orderEvent = new EventEmitter();

var connectAmqp = async () => {
	try {
		// amqp://guest:guest@rabbitmq:5672/
		var connection = await amqplib
			.connect("amqp://rabbitmq:5672/", "heartbeat=60")
			.then(() => console.log("Order Amqp Connected"))
			.catch((err) => console.log(err));
		channel = await connection.createChannel();
		await channel.assertQueue("order", { durable: true });
		await channel
			.consume("order", (data) => {
				if (data !== null || data !== undefined) {
					var products = JSON.parse(data.content);
					console.log(products);
					orderEvent.emit("gotOrder", products);
					// channel.ack(data);
				}
			})
			.catch((err) => console.log(err));
	} catch (error) {
		console.log(error);
	}
	return connection;
};

var publishToQueue = async (data, queueName) => {
	try {
		var connection = await amqplib
			.connect("amqp://rabbitmq:5672/", "heartbeat=60")
			.then(() => console.log("Order Amqp Connected"))
			.catch((err) => console.log(err));
		var channel = await connection.createChannel();

		// channel.publish()
		return channel.sendToQueue(queueName, Buffer.from(data));
	} catch (error) {
		console.log(error);
	}
};

module.exports = { connectAmqp, publishToQueue, orderEvent };
