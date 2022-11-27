// var channel;
var app = require("express")();
var PORT = process.env.PORT || 5000;
var productRoutes = require("./routes/productRoutes");
var mongoose = require("mongoose");
// var cors = require("cors");
var bodyParser = require("body-parser");
var { connectAmqp } = require("./rabbitMq");

var connection = connectAmqp();

// app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: "true" }));

app.use("/product", productRoutes);

app.listen(PORT, () => {
	console.log(`product service running ${PORT}`);
});

mongoose
	.connect("mongodb://db:27017/productdb")
	.then(() => {
		console.log("Db connected");
	})
	.catch((error) => console.log(error));

module.exports = app;
