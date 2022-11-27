// var channel;
var app = require("express")();
var PORT = process.env.orderServicePort || 5002;
var orderRoutes = require("./routes/orders");
var bodyParser = require("body-parser");
var { connectAmqp } = require("./rabbitMq");
const { default: mongoose } = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: "true" }));

connectAmqp().catch((err) => console.log(err));

app.use("/order", orderRoutes);

app.listen(PORT, () => {
	console.log(`Order service running on ${PORT}`);
});

mongoose
	.connect("mongodb://db:27017/orderdb")
	.then(() => {
		console.log("Orderdb running");
	})
	.catch((err) => console.log(err));

// module.exports = { publishToQueue };
