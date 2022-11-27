var app = require("express")();
var PORT = process.env.PORT || 5001;
var authRoutes = require("./routes/authRoutes");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: "true" }));

app.use("/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`Auth service running on port${PORT}`);
});

mongoose
	.connect("mongodb://db:27017/userdb")
	.then(console.log("DB connected"))
	.catch((err) => {
		console.log(err);
	});
