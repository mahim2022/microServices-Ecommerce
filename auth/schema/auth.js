var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: String,
	password: String,
	created_at: {
		type: Date,
		default: Date.now(),
	},
});

var User = mongoose.model("user", UserSchema);

module.exports = User;
